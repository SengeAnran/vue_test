import {def} from './util';
import defineReactive from './defineReactive';
// import observe from './observe';
import {arrayMethods} from './array'
import observe from './observe';
import Dep from './Dep';

/**
 * Observer 用于将一个正常的对象转换为每个层级的属性都是响应式的（可以被侦测的）
 */
// 创造一个类就要思考这个类如何被实例化
export default class Observer {
  // 构造器
  constructor(value) {
    // ①每个observer的实例,成员中都有一个Dep的实例
    this.dep = new Dep();
    // __ob__:不可枚举属性，不希望被遍历
    // 给实例（this， 一定要注意，构造函数中的this不是表示类本身，而是表示实例）
    // 添加了__ob__属性，值是这次new的实例
    // __ob__提升响应式效率，当赋值为响应式式不会在做响应式递归操作处理
    def(value, '__ob__', this, false);
    console.log('我是Observer构造器',value);

    // 检查是数组还是对象
    if (Array.isArray(value)) {
    // 4. 如果是数组，要非常强行的蛮干：将这个数组的原型指向arrayMethods
      Object.setPrototypeOf(value, arrayMethods);
      // 5.将数组的每一项都进行响应式处理
      this.observeArray(value);
    } else {
      //  不要忘记初心,Observer类的目的：将一个正常的对象转换为每个层级的属性都是响应式的（可以被侦测的）object
      this.walk(value);
    }

  }

  /**
   * 对象遍历子属性逐个添加，检测（响应式）
   * @param value
   */
  walk(value) {
    for (let k in value) {
      defineReactive(value, k);
      //此处如果这样写会导致// 当设置了新值，这个新值不会被observe，新值不能响应式
      // observe(value[k]);
    }
  }

  /**
   * 数组特殊遍历
   * @param arr
   */
  observeArray(arr) {
    for (let i = 0, l = arr.length; i < l; i++) { // 防止在遍历的过程中数组长度的变化
      // 逐项进行observe
      // console.log('逐项进行observe');
      observe(arr[i]);
    }
  }
}