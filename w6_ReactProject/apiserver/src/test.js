const db = require('./db');
(async ()=>{
    let data = await db.find('user',{},{fields:{password:true}})
    console.log(data)
})();