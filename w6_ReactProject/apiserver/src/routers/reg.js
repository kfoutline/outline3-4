const express = require('express');
const Router = express.Router();

// 引入加密模块
const crypto = require('crypto');

const db = require('../db');
const {formatData} = require('../utils');

// 引入密钥
const {key} = require('../config.json');


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

.get('/check',async (req,res)=>{
    let {username} = req.query;

    let result;
    try{
        let data = await db.find('user',{username});
        if(data.length>0){
            result = formatData({status:300,msg:'user is exist'})
        }else{

            result = formatData()
        }
    }catch(err){
        result = formatData({status:400,msg:err})
    }
    
    res.send(result);
})

module.exports = Router;