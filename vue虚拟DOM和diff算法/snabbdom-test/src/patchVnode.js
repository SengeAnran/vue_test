import createElement from './createElement';

export default function patchVnode (oldVnode, newVnode) {
  console.log('进行精细化比较');
  // oldVnode 和newVnode就是内存中的同一个对象（指针指向相同）？？
  if (oldVnode === newVnode) return;
  //  判断newVnode有没有text属性
  if (newVnode.text !== undefined && ( newVnode.children === undefined || newVnode.children.length === 0)) {
    if (oldVnode.text === newVnode.text) return;
    // 如果新虚拟节 点中的text和老的虚拟节点的text不同，那么直接让新的text写入老的elm中即
    // 可。如果老的elm中是children,那么也会立即消失掉。
    console.log('oldVnode.elm',oldVnode.elm)
    newVnode.elm = oldVnode.elm; // 补充elm属性
    return oldVnode.elm.innerText = newVnode.text;

  }
  // oldVnode有没有children
  if (oldVnode.children === undefined || oldVnode.children.length === 0){
    // 清空oldVnode的text，将newVnode的children添加到Dom中
    oldVnode.text = undefined;
    console.log(oldVnode);
    oldVnode.elm.innerText = '';
    newVnode.children.forEach(i => {
      const newChildrenNode = createElement(i);
      oldVnode.elm.appendChild(newChildrenNode);
    })
  } else { // 复杂情况新旧节点都有children
    console.log('复杂情况新旧节点都有children');
    // 新增情况
    newVnode.children.forEach((i, index) => {
      console.log(index);
      const itemIndex = oldVnode.children.findIndex(j => {
        return i.sel === j.sel && i.key === j.key;
      })
      if (itemIndex === -1) { // 新增元素，将
        // 元素插入到未处理数据之前
        const newDom = createElement(i)
        i.elm = newDom; // 上树
        if (oldVnode.children[itemIndex +1]) { // 非末尾元素
          console.log('非末尾元素');
          console.log(index,oldVnode.children[index].elm)
          oldVnode.children[index].elm.parentNode.insertBefore(newDom,oldVnode.children[index].elm);
          return;
        }
        // 末尾元素
        console.log('末尾元素');
        oldVnode.children[index].elm.parentNode.appendChild(newDom);
        return;
      }
      // 同一元素比较

      patchVnode(oldVnode.children[index],i)
    })
  }
}