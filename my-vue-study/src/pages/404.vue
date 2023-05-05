<template>
<div class="not-fund">
  404
</div>
</template>

<script>
export default {
  name: 'notFund',
  mounted() {
    console.log(this.$route.params.pathMatch);
  }

}
</script>

<style scoped>
.not-fund {
  width: 100%;
  height: 100%;
  text-align: center;
  margin: auto;
  font-size: 55px;
}
</style>