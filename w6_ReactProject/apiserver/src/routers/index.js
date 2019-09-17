const express = require('express');
const Router = express.Router();

const listRouter = require('./list');
const regRouter = require('./reg');
const loginRouter = require('./login');
const uploadRouter = require('./upload');
const iqRouter = require('./interviewQuestion');
const cateRouter = require('./category');

// 跨域设置
Router.use( function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,PATCH,DELETE,OPTIONS");

    // 跨域请求CORS中的预请求
    if(req.method=="OPTIONS") {
        res.sendStatus(200);/*让options请求快速返回*/
    } else{
        next();
    }
});



// 格式化传入的参数
Router.use(express.json(),express.urlencoded({ extended: false }));

// 配置路由信息
Router.use('/upload',uploadRouter);
Router.use('/login',loginRouter);
Router.use('/reg',regRouter);
Router.use('/list',listRouter);
Router.use('/iq',iqRouter);
Router.use('/category',cateRouter);

module.exports = Router;
