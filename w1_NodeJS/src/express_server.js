const express = require('express');
const {PORT} = require('./config.json');
const rootRouter = require('./router');

const app = express();

app.use(express.static('./'),{maxAge:3600000});

app.use(rootRouter);

app.listen(PORT,()=>{
    console.log('server is running on http://localhost:%s',PORT)
})