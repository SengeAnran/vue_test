import Vue from 'vue'
import App from './App.vue'
import './components/global'; // 引入全局组件
import 'animate.css';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index';
import less from 'less'
import store from './store/index'
// import { Button, Cascader } from 'element-ui';
// Vue.component(Button.name, Button);
// Vue.component(Cascader.name, Cascader);

Vue.use(less)
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');