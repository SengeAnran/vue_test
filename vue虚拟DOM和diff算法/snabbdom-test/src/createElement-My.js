/**
 * createElement 真正创建节点, 将vnode 创建为DOM，插入到pivot这个元素之前
 * @param vnode
 * @param pivot
 * @returns {*}
 */
export default function (vnode, pivot) {
  const ele = document.createElement(vnode.sel);
  // 有子节点还是有文本？？
  if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
  //   它内部是文字
    ele.innerText = vnode.text;
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
  //   它内部是子节点
  //   ele.innerHTML =
    vnode.children.forEach(i => {
      createChildrenElement(i,ele)
    })
  }
  //  补充elm属性
  vnode.elm = ele;

  if (pivot.parentNode && ele) {
    //将孤儿节点上树。让标杆节点的父元素调用insertBefore方法， 将新的孤儿节点插入
    // 到标签节点之前
    pivot.parentNode.insertBefore(ele, pivot );
    // 删除老节点
    pivot.parentNode.removeChild(pivot);
  }

}

/**
 * 向父节点parentNode中加入vnode对应子节点
 * @param vnode
 * @param parentNode
 */
function createChildrenElement(vnode, parentNode) {
  const ele = document.createElement(vnode.sel);
  // 有子节点还是有文本？？
  if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
    //   它内部是文字
    ele.innerText = vnode.text;
    //将孤儿节点上树。让标杆节点的父元素调用nsertBefore方法， 将新的孤儿节点插入
    // 到标签节点之前
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    //   它内部是子节点
    //   ele.innerHTML =
    vnode.children.forEach(i => {
      createChildrenElement(i,ele)
    })
  }
  //  补充elm属性
  vnode.elm = ele;
  parentNode.appendChild(ele);
}