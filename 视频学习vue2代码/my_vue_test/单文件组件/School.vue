<template>
  <div>学校名称{{name}}</div>
  <div>学校位置{{address}}</div>
</template>

<script>
export default {
  name: 'School',
  data() {
    return {
      name: '四川轻化工大学',
      address:'宜宾',
    }
  }
}
</script>

<style scoped>

</style>