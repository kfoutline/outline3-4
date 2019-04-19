let http = require('http');
const fs = require('fs');

// 引入url模块，用于url地址格式化
let url = require('url');

// 引入querystring模块，用于GET/POST请求数据格式化
let qs = require('querystring');

let path = require('path');

//请求js目录下的index.js或package.json文件中main属性对应的文件
let mime = require('./js');

// 创建静态资源服务器
let app = http.createServer((req,res)=>{

    
    // 格式化url，并格式化url中的search参数
    // 解构文件路径
	let {pathname} = url.parse(req.url,true);


    // 得到扩展名
    let extname = path.extname(pathname).substring(1);

    // 获取真实路径
    let realpath = path.join(__dirname,pathname);

    if(extname){
        // 如果有扩展名，且不是html文件，则路由到/static/目录下访问相应文件
        // 如果为html文件，则忽略（直接访问html文件）
        extname!='html' && (realpath = path.join(__dirname,'/static', pathname));
    }else{
        // 否则获取当前目录下的index.html文件
        realpath = path.join(realpath,'/index.html');
    }
    
    console.log('realpath:',realpath);
    fs.readFile(realpath,(err,data)=>{
        if(err){
            // 如果读取文件错误，则抛出404
            res.writeHead(404,{'content-type':'text/html;charset=utf8'});
            fs.readFile('./static/404.html',function(err,data){
                if(err) {
                    throw err;
                    return;
                }
                res.end(data);
            });
            return;
        }

        // 正确读取文件
        res.writeHead(200,{'content-type':mime[extname] + ';charset=utf8'});
        res.end(data);
    })
});

let {PORT} = require('./config.json');
app.listen(PORT,()=>{
	console.log('http://localhost:%s',PORT);
});