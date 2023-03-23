<template>
  <div class="block">
    <span class="demonstration">默认 click 触发子菜单</span>
    <el-cascader
      v-model="value"
      :props="propsConfig"
      @change="handleChange"></el-cascader>
  </div>
</template>

<script>
let id =0;
export default {
  name: 'BaseCascader',
  data() {
    return {
      value: [
        {
          name: 1,
          id: 1,
        },
        // {
        //   name: 2,
        //   id: 2,
        // },
        // {
        //   name: 4,
        //   id: 4,
        // },
      ],
      propsConfig: {
        lazy: true,
        checkStrictly: true,
        lazyLoad: (node, resolve) =>this.getData(node, resolve)
      }
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    getData (node, resolve) {
      const {level} = node;
      setTimeout(function () {
        const nodes = Array.from({ length: level + 1 })
          .map( () => {
            console.log(this);
            return {
              value: {
                name: ++id,
                id: id,
              },
              label: `选项${id}`,
              leaf: level >= 2
            }
          });
        // 通过调用resolve将子节点数据返回，通知组件数据加载完成
        resolve(nodes);
      },200);
    }
  }
}
</script>

<style scoped>

</style>