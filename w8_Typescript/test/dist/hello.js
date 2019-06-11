"use strict";
var Test;
(function (Test) {
    // 数据类型检查
    Test.username = 'laoxie plus';
    console.log('username', Test.username);
    // 定义是不指定类型则ts会自动设置类型
    var age = 28;
    // age = 'xxx';//报错
    var str = '1';
    var str2 = str; //str、str2 是 string 类型
    console.log(str2);
    // 数组
    var user = ['ly', 'lx'];
    // 元组
    var yz = [12, 'ab', true];
    yz[1] = 10;
    // 对象
    var obj = {
        age: 18,
        username: 'laoxie',
        getName: function () { }
    };
    obj.getName = function () { };
    // 泛型编程
    function identity(arg) {
        return arg;
    }
    Test.identity = identity;
})(Test || (Test = {}));
console.log('username:', Test.username);
var output = Test.identity("myString");
console.log(output);
