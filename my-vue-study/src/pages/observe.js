import Observer from './Observer';
/**
 *  @param value 我们要侦测的对象
 * */
export default function observe(value) {
  // 如果value不是对象，什么都不做
  if (typeof value != 'object') { // 递归结束
    return;
  }
  //  定义ob
  let ob; //存储Observer类实例
  // __ob__ 不希望它与常见的属性重名
  if (typeof value.__ob__ !== 'undefined') {
    ob = value.__ob__;
  }else {
    ob = new Observer(value);
  }
  return ob;
}