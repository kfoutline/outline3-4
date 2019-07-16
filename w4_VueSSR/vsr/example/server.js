const Vue = require('vue');
const Vsr = require('vue-server-renderer');
const express = require('express');
const fs = require('fs');

const renderer = Vsr.createRenderer({
    template:fs.readFileSync('./index.template.html','utf8')
});
const app = express();

app.get('*',(req, res, next) => {
    const vm = new Vue({
        data: {
            url: req.url,
            title:'服务器渲染SSR@Server-side rendering',
            meta:`<meta name="keyword" content="SSR,Server-Side Rendering,Vue"/>`
        },
        template: `<div>访问的 URL 是->： {{ url }}</div>`
    });

    // console.log(renderer.renderToString(vm))

    // 创建变量
    const context = {
        
    }

    renderer.renderToString(vm,vm.$data).then(html => {
        res.header('Content-Type','text/html;charset=utf8')
        res.end(html);
        // res.end(`
        //     <!DOCTYPE html>
        //     <html lang="en">
        //         <head><title>Hello</title></head>
        //         <body>${html}</body>
        //     </html>
        // `)
    }).catch((err) => {
        res.status(500).end('Internal Server Error')
    })
})

app.listen(3003, () => {
    console.log('server is running on http://localhost:3003')
})