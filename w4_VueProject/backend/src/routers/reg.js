const express = require('express');
const Router = express.Router();

// 引入加密模块
const crypto = require('crypto');

const db = require('../db');
const {formatData,decrypt,md5} = require('../utils');

// 引入密钥
const {key,iv,privateKey} = require('../config.json');

const pKey = `-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn
NhAAAAAwEAAQAAAQEAtUn3hggno2q4Ss6NEUxft8BgGCXIaaR9LS2bzXLd2H4hVVwT8F8z
lhrv83JqRevzlgasuxjDVUEFuSXLdfLUPOBx4x1dfRUFkLtdlniUTyrCNBPLTrmRhvegtF
Y3JUlR7yh4OYh/38sXzEKcJkjYplKglyKQ7XimZRvTOtnA3nixu1NVDs0AGtOnMIHYrCvG
Ejj06YFGVvsy55iSMa0/PlF3f5g3ptRzdS0kKIeuRgKIIRPj+89GU1itGAb4TIOi3DkAJy
kqoJZWfDM5eMjee1OkgLEtYKMCwrF3wL7NXojz5y3O+RDcpDFjCJKQf1As1Lto8yXYdCuZ
TQbDrkB5WQAAA8iAfuZXgH7mVwAAAAdzc2gtcnNhAAABAQC1SfeGCCejarhKzo0RTF+3wG
AYJchppH0tLZvNct3YfiFVXBPwXzOWGu/zcmpF6/OWBqy7GMNVQQW5Jct18tQ84HHjHV19
FQWQu12WeJRPKsI0E8tOuZGG96C0VjclSVHvKHg5iH/fyxfMQpwmSNimUqCXIpDteKZlG9
M62cDeeLG7U1UOzQAa06cwgdisK8YSOPTpgUZW+zLnmJIxrT8+UXd/mDem1HN1LSQoh65G
AoghE+P7z0ZTWK0YBvhMg6LcOQAnKSqgllZ8Mzl4yN57U6SAsS1gowLCsXfAvs1eiPPnLc
75ENykMWMIkpB/UCzUu2jzJdh0K5lNBsOuQHlZAAAAAwEAAQAAAQAHRE7CtaL5HvcCMKNg
9SHFGNYBQcp1yZ0m6XQcWSVhXzTw2f8GnJpRwwSpSoXOBbY+5keYPFbgHPogwM4WDUTKp+
iIxQ2RTP1rHseSl4TCY6FjOwPkRPX7ZgOwFuChAv5gyst+6uTNULPEgUsHEdZ1XEyJol4S
1so8tU/TRRVBFZ4rDRj4GQ5gxcezYOpubgo++X0GFglhiU0HkGU24ttVuN3ufpjkDQWBwQ
qSPNf9xX3UXUORgrsGRe06pwTfJDZNZZzKSwdW0uYVr+CLag2eyMMCJ+akJRBDrxXBv942
5kygSpc0BoKoDZ3lS0dLZBtb/Pm3qafcmPbVY0AvinedAAAAgH6ztcFeJ2EqOIqY9e7nvV
nwMKpQwIs+6UTH6stILacvZ8xo8EoPSRotO3hseyWpA4CMYxjk23KL4V770yEONFuyRmJu
6SWR+vBlt3NDOiAfXFe3oBYAvW+3gPgFSwmZJfY3ooEbWygJmE7eOaV5u+8lNMmEekyvIw
cfsJzL8p7cAAAAgQDdrNS76k6U4mh2kmSBLwI56aMDNwWz14UE4xv5hNlxfDVLisGHKIla
Y+CXR0/SyZ4/oAW1xpaykl6jn6w6yOUEq3DcU+TYgwAmdZ9KhoTUWZbJ+ULdgILa1drrMD
DiUYJqIvqC656h7tPAaD4au7PdmBR/or5wUuoltr3Opjc17wAAAIEA0Vw7vu8WyJgAVs1q
P3uOomAoaTY6hyNOK5gtyAIWuuThP5siLN+Oeon8UU+WjlfmBwg1dZAcwHuY7aP82GUDJI
OfSlO5GebL/RmVkUTYQcqUoI34Byx1F5QHCTgCX7h8mIVr9utE8j+evI56zDvr8zw6xWP0
dm4pDA+y7SiFTTcAAAANbGFveGllQExBT1hJRQECAwQFBg==
-----END OPENSSH PRIVATE KEY-----`

Router.post('/',async (req,res)=>{
    // 对密码进行加密
    let password = req.body.password;
    console.log('fe:',password, key, iv);
    console.log(privateKey)
    
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
    // password = decrypt(password);
    password = crypto.privateDecrypt(pKey, Buffer.from(password))
    console.log('decrypt:',password)
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