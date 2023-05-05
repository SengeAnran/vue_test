import Vue from 'vue';
import VueRouter from 'vue-router';
import {routes} from './route-list';
// 1.安装插件
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active', // 选中时添加的class类
})
router.beforeEach((to, from, next) => {
  window.document.title = to.name || '';
  next();
})
export default router;