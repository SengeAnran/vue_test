/**
 * 渲染函数
 * @param tapName 节点标签名 {String | Object | Function}
 * @param option 属性数据对象 {Object}
 * @param children 包含的内容 {String | Array}
 *  形态① h('div', {}, '文字')
 *  形态② h('div', {}, [])
 *  形态③ h('div', {}, h())
 *  形态4 h('div', {}, ['文字',h()])
 *  形态5 h('div', h())
 *  形态6 h('div', '文字')
 */
export function myH(tapName, option ={}, child = '') {
  let obj = {};
  let data = {},elm, key, text, children;
  if ( typeof tapName === 'string' && !tapName) {
    return alert()
  }
  obj.sel = tapName;
  // 函数的重载
  // 兼容只要两个入参
  if ( option instanceof Object && !(option instanceof Array) && !option.hasOwnProperty('sel')) {
    // 第二参数为节点属性
    initData(data, option); // 节点属性
  } else { // 数组或字符串
    initChildren(obj, option); // 第二参数为子元素
  }
  if (arguments.length === 3) {
    initChildren(obj, child);
  }
  if (data.key) {
    key = data.key;
  }
  obj = {data ,elm, key, children,...obj  }
  return obj;
}

/**
 * 属性设置
 * @param obj
 * @param option
 */
function initData(obj, option) {
  Object.keys(option).forEach(i => {
    // defProperty(obj,changeName(i), option[i]);
    obj[changeName(i)] = option[i];
  })
}
function defProperty(obj, key, value) {
  Object.defineProperty(obj, key,{
    value: value,
    enumerable: true,
    configurable: true,
    writable: true,
  })
}
function changeName(key) {
  const keyChangeName = {
    class: 'class',
    style: 'style',
    attrs: 'in',
    props: 'props',
  };

  return keyChangeName[key];
}

/**
 * 进行子虚拟节点设置
 * @param obj
 * @param children {String|Array|Object}
 */
function initChildren(obj, children) {
  if (typeof children === 'string') {
    obj.text = children;
    return;
  }
  if (children instanceof Array) {
    const index = children.findIndex(i => {
      return typeof i === 'string';
    });
    // 收集children
    obj.children = children.filter(i => {return typeof i !== 'string'} );
    if (index !== -1) { // // 对第一个字符串元素进行创建虚拟节点
      obj.children.splice(0,0,myH(undefined,{},children[index]));
    }
    return;
  }
  // 调用h函数生成的对象
  if (children instanceof Object && children.hasOwnProperty('sel')) {
    obj.children = [children];
  } else {
    throw new Error('传人的第三个参数数据类型不对');
  }
}
// 讲虚拟节点变成真实节点
export function patch() {

}

function sameVnode( vnode1, vnode2) {
return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}