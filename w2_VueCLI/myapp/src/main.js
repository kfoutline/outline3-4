import Vue from 'vue'
import App from './App.vue'
console.log(App)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
