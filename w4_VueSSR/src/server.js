const Vue = require('vue');
const Vsr = require('vue-server-renderer');
const express = require('express');
const fs = require('fs');
const {createApp} = require('./entry-server')

const renderer = Vsr.createRenderer({
    template:fs.readFileSync('./index.template.html','utf8')
});
const app = express();

app.get('*',async (req, res, next) => {
    const context = { url: req.url }

    let vm = await createApp(context)

    // const vm = new Vue({
    //     data: {
    //         url: req.url,
    //         title:'服务器渲染SSR@Server-side rendering',
    //         meta:`<meta name="keyword" content="SSR,Server-Side Rendering,Vue"/>`
    //     },
    //     template: `<div>访问的 URL 是->： {{ url }}</div>`
    // });

    // console.log(renderer.renderToString(vm))

    // 创建变量
    // const context = {
        
    // }

    try{
        let html = await renderer.renderToString(vm);
        res.header('Content-Type','text/html;charset=utf8')
        res.end(html);
    }catch(err){
        if (err.code === 404) {
            res.status(404).end('Page not found')
        } else {
            res.status(500).end('Internal Server Error')
        }
    }
    
    
})

app.listen(3003, () => {
    console.log('server is running on http://localhost:3003')
})