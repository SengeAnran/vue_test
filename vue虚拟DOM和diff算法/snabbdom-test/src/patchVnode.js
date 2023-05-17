import createElement from './createElement';

export default function (oldVnode, newVnode) {
  console.log('进行精细化比较');
  // oldVnode 和newVnode就是内存中的同一个对象（指针指向相同）？？
  if (oldVnode === newVnode) return;
  //  判断newVnode有没有text属性
  if (newVnode.text !== undefined && ( newVnode.children === undefined || newVnode.children.length === 0)) {
    if (oldVnode.text === newVnode.text) return;
    // 如果新虚拟节 点中的text和老的虚拟节点的text不同，那么直接让新的text写入老的elm中即
    // 可。如果老的elm中是children,那么也会立即消失掉。
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

  }
}