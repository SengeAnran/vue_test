import vnode from './vnode';
import createElement from './createElement';
import patchVnode from './patchVnode';
/**
 * diff 算法
 * @param oldVnode 老节点
 * @param newVnode 新节点
 */
export default function patch (oldVnode, newVnode) {
//  判断节点是否为dom节点
  if (isDomNode(oldVnode)) {
    console.log('老节点为DOM节点');
    oldVnode = becomeVnode(oldVnode)
  }
  /**
   *  循环
   */
  // 判断是否为同一节点
  if (isSameNode(oldVnode, newVnode)) {
  //  进行精细化比较
    patchVnode(oldVnode, newVnode);
  } else {
    console.log('暴力插入新节点,删除旧节点，');
    const newNode = createElement(newVnode)
    if (oldVnode.elm.parentNode && newNode) {
      // 在旧节点前插入新节点
      oldVnode.elm.parentNode.insertBefore(newNode, oldVnode.elm);
      // 删除旧节点
      oldVnode.elm.parentNode.removeChild(oldVnode.elm);
    }
  }
}

/**
 * 判断节点是否为dom节点
 * @param vNode
 * @returns {boolean}
 */
function isDomNode(vNode) {
  // 虚拟节点含有ele属性
  // 等价于 vNode.sel == '' || vNode.sel === undefined
  return !vNode.hasOwnProperty('sel');
}
// 判断节点是否为dom节点
function becomeVnode(vNode) {
  const sel = vNode.tagName.toLowerCase();
  const data = {};
  const children = undefined;
  const text = vNode.innerText;
  const elm = vNode;
  return vnode(sel, data, children, text, elm);
}

/**
 * 判断两节点是否为同一个节点
 * @param oldVnode
 * @param newVnode
 * @returns {boolean}
 */
function isSameNode(oldVnode, newVnode) {
  return oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key;
}
function isSameObj(oldVnode, newVnode) {

}