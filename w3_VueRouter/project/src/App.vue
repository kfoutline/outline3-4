<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <transition 
    enter-active-class="animated" enter-to-class="bounceInLeft"
    leave-active-class="animated" leave-to-class="bounceOutRight"
    >
      <router-view/>
    </transition>
  </div>
</template>
<script>
import 'animate.css';
export default{

}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
