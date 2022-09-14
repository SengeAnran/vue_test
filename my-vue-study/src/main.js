import Vue from 'vue'
import App from './App.vue'
import './components/global'; // 引入全局组件

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app');
