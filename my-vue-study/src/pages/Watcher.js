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
  }
  update() {
    console.log('有数据更新了');
  }
}