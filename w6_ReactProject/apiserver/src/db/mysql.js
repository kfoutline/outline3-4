var mysql = require('mysql');

// //创建连接对象，并配置参数
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'edusys'
// });

// // 连接数据库
// connection.connect();

// // 查询数据库
// connection.query('select * from student', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results);
// });

// // 关闭连接,释放资源
// connection.end();


//创建连接池
var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    port: 3306,
    database: 'jiaoxue',
    multipleStatements: true
});

module.exports = sql=>{
    return new Promise((resolve,reject)=>{
        pool.query(sql, (error, data)=>{
            if(error){
                reject(error)
            }
            resolve(data);// 改变promise状态Resolved
        });
    })
}