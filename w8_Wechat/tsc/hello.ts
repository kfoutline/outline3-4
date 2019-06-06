// 数据类型检查
let username:string = 'laoxie';
console.log('username',username);

// 定义是不指定类型则ts会自动设置类型
let age = 18;
// age = 'xxx';//报错


var str = '1' 
var str2:number = <number> <any> str   //str、str2 是 string 类型
console.log(str2)

// 数组
let user:string[] = ['ly','lx']

// 元组
let yz = [12,'ab',true];
yz[1] = 10;

// 对象
let obj = {
    age:18,
    username:'laoxie',
    getName:function(){}
}
obj.getName = ()=>{}