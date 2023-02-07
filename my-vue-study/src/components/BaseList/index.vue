<template>
<table>
  <thead>
  <tr>
    <th v-for="(item) in titles" :key="item">{{item}}</th>
    <th>操作</th>
  </tr>
  </thead>
  <tbody>
    <tr v-for="(item, index) in dataList" :key="index">
      <td>{{item.name}}</td>
      <td>{{item.age}}</td>
      <td>{{item.like.join('、')}}</td>
      <td>
        <slot name="action" :row="item"></slot>
      </td>
    </tr>
  </tbody>
</table>
</template>

<script>
export default {
  name: "BaseList",
  props: {
    dataList: {
      type: Array,
      default: () => {},
    }
  },
  data() {
    return{
      titles: ['姓名', '年龄', '爱好'],
    }
  }
}
</script>

<style scoped>

</style>