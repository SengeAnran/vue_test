<script>
function getChildrenTextContent(children) {
  return (children|| []).map(function (node) {
    return node.children ? getChildrenTextContent(node.children) : node.text;
  }).join('');
}
export default {
  functional:true,
  name: 'ATitleFunctional',
  render:function (createElement, context) {
    // const headingId= 'ss';
    // 创建kebab-case 风格的id
    console.log(context.children)
    const headingId = getChildrenTextContent(context.children)
      .toLowerCase() // 全小写
      .replace(/\W+/g, '-') // 替换全局非字母下划线数字开头的字符串为 -
      .replace(/(^-|-$)/g, ''); // 将全局以-开头或以-结尾的字符替换为''
    return createElement(
      'h'+ context.props.level, // 创建对应的标题节点
      [ // 向标题节点内创建 a锚地节点设置其相关属性并将插槽内容写入
        createElement('a', {
          attrs: {
            name: headingId,
            href: '#' + headingId,
          }
        }, [
          context.scopedSlots.default({
            level: context.props.level,
          }),
        ])
      ]
    )
  },
}
// <div>
// <header>
//   <h1>I'm a template!</h1>
// </header>
// <p v-if="message">{{ message }}</p>
// <p v-else>No message.</p>
// </div>
// function anonymous(
// ) {
//   with(this){return _c('div',[
//     _m(0),
//     (message)?_c('p',[_v(_s(message))]):_c('p',[_v("No message.")])
//   ])}
// }

</script>

<style scoped>

</style>