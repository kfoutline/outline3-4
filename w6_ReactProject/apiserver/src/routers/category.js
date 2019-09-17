const express = require('express');
const Router = express.Router();

const db = require('../db');
const {formatData} = require('../utils');

let colName = 'category'

// 新增
Router.post('/',async (req,res)=>{
    let {category,code} = req.body;
    
    let result;
    try{
        await db.create(colName,{name:category,code})
        result = formatData();
    }catch(err){
        result = formatData({code:400})
    }

    res.send(result);
})

// 查看所分类
Router.get('/',async (req,res)=>{
    let result;
    let {skip,limit,sort} = req.query;
    try{
        let data = await db.find(colName,{},{skip,limit,sort});
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
            await db.delete(colName,{_id:id});
            result = formatData();
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
            await db.update(colName,{_id:id},{...req.body});
            result = formatData();
        }catch(err){
            result = formatData({code:400})
        }
        
        res.send(result);
    })

    // 查看一道面试题
    .get(async (req,res)=>{
        let {id} = req.params;

        let result;
        try{
            let data = await db.find(colName,{_id:id});
            result = formatData({data});
        }catch(err){
            result = formatData({code:400})
        }
        
        res.send(result);
    })

module.exports = Router;