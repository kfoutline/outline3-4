const express = require('express');
const Router = express.Router();

// 引入加密模块
const crypto = require('crypto');

const db = require('../db');
const {formatData,decrypt,md5} = require('../utils');

// 引入密钥
const {key,iv} = require('../config.json');


Router.post('/',async (req,res)=>{
    // 对密码进行加密
    let password = req.body.password;
    console.log('fe:',password, key, iv)
    
    // // 指定的算法与密码来创建cipher对象
    // const cipher = crypto.createCipher('aes192', key);
    // // 使用该对象的update方法来指定需要被加密的数据
    // let crypted = cipher.update(password, 'utf-8', 'hex');
    // crypted = cipher.final('hex');
    
    // 解密密码，然后利用md5加密存入数据库
    // let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    // let crypted = decipher.update(password,'base64',"utf8");
    // crypted = decipher.final('utf8');

    // console.log('be:',crypted)

    // const hash = crypto.createHash('md5');
    // hash.update(crypted);
    // password = hash.digest('hex');

    // console.log('md5:',password)

    // 解密
    password = decrypt(password);console.log('decrypt:',password)
    // 加密
    password = md5(password);console.log('md5:',password)
    let result;
    try{
        let data = await db.create('user',{...req.body,password});
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