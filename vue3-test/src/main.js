// 引入的不再是Vue构造函数了，引入的是一个名为createApp的工厂函数
// 工厂函数：首字母小写，不要new 就可使用
import { createApp } from 'vue'
import App from './App.vue'

// createApp(App).mount('#app')
// 创建应用实例对象（类似于之前vue2 中的vm, 但app比vm更'轻'）
const app = createApp(App);
console.log(app);
// 挂载
app.mount('#app');
// const vm = new Vue({
//   render: h=> h(app)
// })
// vm.$mount('#app');
