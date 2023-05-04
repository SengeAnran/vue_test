// 备份原来的方法然后加上响应式
// 得到Array.prototype
import {def} from './util';

const arrayPrototype = Array.prototype;
// 以arrayPrototype为原型创建arrayMethods对象
const arrayMethods = Object.create(arrayPrototype);
// 暴露
export {arrayMethods};
// 要被改写的7个方法
const methodsNeedChange = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse',
];
methodsNeedChange.forEach(methodName => {
  // 1.备份原来的方法
  const original = arrayPrototype[methodName];

  // 2，定义新的方法
  def(arrayMethods, methodName, function () {
    // console.log(arguments);
    //   3.恢复原来的方法
    //  函数直接使用（）执行，上下文为window， 所以不能直接调用备份的方法
    const result = original.apply(this, arguments); //apply方法必须将传给该函数的参数合并成一个数组作为自己的一个参数：
    // 把类数组对象变换为数组
    const args = [...arguments];
    // 6.把插入的新项也变成observe的
    // 把这个数组身上的__ob__取出来，__ob__已经被添加了，为什么已经被添加了？
    // 因为数组肯定不是最高层，比如obj.g属性是数组，obj不能是数组，
    // 第一次遍历obj这个对象的第一层的时候，已经给g属性（就是这个数组）添加了__ob__属性。
    const ob = this.__ob__;
    // 有三种方法push、unshift、splice能够插入新项，现在要把插入的新项也变成observe的
    let inserted = [];
    switch (methodName) {
      case 'push':
      case 'unshift':
        inserted = arguments;
        break;
      case 'splice':
    //    splice格式是splice(下标， 数量， 插入的新项)
        inserted = args.slice(2);
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    // console.log('啦啦啦',v, this);
    console.log('啦啦啦');
    ob.dep.notify();
    return result;
  })
})