const http = require('http')
const url = require('url')
const qs = require('querystring');

http.createServer((request, response) => {
    // 处理url地址
    let urlObj = url.parse(request.url, true);

    // 获取访问路径
    let pathname = urlObj.pathname;

    // 获取请求类型
    let method = request.method.toUpperCase();

    // 获取参数
    let params = urlObj.query;

    // POST请求处理方式
    if (method == 'POST') {
        let postData = '';
        request.on('data', (_data) => {
            postData += _data;
        })
        request.on('end', () => {
            postData = qs.parse(postData);
            let result = {};
            switch (pathname) {
                case '/login':
                    //连接数据库，实现登陆逻辑
                    result = { status: true };
                    break;
                case '/register':
                    //连接数据库，实现注册逻辑
                    result = { status: true };
                    break;
                default:
                    result = { status: false, message: '没有对应的请求' };
                    break;
            }
            response.end(JSON.stringify(result));
        })
    }

    // get请求处理方式
    else if (method === 'GET') {
        let result = {};
        switch (pathname) {
            case '/students':
                //连接数据库，获取学生信息
                result = { status: true, data: [], params };
                break;
            case '/orders':
                //连接数据库，获取订单信息
                result = { status: true, data: [], params };
                break;
            default:
                result = { status: false, message: '没有对应的请求', params };
                break;
        }
        response.end(JSON.stringify(result))
    }
}).listen(3000);