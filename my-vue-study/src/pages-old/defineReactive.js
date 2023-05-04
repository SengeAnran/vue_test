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
  //闭包中加入dep 和对象的Observer中的dep不一样
  const dep = new Dep();
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
      // 如果现在处于依赖收集阶段
      if (Dep.target) { // 模版解析的时候会读取模版中的变量， 这时Dep.target才会有值
        dep.depend();
        if (childOb) { // ？？？？？
          childOb.dep.depend();
        }
      }
      // const watcher = new Watcher();
      // dep.depend(watcher);
      return val;
    },
    set(v) {
      if (v=== val) {
        return;
      }
      console.log(`你试图改变${key}属性 ${v}`)
      val = v;
      // 当设置了新值，这个新值也要被observe
      childOb =observe(v);
      console.log(childOb);
      // 发布订阅模式，通知dep改变
      dep.notify()
    }
  });
}
export default defineReactive;