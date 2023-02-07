// export default {
//   name: 'TopATitle',
//   render: function (createElement) {
//     return createElement('a-title',{
//         props: {
//           level: 1,
//         }
//       },
//       [
//        createElement('span', 'hello' ),
//         'word'
//       ])
//   }
// }
export default {
  name: 'TopATitle',
  render: function (h) {
    const level = 2;
    h();
    return (<a-title level={level}>
              <span>hello</span>word
            </a-title>)
  }
}
