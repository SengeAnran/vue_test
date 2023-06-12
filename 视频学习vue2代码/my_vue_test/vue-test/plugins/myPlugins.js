// 插件是一个对象
export default {
  install(Vue) {
  //  自定义指令
    Vue.directive('red',{
      inserted(el) {
        el.style.color = 'red';
      },
    });
  //  混入
    Vue.mixin({
      data() {
        return {
          x:100,
          y:100,
        }
      }
    })
  //   Vue.
  //    注入依赖
  //  全局过滤器
    Vue.filter('mySlice', function (value) {
      console.log(value);
      return value.slice(0,4) + '...';
    })
  //  给Vue原型上添加一个方法（vm和vc就都能用了）
    Vue.prototype.hello = () => {alert('你哈啊！')}
  //  方法
  }
}