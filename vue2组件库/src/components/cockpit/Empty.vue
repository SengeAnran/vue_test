<template>
  <div class="empty-wrp" ref="empty">
    <img src="../assets/img/empty.png" alt="" />
    <span class="txt">暂无数据</span>
  </div>
</template>
<script>
export default {
  props: {
    scale: {
      type: Number,
      default: 1,
    },
  },
  mounted() {
    if (this.scale !== 1) {
      this.$refs.empty.style = `transform:scale(${this.scale});`;
    }
  },
};
</script>
<style lang="scss" scoped>
.empty-wrp {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform-origin: top left;

  .txt {
    color: #5f7691;
    font-size: 14px;
    margin-top: 8px;
    letter-spacing: 0.5px;
  }
}
</style>
