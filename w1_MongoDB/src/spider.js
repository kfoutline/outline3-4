const express = require('express');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const app = express();

app.get('/getdata',(req,res)=>{
    request.get('http://list.jiuxian.com/search.htm',{
        params:{
            v:2,
            key:'%E6%8B%89%E8%8F%B2',
            isOwn:1,
            area:6
        }
    },(err,response,body)=>{
        let $ = cheerio.load(body);

        let downloadPath = './download'

        try{
            fs.accessSync(downloadPath, fs.constants.F_OK);
        }catch(err){
            fs.mkdirSync(downloadPath)
        }

        let data = [];
        $('li','.proListSearch').each((idx,cli)=>{
            let $li = $(cli);
            let imgurl = $li.find('img').attr('src');

            let filename = path.basename(imgurl);

            let goods = {
                name:$li.find('.proName').text(),
                imgurl:filename,
                comment:$li.find('.judge').text().match(/\d+/)[0]
            }

            data.push(goods);

            request(imgurl).pipe(fs.createWriteStream(path.join(downloadPath,filename)));
            
        })
        res.send(data)
    })
})

const {PORT} = require('./config.json');

app.listen(PORT,()=>{
    console.log('success');
})