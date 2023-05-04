import Dep from './Dep'; // 用于设置全局变量
let uid = 0;
/**
 *  Watcher 依赖（被监控的元素）
 * @param target 监控对象
 * @param expression 表达式 eg: 'a.b.c.d'
 * @param callback 回调
 */
const targetStack = [];
function pushTarget(_target) {
  targetStack.push(Dep.target);
  Dep.target = _target;
}
function popTarget() {
  Dep.target = targetStack.pop();
}
export default class Watcher{
  constructor(target, expression, callback) {
    this.uid = uid ++;
    this.target = target;
    this.getter = parsePath(expression);
    this.callback = callback;
    this.value = this.get(); //监测对象的值
  }
  // 数据更新
  update() {
    console.log('wather接收到数据跟新');
    //   获取最新数据
    console.log('旧的数据值', this.value);
    const value = this.get();
    console.log('获取最新数据', value,this.value, value !== this.value);
    if (value !== this.value || typeof value === 'object') {
      const oldValue = this.value;
      this.value = value;
      //我们可以在定义的回调中访问this 所以要用call 改变this
      console.log('回调');
      this.callback.call(this.target,value, oldValue);
    }
  }
  // 获取值
  get() {
    pushTarget(this);
    const obj = this.target;
    let value;
    // 只要能找就一直找
    try { // 找得到需要监控的元素
      /**
       * ，window.target的含义就是当前执行上下文中的watcher实例。
       * 由于js单线程的特性，同一时刻只有一个watcher的代码在执行，
       * 因此window.target就是当前正在处于实例化过程中的watcher
       */
      value = this.getter(obj);
    } catch (e) { // 找不到监控的元素
      console.log('找不到监控的元素');
      Dep.target = null;
    }
    // 求值完毕后重置 避免影响其他地方的监测
    popTarget();
    return value;
  }
}

/**
 *  用于
 * @param str 字符串
 * @return 函数
 */
function parsePath(str) {
  const segments = str.split('.');
  return (obj) => {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return ;
      obj = obj[segments[i]];
    }
    return obj;
  }

}