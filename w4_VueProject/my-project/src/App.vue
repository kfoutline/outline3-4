<template>
  <div id="app">
    <img src="/logo.png"/>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/reg">reg</router-link> |
      <router-link to="/login">login</router-link>
    </div>
     <el-button type="primary">主要按钮</el-button>
    <router-view/>
  </div>
</template>
<script>
import Vue from 'vue';
import {Row,Button} from 'element-ui';
Vue.use(Button);
Vue.use(Row);


export default {
  async mounted(){
    console.log(this)
    
    await new Promise(function(resolve){
      setTimeout(()=>{
        console.log(123456);
        resolve(123)
      },1000)
    })
  }
}
</script>

<style lang="scss" module>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
