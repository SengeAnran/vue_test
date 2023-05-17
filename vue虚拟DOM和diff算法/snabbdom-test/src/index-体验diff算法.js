import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";
import {myH} from './myIndex';
// 创建出patch函数（diff算法核心）
// init组装各种模型
const patch = init([ classModule, propsModule, styleModule, eventListenersModule,]);
// 创建虚拟节点
const vnode1 = h('div', {}, [
  h('p', {key: 'A'}, 'A'),
  h('p', {key: 'B'}, 'B'),
  h('p', {key: 'C'}, 'C'),
  h('p', {key: 'D'}, 'D'),
])
const vnode2 = h('div', {},
  [
    h('p', {key: 'B'}, 'B'),
    h('p', {key: 'A'}, 'A'),
    h('p', {key: 'C'}, 'C'),
    h('p', {key: 'D'}, 'D'),
  ])
const resObj = myH('div', {class: 'box'}, [
  '百度a',
  myH('h1', {}, '我是标题1'),
  myH('h1', {}, '我是标题2'),
  myH('h1', {}, 'sss'),
  myH('h1', {}, myH('span', '哈哈哈')),
]);
const myVnode1 = h('div', {class: 'box'}, [
  '百度',
  h('h1', {}, '我是标题1'),
  h('h1', '我是标题1'),
  h('h1', '我是标题3', '绅士手'),
  h('h1', h('span', '哈哈哈')),
]);
console.log('resObj', resObj);
console.log('resObj', myVnode1);
// 让虚拟节点上树
const container = document.querySelector('#container');
const btn = document.querySelector('#btn');
// 上树
patch(container, vnode1);
btn.addEventListener('click', () => {
  console.log('改变');
  patch(vnode1, vnode2);
})
// const patch = init([
//   // Init patch function with chosen modules
//   classModule, // makes it easy to toggle classes
//   propsModule, // for setting properties on DOM elements
//   styleModule, // handles styling on elements with support for animations
//   eventListenersModule, // attaches event listeners
// ]);
//
// const container = document.getElementById("container");
//
// const vnode = h("div#container.two.classes", { on: { click: () => console.log("div clicked") } }, [
//   h("span", { style: { fontWeight: "bold" } }, "This is bold"),
//   " and this is just normal text",
//   h("a", { props: { href: "/foo" } }, "I'll take you places!"),
// ]);
// // Patch into empty DOM element – this modifies the DOM as a side effect
// patch(container, vnode);
//
// const newVnode = h(
//   "div#container.two.classes",
//   { on: { click: () => console.log("updated div clicked") } },
//   [
//     h(
//       "span",
//       { style: { fontWeight: "normal", fontStyle: "italic" } },
//       "This is now italic type"
//     ),
//     " and this is still just normal text",
//     h("a", { props: { href: "/bar" } }, "I'll take you places!"),
//   ]
// );
// // Second `patch` invocation
// patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state
// const obj = {
//   sel: '' , // 标签名
//   data: {}, // 属性数据
//   children: [], // 子节点
// }