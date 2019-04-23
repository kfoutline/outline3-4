const express = require('express');
const Router = express.Router();

// 引入加密模块
const crypto = require('crypto');

const db = require('../db');
const {formatData} = require('../utils');

// 引入密钥
const {key} = require('../config.json');

// 指定的算法与密码来创建cipher对象
const decipher = crypto.createDecipher('aes192', key);


Router.post('/',async (req,res)=>{
    // 对密码进行加密
    let {username,password} = req.body;console.log(username,password)

    // 使用该对象的update方法来指定需要被加密的数据
    // let decrypted = decipher.update(password, 'hex', 'utf-8');

    // decrypted += decipher.final('utf-8');
    const cipher = crypto.createCipher('aes192', key);
    let crypted = cipher.update(password, 'utf-8', 'hex');
    crypted = cipher.final('hex');


    let result;
    try{
        let data = await db.find('user',{username,password:crypted});
        if(data.length>0){

            result = formatData()
        }else{
            result = formatData({status:400,msg:'fail'})
        }
    }catch(err){
        result = formatData({status:400,msg:err})
    }

    res.send(result);
    
})

module.exports = Router;