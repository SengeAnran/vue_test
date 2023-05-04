/**
  * 收集依赖对象
  */
let uid= 0;
 export default class DepOld {
  constructor() {
   console.log('我是Dep类构造器');
   this.id = uid++;
  // 用数组存储自己的订阅者。subs是英语subscribes订阅者的意思。
  // 这个数组里面放的是Watcher的实例
   this.subs = [];
  }
  /**
   * 添加订阅
   * @param sub watchaer依赖
   */
  addSub(sub) {
    this.subs.push(sub);
  }
  // 添加依赖
  depend() {
   // Dep.target就是一个我们自己指定的"全局位置"，
   // 用window.target也行，只要是全局唯一，没有歧义就行
   if (DepOld.target) {
     this.addSub(DepOld.target);
   }
  }

 /**
  * 通知更新
  */
 notify() {
   console.log('我是notify');
  // 浅克隆一份
   const subs = this.subs.slice();
  // 遍历通知依赖数据改变（发布订阅者模式）
   for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
   }

  }
 }