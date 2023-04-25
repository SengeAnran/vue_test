import observe from './observe';
/**
 *通过闭包的方式设置对象的属性的值
 * @param obj 对象
 * @param key 属性名
 * @param val 值
 * @returns {*}
 */
function defineReactive(obj, key, val) {
  // 生成闭包 val的中间变量
  console.log('我是defineReactive', key)
  if (arguments.length === 2) { // 值是对象就不用传值
    val = obj[key];
  }
  // 子元素要进行observe， 至此形成了递归。这个递归不是函数自己调用自己，而是多个函数、类循环调用
  observe(val);
  Object.defineProperty(obj,key, {
    enumerable: true, /* 是否可以被枚举*/
    configurable: true,/*可被配置*/
    get() {
      console.log(`你试图访问${key}属性 ${val}`)
      return val;
    },
    set(v) {
      if (v=== val) {
        return;
      }
      console.log(`你试图改变${key}属性 ${v}`)
      val = v;
      // 当设置了新值，这个新值也要被observe
      observe(v);
    }
  });
}
export default defineReactive;