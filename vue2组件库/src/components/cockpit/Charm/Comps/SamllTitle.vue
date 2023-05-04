<template>
  <div class="title-wrapper">
    <img src="@/assets/images/Charm/title-icon.png" alt=""> {{name}}
  </div>
</template>
<script>
export default {
  props: {
    name: {
      default: '名称',
      type: String,
    },
  },
};
</script>
<style scoped lang="scss">
.title-wrapper {
  color: #FFFFFF;
  font-size: 3.17rem;
  width: 100%;
  padding: 0 2rem;
  height: 6.3rem;
  line-height: 6.3rem;
  background: linear-gradient(90deg, rgba(116, 226, 252, .2) 0% , rgba(116, 226, 252, 0) 100%);
  img{
    width: 2.99rem;
    height: 2.3rem;
  }
}
</style>
