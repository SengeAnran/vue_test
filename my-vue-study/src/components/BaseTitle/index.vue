<template>
 <div class="title">{{title}}</div>
</template>

<script>
export default {
  name: 'BaseTitle',
  props: {
    title: String,
  }
}
</script>

<style scoped>
.title {
  font-size: 24px;
}
</style>