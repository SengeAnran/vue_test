import {parsePath} from './util';
import Dep from './Dep';

let uid = 0;
/**
 * Watcher对象
 */
export default class Watcher {
  // vm.$watch('a.b.c.d',() => {})
  /**
   * 构造器
   * @param target 监听的对象
   * @param expression 监听对象的什么样的表达式 'a.b.c.d'
   * @param callback
   */
  constructor(target, expression, callback) {
    console.log('我是Watcher类构造器');
    this.id= uid++;
    this.target = target;
    this.getter = parsePath(expression); // expression： watcher 构造器 'a.b.c.d'按点拆分
    this.callBack = callback;
    this.value = this.get();
  }
  update() {
    console.log('有数据更新了');
    this.run();
  }
  // 获得被监控对象的值
  get() {
  //   进入依赖收集阶段, 让全局的 Dep.target设置为Watcher本身，那么就是进入依赖收集阶段
    Dep.target = this;
    console.log('this.target',this.target);
    const obj = this.target;
    let value;
    // 只要能找就一直找
    try {
      value = this.getter(obj);
    } catch (e) {
      Dep.target = null;
    }
    return value;
  }
  run() {
    this.getAndInvoke(this.callBack);
  }
  getAndInvoke(cb) {
    const value = this.get();
    console.log('newValue', value, 'oldValue', this.value);
    if (value !== this.value || typeof value === 'object') {
      const oldValue = this.value;
      this.value = value;
      console.log('zzzz');
      cb.call(this.target, value, oldValue)
    }
  }
}