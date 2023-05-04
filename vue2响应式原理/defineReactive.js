import observe from './observe';
import Dep from './Dep';
/**
 *通过闭包的方式设置对象的属性的值
 * @param obj 对象
 * @param key 属性名
 * @param val 值
 * @returns {*}
 */
function defineReactive(obj, key, val) {
  //
  const dep = new Dep(); // vue1 每个节点都有一个对应的dep实例
  // 生成闭包 val的中间变量
  // console.log('我是defineReactive', key)
  if (arguments.length === 2) { // 值是对象就不用传值
    val = obj[key];
  }
  // 子元素要进行observe， 至此形成了递归。这个递归不是函数自己调用自己，而是多个函数、类循环调用
  let childOb = observe(val);
  Object.defineProperty(obj,key, {
    enumerable: true, /* 是否可以被枚举*/
    configurable: true,/*可被配置*/
    get() {
      console.log(`你试图访问${key}属性 ${val}`)
      // getter时收集依赖
      // Dep.target为全局变量，用于判断该属性是否为需要监控的属性
      if (Dep.target) {
        console.log('进行依赖收集');
        dep.depend();
        if (childOb) { // 存在子元素对象，对子元素也进行推入依赖
          console.log('子')
          childOb.dep.depend();
        }
      }
      return val;
    },
    set(v) {
      if (v=== val) {
        return;
      }
      console.log(`你试图改变${key}属性 ${v}`)
      val = v;

      // 当设置了新值，这个新值也要被observe
      childOb = observe(v);
      // 数据发生了变化进行通知
      dep.notify();
    }
  });
}
export default defineReactive;