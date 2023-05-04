<template>
<div class="page">
  用户id{{$route.params.id}}
  <p>用户名:{{$route.params.username}}</p>
</div>
</template>

<script>
export default {
  name: 'user',
  mounted() {
    console.log(this.$route);
  }
}
</script>

<style scoped>

</style>