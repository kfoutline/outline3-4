
# 服务端渲染SSR
单页面应用有一个致命的缺点，就是 SEO 极不友好。所以需要在服务端渲染（ssr）并直接返回已经渲染好的页面，这样搜索引擎才能爬取得到得内容；

## 概念
* SSR(服务端渲染): 前后端不分离，在服务器生成所有代码并响应到前端渲染，指传统的 Java、ASP 或 PHP 的渲染机制
    * 优势
        * 首屏性能
        * SEO
        >传统的搜索引擎只会从 HTML 中抓取数据，导致前端渲染的页面无法被抓取
* BSR(客户端渲染): 前后端分离，利用ajax请求把数据请求到前端渲染，代表是现在流行的 SPA 单页面应用
    * 优势
        * 局部刷新
        * 懒加载
        * 交互体验
        * 节约服务器成本
        * 关注分离设计


## vue-server-renderer

## Nuxt.js

Nuxt.js 是一个基于 Vue.js 的通用应用框架

### 安装
* nuxt脚手架：create-nuxt-app
    ```bash
        #npx
        npx create-nuxt-app <项目名>

        # npm
        npm install -g create-nuxt-app
        create-nuxt-app <项目名>

        # yarn
        yarn create nuxt-app <项目名>
    ```
* vue-cli安装
    ```bash
        vue init nuxt-community/starter-template <project-name>
    ```

### 目录结构
* assets
* layouts
* middleware
* pages
* plugins

### 路由配置pages

>Nuxt约定所有页面都放在pages文件夹下，Nuxt会根据目录结构自动生成对应的路由

* 基础路由
>根据pages目录生成vue-router基础配置

* 动态路由
>需要创建对应的以下划线作为前缀的 Vue 文件 或 目录

```
    pages/
    --| _slug/
    -----| comments.vue
    -----| index.vue
    --| users/
    -----| _id.vue
    --| index.vue
```
```js
    //nuxt会根据以上pages目录生成如下路由配置
    router: {
    routes: [
        {
        name: 'index',
        path: '/',
        component: 'pages/index.vue'
        },
        {
        name: 'users-id',
        path: '/users/:id?',
        component: 'pages/users/_id.vue'
        },
        {
        name: 'slug',
        path: '/:slug',
        component: 'pages/_slug/index.vue'
        },
        {
        name: 'slug-comments',
        path: '/:slug/comments',
        component: 'pages/_slug/comments.vue'
        }
    ]
    }
```
* 嵌套路由
>需要添加一个 vue 文件，同时添加一个与该文件同名的目录用来存放子视图组件

```
    pages/
    --| users.vue
    --| users/
    -----| _id.vue
    -----| index.vue
```
* 中间件
    >中间件允许您定义一个自定义函数运行在一个页面或一组页面渲染之前。

    * 定义
        >每一个中间件应放置在 middleware/ 目录。文件名的名称将成为中间件名称(如：middleware/auth.js将成为 auth 中间件)。

        ```js
           // 一个中间件接收 context 作为第一个参数：
            export default function (context) {
                context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
            }
        ```
        * 中间件可以定义在以下文件的`middleware`属性中
            * 配置文件：nuxt.config.js
            * 匹配布局文件：layout/*.vue
            * 匹配页面文件：pages/*.vue
    * 中间件执行流程顺序：
        * nuxt.config.js
        * 匹配布局
        * 匹配页面

### 插件plugins
通常情况下我们都需要引入第三方的插件，比如前端UI组件element-ui，使用步骤如下：
1. 安装
```bash
    npm install element-ui
```
虽然安装element-ui的包但是却不能像普通项目那样直接在项目中import使用，需要

2. 在pulgin文件夹下创建element-ui.js，内容如下
```js
    import Vue from 'vue'
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css'
    Vue.use(ElementUI)
```

3. 在nuxt.config.js中添加plugins属性
```js
    module.exports = {
        //...
        plugins: ['~plugins/element-ui'] // ~为src目录别名
    }
```

### 静态资源文件
编译过程中，所有的资源URL例如 `<img src="...">`、 `background: url(...) `和 CSS中的 `@import` 均会被webpack解析成模块并通过 `require(...)` 引用, 对于不需要通过 Webpack 处理的静态资源文件，可以放置在 `static` 目录中，webpack会原样复制到网站根目录中（使用绝对路径引入方式）。
>尺寸小于1K的时候，它将会被转换成 Base64 data URL 来内联引用，~或@为`src`目录别名