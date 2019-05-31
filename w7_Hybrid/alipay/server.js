// TypeScript
// import AlipaySdk from 'alipay-sdk';
const AlipaySdk = require('alipay-sdk').default ;console.log(AlipaySdk)
const fs = require('fs')
console.log(fs.readFileSync('./private-key.txt', 'ascii'))
const alipaySdk = new AlipaySdk({
  // 参考下方 SDK 配置
  appId: '2016092600603736',
  privateKey: fs.readFileSync('./private-key.txt', 'ascii'),
});

async function sign(){
    let res;
    try{

        res =  await alipaySdk.exec('alipay.system.oauth.token', {
            grantType: 'authorization_code',
            code: 'code',
            refreshToken: 'token'
        });
    }catch(err){
        res = err;
    }

    console.log(res)
}

sign();