import createElement from './createElement';
import updateChildren from './updateChildren';

/**
 * 对oldVnode, newVnode节点进行精细化比较
 * @param oldVnode
 * @param newVnode
 * @returns {*}
 */
export default function patchVnode (oldVnode, newVnode) {
  // console.log('进行精细化比较');
  // console.log('oldVnode',oldVnode)
  // oldVnode 和newVnode就是内存中的同一个对象（指针指向相同）？？
  if (oldVnode === newVnode) return;
  //  判断newVnode有没有text属性
  if (newVnode.text !== undefined && ( newVnode.children === undefined || newVnode.children.length === 0)) {
    newVnode.elm = oldVnode.elm; // 补充elm属性 （无论文字是不是一样都要提前补充elm属性）
    if (oldVnode.text === newVnode.text) return;
    // 如果新虚拟节 点中的text和老的虚拟节点的text不同，那么直接让新的text写入老的elm中即
    // 可。如果老的elm中是children,那么也会立即消失掉。
    // console.log('oldVnode.elm',oldVnode.elm)
    return oldVnode.elm.innerText = newVnode.text;

  }
  // oldVnode有没有children
  if (oldVnode.children === undefined || oldVnode.children.length === 0){
    // 清空oldVnode的text，将newVnode的children添加到Dom中
    oldVnode.text = undefined;
    // console.log('清空oldVnode的text，将newVnode的children添加到Dom中',oldVnode);
    oldVnode.elm.innerText = '';
    newVnode.children.forEach(i => {
      const newChildrenNode = createElement(i);
      oldVnode.elm.appendChild(newChildrenNode);
    })
  } else { // 复杂情况新旧节点都有children
    // console.log('复杂情况新旧节点都有children');
    // while (新前 <= 新后 && 旧前 <= 旧后) {
    //
    // }
    updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);



    // // 新增情况
    // let un = 0; // 所有未处理的节点开头
    // newVnode.children.forEach((i, index) => {
    //   console.log(index);
    //   const itemIndex = oldVnode.children.findIndex(j => {
    //     return i.sel === j.sel && i.key === j.key;
    //   })
    //   if (itemIndex === -1) { // 新增元素，将
    //     // 元素插入到未处理数据之前
    //     const newDom = createElement(i)
    //     i.elm = newDom; // 上树
    //     // if (oldVnode.children[un +1]) { // 非末尾元素
    //     if (un < oldVnode.children.length) { // 非末尾元素
    //       console.log('非末尾元素');
    //       console.log(oldVnode);
    //       oldVnode.elm.insertBefore(newDom,oldVnode.children[un].elm);
    //       return;
    //     }
    //     // 末尾元素
    //     oldVnode.elm.appendChild(newDom);
    //     return;
    //   } else {
    //     // 让处理的节点指针下移
    //     un++;
    //   }
    //   // 同一元素比较
    //
    //   // patchVnode(oldVnode.children[un],i)
    // })
  }
}