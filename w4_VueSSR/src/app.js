import Vue from 'vue';
import App from 'App.vue';

import {createRouter} from './router';
import { createStore } from './store'

// 创建工厂函数
// 用于创建新的应用程序、router 和 store 实例
// 避免全局污染
export function createApp(){
    const router = createRouter();
    const store = createStore();

    const app = new Vue({
        router,
        store,
        render:h=>h(App)
    });

    return app;
}