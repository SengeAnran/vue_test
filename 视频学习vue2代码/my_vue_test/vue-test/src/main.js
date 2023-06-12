import Vue from 'vue'
import App from './App.vue'
import myPlugins from '../plugins/myPlugins';

Vue.config.productionTip = false
Vue.use(myPlugins);
let a = 'ssg';
new Vue({
  render: h => h(App),
}).$mount('#app')
