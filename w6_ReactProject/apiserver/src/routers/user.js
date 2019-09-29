const express = require('express');
const Router = express.Router();

// 引入加密模块
const crypto = require('crypto');

const db = require('../db');
const {formatData,token,formatParams} = require('../utils');

// 引入密钥
const {key} = require('../config.json');

const colName = 'user'

Router.post('/',async (req,res)=>{
    // 对密码进行加密
    let password = req.body.password;
    
    // 指定的算法与密钥来创建cipher对象
    const cipher = crypto.createCipher('aes192', key);
    // 使用该对象的update方法来指定需要被加密的数据
    let crypted = cipher.update(password, 'utf-8', 'hex');
    crypted = cipher.final('hex');

    let result;
    try{
        let data = await db.create('user',{...req.body,password:crypted});
        result = formatData({data})
    }catch(err){
        result = formatData({status:400,msg:err})
    }
    
    res.send(result);
})

// 注册
.post('/reg',async (req,res)=>{
    let {username,password} = req.body;

    let result
    try{
        result = await db.dispatch('create',colName,{username,password,regtime:new Date()})
    }catch(err){
        result = formatData({code:400})
    }
    res.send(result)
})

// 登录(生成token)
.get('/login',async (req,res)=>{
    let {username,password} = req.query;
    let result = await db.dispatch('find',colName,{username,password});
    console.log('result:',result,username,password)
    if(result.data.length>0){
        let {_id,username} = result.data[0];
        let Authorization = token.create(username);
        // res.set('Authorization',Authorization);
        result = formatData({data:{Authorization,_id,username}})
    }else{
        result = formatData({status:400})
    }
    res.send(result);
})

.get('/verify',async (req,res)=>{
    let Authorization = req.get('Authorization');
    let result = token.verify(Authorization);
    if(result){
        result = formatData()
    }else{
        result = formatData({status:401})
    }
    res.send(result);
})

// 校验用户名是否被占用
.get('/reg/check',async (req,res)=>{
    let {username} = req.query;

    let result;
    try{
        let data = await db.find('user',{username});
        if(data.length>0){
            result = formatData({status:400,msg:'user is exist'})
        }else{

            result = formatData()
        }
    }catch(err){
        result = formatData({status:400,msg:err})
    }
    
    res.send(result);
})

.route('/:id')
    // 获取单个用于信息
    .get(async (req,res)=>{
        let {id} = req.params;
        let result = await db.dispatch('find',colName,{_id:id})
        res.send(result);
    })
    
    // 修改用户信息
    .patch(async (req,res)=>{
        let {id} = req.params;
        let data = formatParams(req.body,['password']);
        let result = await db.dispatch('update',colName,{_id:id},{$set:data});console.log('data:',data,result)
        res.send(result);
    })

    // 删除某个用户
    .delete(async (req,res)=>{
        let {id} = req.params;
        let result = await db.dispatch('remove',colName,{_id:id})
        res.send(result);
    })
module.exports = Router;