<template>
  <div class="school bg-pink">
    <div v-red @click="$emit('showOne', name)">学校名称{{name | mySlice}}</div>
    <div>学校位置{{address}}</div>
    <button @click="hello">说话</button>
  </div>
</template>

<script>
export default {
  name: 'School',
  data() {
    return {
      name: '四川轻化工大学',
      address:'宜宾',
    }
  },
  mounted() {
    console.log(this);

  }
}
</script>

<style lang="less" scoped>
.bg-pink {
  background-color: pink;
}
</style>