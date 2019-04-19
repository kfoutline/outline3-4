const express = require('express');
const {PORT} = require('./config.json');

const app = express();

app.use(express.static('./'));

app.listen(PORT,()=>{
    console.log('server is running on http://localhost:%s',PORT)
})