const path = require('path');
module.exports = function override(config, env) {
    console.log('config:',config,env)
    // 修改配置
    Object.assign(config.resolve.alias,{
        '@': path.join(__dirname,'./src/'),
        '@@':path.join(__dirname,'./src/components')
    })

    // 代理服务器
    if(env === 'development'){

        if(!config.devServer) config.devServer={};
        config.devServer.proxy = {
            '/jxapi/*':{
                target:'https://m.jiuxian.com/',
                changeOrigin:true,
                pathRewrite:{
                    '^/jxapi':''
                }
            }
        }
    }
    
    console.log('config.change:',config)
    return config;
}