import Vue from 'vue'
import App from './App.vue'
import myPlugins from '../plugins/myPlugins';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(myPlugins);
Vue.use(ElementUI);
let a = 'ssg';
new Vue({
  render: h => h(App),
  beforeMount() {
    Vue.prototype.$bus = this;
  }
}).$mount('#app')
