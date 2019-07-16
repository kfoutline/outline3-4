/**
 * 客户端入口文件
 * 用于渲染DOM
 */
import {createApp} from './app';

const app = createApp();

const router = app.$router;

router.onReady(()=>{

    app.$mount('#app');
})