const express = require('express');
const Router = express.Router();

const db = require('../db');
const {formatData,formatParams} = require('../utils');

let colName = 'interviewQuestion'


// 新增面试题
Router.post('/',async (req,res)=>{
    let {userid,iq} = req.body;

    if(typeof iq === 'string'){
        iq = JSON.parse(iq)
    }

    if(typeof iq[0] === 'string'){
        iq = iq.map(item=>{
            // item.uid = userid;
            // item.hot = 1;//热度
            // item.difficulty=1;//难度系数
            // item.category = 3;//分类
    
            return {
                question:item,
                userid:userid,
                hot:1
            }
        });
    }

    // 默认为未审核状态
    // 每道面试题添加用户id与时间
    iq = iq.map(item=>{
        item.check = false;
        item.userid = userid;
        item.addtime = new Date();
        return item;
    });

    let result;
    try{
        await db.create(colName,iq);
        result = formatData();
    }catch(err){
        result = formatData({code:400})
    }

    res.send(result);
});

// 查看所有面试题
// 支持分页，排序，分阶段,随机获取
Router.get('/',async (req,res)=>{
    let {sort,page=1,size=5,random} = req.query;
    let skip = (page-1)*size
    let limit=size*1;
    let result;
    // let query = {};

    // // 是否根据分类获取
    // if(category){
    //     query.category = category;
    // }
    // if(username){
    //     query.username = username;
    // }
    let query = formatParams(req.query,['category','userid'])
    try{
        // 格式化数据：{result[],total,page,size}
        let data = await db.find(colName,query,{random,total:true,options:{skip,limit,sort}});
        data.page = page;
        data.size = size;
        result = formatData({data})
    }catch(err){
        result = formatData({code:400})
    }
    

    res.send(result);
})

// 搜索
.get('/search',async (req,res)=>{
    let {keyword,sort,page=1,size=5} = req.query;
    let skip = (page-1)*size
    let limit=size*1;
    let result;
    try{
        let reg = new RegExp(keyword,'i')
        let query = {$or:[{question:reg},{category:reg}]}
        let data = await db.find(colName,query,{total:true,options:{skip,limit,sort}});
        data.page = page;
        data.size = size;
        result = formatData({data})
    }catch(err){
        result = formatData({code:400})
    }
    

    res.send(result);
})


Router.route('/:id')
    // 删除
    .delete(async (req,res)=>{
        let {id} = req.params;
        let result;
        try{
            let data = await db.delete(colName,{_id:id});
            result = formatData({data})
        }catch(err){
            result = formatData({code:400})
        }
        
    
        res.send(result);
    })

    // 修改
    .patch(async (req,res)=>{
        let {id} = req.params;
        let result;
        try{
            let data = await db.update(colName,{_id:id},{$set:{...req.body}});
            result = formatData()
        }catch(err){
            result = formatData({code:400})
        }
        
    
        res.send(result);
    })

    // 查看一道面试题
    .get(async (req,res)=>{
        let {id} = req.params;

        // let result;
        // try{
        //     let data = await db.find(colName,{_id:id});
        //     result = formatData({data})
        // }catch(err){
        //     result = formatData({code:400})
        // }
        

        let result = await db.dispatch('find',colName,{_id:id})
    
        res.send(result);
    })

// 增加热度
// 为增加速度使用get请求
Router.get('/:id/hot',async (req,res)=>{
    let {id} = req.params;
    let result = await db.dispatch('update',colName,{_id:id},{$inc:{hot:1}})
    res.send(result);
})
module.exports = Router;