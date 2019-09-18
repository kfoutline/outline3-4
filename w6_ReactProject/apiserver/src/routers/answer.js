const express = require('express');
const Router = express.Router();

const db = require('../db');
const {formatData} = require('../utils');

let colName = 'answer'


// 添加面试题答案
Router.post('/',(req,res)=>{
    let {answer,userid} = req.body;
    // let result;
    // try{
    //     let data = await db.create('answer',{answer,userid,like:0,dislike:0,addtime:Date.now()});
    //     result = formatData()
    // }catch(err){
    //     result = formatData({code:400})
    // }
    
    let result = db.dispatch('create',colName,{answer,userid,like:0,dislike:0,addtime:Date.now()})

    res.send(result)
});



Router.route('/:id')
    // 删除某一条答案
    .delete(async (req,res)=>{
        let {id} = req.params;
        
        let result = db.dispatch('create',colName,{_id:id})
        res.send(result);
    })

    // 修改
    .patch(async (req,res)=>{
        let {id} = req.params;
        
        let result = db.dispatch('update',colName,{_id:id},{...req.body})
        res.send(result);
    })

    // 查看某一条答案
    .get(async (req,res)=>{
        let {id} = req.params;        

        let result = await db.dispatch('find',colName,{_id:id})
    
        res.send(result);
    })

module.exports = Router;