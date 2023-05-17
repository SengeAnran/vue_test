/**
 * createElement 真正创建节点, 将vnode 创建为DOM，并返回
 * @param vnode
 * @returns {*}
 */
export default function createElement (vnode) {
  const ele = document.createElement(vnode.sel);
  // 有子节点还是有文本？？
  if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
  //   它内部是文字
    ele.innerText = vnode.text;
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
  //   它内部是子节点
    vnode.children.forEach(i => {
      const chDom = createElement(i)
       // 上树
      ele.appendChild(chDom);
    })
  }
  //  补充elm属性
  vnode.elm = ele;
  return ele;
}
