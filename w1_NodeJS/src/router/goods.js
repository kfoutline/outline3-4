const express = require('express');
const Router = express.Router();

Router.post('/',(req,res)=>{
    res.send('add goods')
})

Router.route('/:id')

.get((req,res)=>{
    res.send('获取商品信息')
})

.put((req,res)=>{
    res.send('modify')
})

.delete((req,res)=>{
    res.send('delete')
})

module.exports = Router;