<script>
function getChildrenTextContent(children) {
  return children.map(function (node) {
    return node.children ? getChildrenTextContent(node.children) : node.text;
  }).join('');
}
export default {
  name: 'ATitle',
  props: {
    level: {
      type: Number,
      require: true,
    }
  },
  // render函数的优先级低于template
  render:function (createElement) {
    // 创建kebab-case 风格的id
    const headingId = getChildrenTextContent(this.$slots.default)
      .toLowerCase() // 全小写
      .replace(/\W+/g, '-') // 替换全局非字母下划线数字开头的字符串为 -
      .replace(/(^-|-$)/g, ''); // 将全局以-开头或以-结尾的字符替换为''
    return createElement(
      // {String | Object | Function}
      // 一个 HTML 标签名、组件选项对象，或者
      // resolve 了上述任何一种的一个 async 函数。必填项。
      'h'+ this.level, // 创建对应的标题节点
      // {Object}
      // 一个与模板中 attribute 对应的数据对象。可选。
      // this.$slots.default,
      // {String | Array}
      // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
      // 也可以使用字符串来生成“文本虚拟节点”。可选。
      // [
      //   '先写一些文字',
      //   createElement('h1', '一则头条'),
      //   createElement(MyComponent, {
      //     props: {
      //       someProp: 'foobar'
      //     }
      //   })
      // ]
      [ // 向标题节点内创建 a锚地节点设置其相关属性并将插槽内容写入
        createElement('a', {
          attrs: {
            name: headingId,
            href: '#' + headingId,
          }
        }, [
          this.$scopedSlots.default({
            level: this.level,
          }),
        ])
      ]
    )
  },
}
</script>

<style scoped>

</style>