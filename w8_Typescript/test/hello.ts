namespace  Test {
    // 数据类型检查
    export let username:string = 'laoxie plus';
    console.log('username',username);

    // 定义是不指定类型则ts会自动设置类型
    let age = 28;
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

    // 泛型编程
    export function identity<T>(arg: T): T {
        return arg;
    }
}

console.log('username:',Test.username)
let output = Test.identity<string>("myString");console.log(output)



interface Person {
    name: string;

    // 可选属性
    age?:number;

    // 只读属性（只能在创建的时候被赋值）
    readonly marry:boolean

    // 任意属性
    [propName: string]: any;

}

let user:Person = { name: "laoxie",marry:true,gender:'男'};