# TypeScript教程

## 介绍
TypeScript由微软开发的自由和开源的编程语言，设计目标是开发大型应用，是js的扩展（支持现有js代码），通过编译成纯 JavaScript在不同的浏览器中运行

## 安装

```bash
    # 全局安装
    npm install -g typescript

    #安装后通过tsc命令执行
    tsc -v
```

## 使用

### 语言扩展

* 类型批注和编译时类型检查
* 类型推断
* 类型擦除
* 接口
* 枚举
* Mixin
* 泛型编程
* 命名空间
* 元组
* Await

* 类
* 模块
* lambda 函数的箭头语法
* 可选参数以及默认参数

### 对比JS的变化

* 声明格式：`var [变量名] : [类型] = 值;`
* 函数重载
* 元组
* 联合类型
* 接口interface:抽象与定义类型
* 命名空间namespace:解决重名问题

### tsc命令

* 格式：`tsc <...文件> <参数>`
* 参数：
    * --help 显示帮助信息
    * --module 载入扩展模块
    * --target 设置 ECMA 版本
    * --declaration 额外生成一个 .d.ts 扩展名的文件。
    ```bash
        # 以下命令会生成 ts-hw.d.ts、ts-hw.js 两个文件
        tsc ts-hw.ts --declaration
    ```
    * --removeComments 删除文件的注释
    * --out 编译多个文件并合并到一个输出的文件
    * --sourcemap 生成一个 sourcemap (.map) 文件。
        >sourcemap 是一个存储源代码与编译代码对应位置映射的信息文件。
    * --module noImplicitAny 在表达式和声明上有隐含的 any 类型时报错
    * --watch 在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译。