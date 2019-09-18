const express = require('express');
const Router = express.Router();

const db = require('../db');
const {formatData} = require('../utils');

let colName = 'interviewQuestion'


// 新增面试题
Router.post('/',async (req,res)=>{
    let {userid,iq} = req.body;console.log(iq)
    if(typeof iq === 'string'){
        iq = JSON.parse(iq)

    }
    if(typeof iq[0] === 'string'){

        iq = iq.map(item=>{
            // item.uid = userid;
            // item.hot = 1;//热度
            // item.difficulty=1;//难度系数
            // item.section = 3;//分类
    
            return {
                question:item,
                uid:userid,
                section:'',
                hot:1
            }
        });
    }

    // 默认为未审核状态
    iq = iq.map(item=>{
        item.check = false;
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

// 添加面试题答案
Router.post('/answer',(req,res)=>{
    let {answer,userid} = req.body;
    let result;
    try{
        let data = await db.create('answer',{answer,userid,like:0,unlike:0,addtime:Date.now()});
        result = formatData()
    }catch(err){
        result = formatData({code:400})
    }


    res.send(result)
});

// 查看所有面试题
// 支持分页，排序，分阶段,随机获取
Router.get('/',async (req,res)=>{
    let {sort,page=1,size=5,category,random} = req.query;
    let skip = (page-1)*size,limit=size*1;
    let result;
    let query = {};

    // 是否根据分类获取
    if(category){
        query.category = category*1;
    }
    try{
        let data = await db.find(colName,query,{skip,limit,sort,random});
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
            let data = await db.update(colName,{_id:id},{...req.body});
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

module.exports = Router;