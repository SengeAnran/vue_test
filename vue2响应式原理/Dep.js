let uid= 0;
/**
 * dep
 * 依赖管理器
 * 管理器sub中存储依赖
 * 当getter读取数据时讲依赖加入依赖管理器中
 * 当数据跟新时以发布订阅者方式向收集当各项依赖（watcher）发布update通知
 */
export default class Dep {
  constructor() {
    console.log('我是Dep的构造器');
    this.id = uid ++; // id (好习惯)
    this.sub = [];
  }
  depend() {
    if (Dep.target) {
    console.log('加入依赖',Dep.target);
    this.sub.push(Dep.target);
    console.log(this.sub);
    }
  }
  notify() {
    // 当数据跟新时以发布订阅者方式向收集当各项依赖（watcher）发布update通知
    console.log('监听的东西数据更新了');
    for (let i = 0, l = this.sub.length; i < l; i++) {
      console.log('数据通知',i);
      this.sub[i].update();
    }
  }
}