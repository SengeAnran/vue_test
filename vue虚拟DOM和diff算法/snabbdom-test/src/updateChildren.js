import patchVnode from './patchVnode';
import patch from './patch';
import createElement from './createElement';
/**
 * 
 * @param parentElm
 * @param oldCh
 * @param newCh
 */
export default function updateChildren(parentElm, oldCh, newCh) {
  console.log('我是updateChildren');
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
  let keyMap; // 旧节点的keyMap , 减少循环便利次数
  console.log(oldStartIdx, newEndIdx);
  // 开始大while了
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 首先不是判断四个命中，而是要略过已经加und
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
      //将新后指向的节点"移动"放到旧后之后，将旧前置为undefined
      patchVnode(oldStartVnode, newEndVnode); // 对新旧节点进行精细化比较
      // 总结将原子节点插入到新到位置，原位置的节点会自动消失
      // 将新后指向的节点"移动"放到旧后之后
      const nextNode = oldEndVnode.elm.nextElementSibling;
      if (nextNode) {
        parentElm.insertBefore(newEndVnode.elm,nextNode);
      } else {
        console.log(newEndVnode,newEndVnode.elm);
        parentElm.appendChild(newEndVnode.elm);
        console.log(parentElm);
      }

      oldStartVnode = undefined; // 将旧前置为undefined
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    }else if (checkSameVnode(newStartVnode, oldEndVnode)) {
      // 新前与旧后
      // 将新前指向的节点"移动"放到旧前之前，将旧后置为undefined标记的东西
      if (oldStartVnode === null || oldStartVnode === undefined) {
        oldStartVnode = oldCh[++oldStartIdx];
      }
      if (oldEndVnode === null || oldEndVnode === undefined) {
        oldEndVnode = oldCh[--oldEndIdx];
      }
      patchVnode(oldEndVnode, newStartVnode); // 对新旧节点进行精细化比较
      parentElm.insertBefore(newStartVnode.elm,oldStartVnode.elm);// 将新后指向的节点"移动"放到旧后之后
      oldEndVnode = undefined; // 将旧后置为undefined，方便循环删除数据时判断，避免多删除数据
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newEndIdx];
    } else {
      // *** 官方写法 进行缓存 不用每次都循环遍历剩余旧节点
      //制作keyMap一个映射对象，这样就不用每次都追历老对象了
      if (!keyMap) {
        keyMap = {};
        for (let i = oldStartIdx; i <= oldEndIdx ; i++) {
          const key = oldCh[i].key;
          if (key !== undefined) {
            keyMap[key] = i;
          }
        }
      }
      // 寻找当前这项（newStartIdx）这项在keyMap中映射的位置序号
      const idxInOld = keyMap[newStartVnode.key];
      // 判断，如果idxInOld是undefined表示它是全新的项
      if (idxInOld === undefined) {
        //判断，如果idxInold是undefined表示它是全新的项
        // 被加入的项((就是newstartvnode这项)现不是真正的DOM节点
        parentElm.insertBefore(createElement(newStartVnode),oldStartVnode.elm);
      } else {
        // 如果不是，即不是全新的项则要移动
        const elmtoMove = oldCh[idxInOld];
        patchVnode(elmtoMove, newStartVnode);
        parentElm.insertBefore(newStartVnode.elm,oldStartVnode.elm);
        oldCh[idxInOld] = undefined; // 回收空间,后续命中跳过
      }
      newStartVnode = newCh[++newStartIdx];
      console.log(keyMap,idxInOld);
      // // 旧节点队列循环查找新前节点
      // // 如果找到则将新前节点放到旧前之前，并将找到的节点置为undefined
      // // 将新前往前移一格
      // // *****自写代码
      // let i = oldStartIdx
      // for (; i <= oldEndIdx ; i++) {
      //   if (checkSameVnode(oldCh[i], newStartVnode)) {
      //     patchVnode(oldCh[i], newStartVnode);
      //     parentElm.insertBefore(newStartVnode.elm,oldStartVnode.elm);
      //     // parentElm.removeChild(oldCh[i].elm);
      //     oldCh[i] = undefined; // 回收空间
      //     newStartVnode = newCh[++newStartIdx];
      //     break; // 找到提前结束循环
      //   }
      // }
      // // 如果循环一圈都没有找到
      // //将新前指向节点放到旧前之前
      // if (i > oldEndIdx) {
      //   createElement(newStartVnode);
      //   parentElm.insertBefore(newStartVnode.elm,oldStartVnode.elm);
      //   newStartVnode = newCh[++newStartIdx];
      // }
    }
  }

  // 将多余的数据进行删除
  if (oldStartIdx <= oldEndIdx) {
    for (let i = oldStartIdx; i <= oldEndIdx ; i++) {
      if (oldCh[i]) { // 兼容置为undefined节点
        parentElm.removeChild(oldCh[i].elm);
        oldCh[i] = undefined;// 回收内存
      }
    }
  }
  // 将剩余的数据进行插入到旧后之后
  if (newStartIdx <= newEndIdx) {
    for (let i = newStartIdx; i <= newEndIdx ; i++) {
      // 将vnode 转换为 node
      createElement(newCh[i]);
      // 源码写法
      // before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
      //parentElm.insertBefore(newCh[i].elm, before)
      const nextNode = oldEndVnode.elm.nextElementSibling; // 由于是先新后与旧前 后 新前与旧后 的命中顺序 所以不会出现旧后向前移导致while结束
      if (nextNode) {
        parentElm.insertBefore(newCh[i].elm, nextNode); // nextNode即为newEndVnode虚拟节点后一个虚拟节点的节点
        // insertBefore方法可以自动识别null, 如果nextNode为null就会自动排到队尾去，和appendChild是一致了
      } else {
        parentElm.appendChild(newCh[i].elm);
      }
    }
  }
};
// 判断是否是同一个虚拟节点
function checkSameVnode(a, b) {
  return a.sel === b.sel && a.key === b.key;
  
}
// 虚拟节点变为节点（多余代码）
function vnodeBeNode(vnode) {
  const node = document.createElement(vnode.sel)
  patch(node, vnode);
}