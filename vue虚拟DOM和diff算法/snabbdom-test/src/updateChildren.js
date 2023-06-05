import patchVnode from './patchVnode';
/**
 * 
 * @param parentElm
 * @param oldCh
 * @param newCh
 */
export default function updateChildren(parentElm, oldCh, newCh) {
  console.log('我是updateChildren');
  console.log(parentElm, oldCh, newCh);
  // 序号
  let oldStartIdx = 0; // 旧前
  let newStartIdx = 0; // 新前
  let oldEndIdx = oldCh.length -1; // 旧后
  let newEndIdx = newCh.length -1; // 新后
  // 真正的节点
  let oldStartVnode = oldCh[0]; // 旧前节点
  let oldEndVnode = oldCh[oldEndIdx]; // 旧后节点
  let newStartVnode = newCh[0]; // 新前节点
  let newEndVnode = newCh[newEndIdx]; // 新后节点
  console.log(oldStartIdx, newEndIdx);
  // 开始大while了
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (checkSameVnode(newStartVnode, oldStartVnode)) {
      // 新前与旧前
      patchVnode(oldStartVnode, newStartVnode); // 对新旧节点进行精细化比较
      oldStartVnode = oldCh[++oldStartIdx];// 移动指针
      newStartVnode = newCh[++newStartIdx];// 移动指针
    }else if (checkSameVnode(newEndVnode, oldEndVnode)) {
      // 新后与旧后
      patchVnode(oldEndVnode, newEndVnode); // 对新旧节点进行精细化比较
      oldEndVnode = oldCh[--oldEndIdx];// 移动指针
      newEndVnode = newCh[--newEndIdx];// 移动指针
    }else if (checkSameVnode(newEndVnode, oldStartVnode)) {
      // 新后与旧前
      //将新后指向的节点方后旧后之后，将旧前置为undefined
      patchVnode(oldStartVnode, newEndVnode); // 对新旧节点进行精细化比较
      oldStartVnode.elm.parentNode.insert


    }else if (checkSameVnode(newStartVnode, oldEndVnode)) {
      // 新前与旧后

    } else {
      // 循环
    }

  }
};
// 判断是否是同一个虚拟节点
function checkSameVnode(a, b) {
  return a.sel === b.sel && a.key === b.key;
  
}