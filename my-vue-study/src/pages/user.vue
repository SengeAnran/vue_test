<template>
<div class="page">
  <router-link :to="{path: '/user/33/黄倩'}">切换用户</router-link>
  <div class="">
    用户id{{$route.params.id}}
    <p>用户名:{{$route.params.username}}</p>
  </div>

</div>
</template>

<script>
export default {
  name: 'user',
  mounted() {
    console.log(this.$route);
  },
  watch: {
    $route(to, from) {
      if (to.name === from.name) {
        // 组件复用时生命周期回调失效
        // 组件复用处理
        console.log(this.$route);
      }
    }
  }
}
</script>

<style scoped>

</style>