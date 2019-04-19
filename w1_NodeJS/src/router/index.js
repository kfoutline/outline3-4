const express = require('express');console.log('index')
const Router = express.Router();

const goodsRouter = require('./goods');console.log('goodsRouter',goodsRouter)
// const listRouter = require('./list');
// const cartRouter = require('./cart');
// const loginRouter = require('./login');
// const registryRouter = require('./registry');

Router.use('/goods',goodsRouter);
// Router.use('/list',listRouter);
// Router.use('/cart',cartRouter);
// Router.use('/login',loginRouter);
// Router.use('/registry',registryRouter);

// module.exports = Router;
module.exports = Router;