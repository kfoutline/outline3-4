
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

 // 加密
function encrypt(data, key,{type='aes-256-ecb',outType='base64',encode='utf8'}={}) {
    const cipher = crypto.createCipher(type, key);
    // cipher.setAutoPadding(true);
    var crypted = cipher.update(data, encode, outType);
    crypted = cipher.final(outType);
    return crypted;
}
// 解密
function decrypt(encrypted, key,{type='aes-256-ecb',outType='base64',encode='utf8'}={}) {
    const decipher = crypto.createDecipher(type, key);
    var decrypted = decipher.update(encrypted, outType, encode);
    decrypted = decipher.final(encode);
    return decrypted;
}

module.exports = {
    formatData,
    encrypt,
    decrypt
}