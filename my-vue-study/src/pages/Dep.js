/**
  * 收集依赖对象
  */
 export default class Dep {
  constructor() {
   console.log('我是Dep类构造器');
  }
  notify() {
   console.log('我是notify');
  }
 }