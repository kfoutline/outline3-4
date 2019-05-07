/**
 * 模块化开发
 * 一个文件就是一个模块
 * 模块有独立的作用域，不能相互调用，除非暴露出接口
 */

function formatData({data=[],msg='success',status=200}={}){
    if(status==400){
        msg = 'fail';
    }
    return {
        data,
        msg,
        status
    }
}

/**
 * 利用crypto加密解密
 * 
 */
const crypto = require('crypto');
const {key,iv} = require('../config.json');

 // 加密
function encrypt(data, {type='aes-128-cbc',outType='base64',encode='utf8'}={}) {
    const cipher = crypto.createCipheriv(type, key,iv);
    // cipher.setAutoPadding(true);
    var crypted = cipher.update(data, encode, outType);
    crypted = cipher.final(outType);
    return crypted;
}
// 解密
function decrypt(encrypted, {type='aes-128-cbc',outType='base64',encode='utf8'}={}) {
    const decipher = crypto.createDecipheriv(type, key,iv);
    var decrypted = decipher.update(encrypted, outType, encode);
    decrypted = decipher.final(encode);
    return decrypted;
}

// md5加密：用于存入数据库
function md5(data,{encode='hex',inEncode='utf8'}={}){
    const hash = crypto.createHash('md5');
    hash.update(data,inEncode);
    return hash.digest(encode);
}

module.exports = {
    formatData,
    encrypt,
    decrypt,
    md5
}