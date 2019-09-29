const express = require('express');
const Router = express.Router();

const db = require('../db');
const {formatData,formatParams} = require('../utils');

let colName = 'answer'


// 添加面试题答案
Router.post('/',async (req,res)=>{
    let {content,userid,iqid} = req.body;
    // let result;
    // try{
    //     let data = await db.create('answer',{answer,userid,like:0,dislike:0,addtime:Date.now()});
    //     result = formatData()
    // }catch(err){
    //     result = formatData({code:400})
    // }
    
    let data = {content,userid,iqid,like:[],dislike:[],addtime:new Date()}
    let result = await db.dispatch('create',colName,data);
    data._id = result.data.insertedIds[0];
    result.data = [data];
    res.send(result)
});

// 获取面试题所有答案
Router.get('/',async (req,res)=>{
    let query = formatParams(req.query,['iqid','userid'])
    let result = await db.dispatch('find',colName,query);

    // 通过userid获取对应用户名并返回前端
    let userids = result.data.map(item=>item.userid);
    // 去重
    userids = [...new Set(userids)];
    let users = await db.dispatch('find','user',{_id:{$in:userids}},{fields:{username:1}})
    result.data.forEach((item,idx)=>{
        let currentUser = users.data.filter(user=>user._id==item.userid)[0];
        item.user = currentUser;
    })
    res.send(result);
});

Router.route('/:id')
    // 删除某一条答案
    .delete(async (req,res)=>{
        let {id} = req.params;
        
        let result = await db.dispatch('delete',colName,{_id:id})
        res.send(result);
    })

    // 修改
    .patch(async (req,res)=>{
        let {id} = req.params;
        
        let result = await db.dispatch('update',colName,{_id:id},{...req.body})
        res.send(result);
    })

    // 查看某一条答案
    .get(async (req,res)=>{
        let {id} = req.params;        

        let result = await db.dispatch('find',colName,{_id:id})
    
        res.send(result);
    })

// 点赞
Router.patch('/:id/like',async (req,res)=>{
    let {id} = req.params;
    let {userid} = req.body;
    
    let result = await db.dispatch('update',colName,{_id:id},{
        $addToSet:{like:userid},
        $pull:{dislike:userid}
    });
    if(result.status===200){
        result.data = []
    }
    res.send(result);
})

// 踩
Router.patch('/:id/dislike',async (req,res)=>{
    let {id} = req.params;
    let {userid} = req.body;
    
    let result = await db.dispatch('update',colName,{_id:id},{
        $addToSet:{dislike:userid},
        $pull:{like:userid}
    })
    res.send(result);
})

module.exports = Router;