<template>
  <div class="progress">
    <div class="progress-left">
      <div class="progress-top">
        <div class="txt">当前进度</div>
        <div class="progress-value">{{ progress }}%</div>
      </div>
      <el-progress :stroke-width="4" :show-text="false" :percentage="progress"></el-progress>
    </div>
    <div class="progress-right" @click.stop="$emit('cancel')"></div>
  </div>
</template>

<script>
export default {
  name: 'CommonProgress',
  props: {
    progress: {
      type: Number,
    },
  },
};
</script>

<style lang="scss" scoped>
.progress {
  //margin: auto;
  display: flex;
  width: max-content;
  .progress-left {
    width: 180px;
    .progress-top {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 17px;
    }
  }
  .progress-right {
    margin-left: 8px;
    width: 18px;
    height: 18px;
    background: url('./close.png') no-repeat;
    background-size: 100%;
  }
}
</style>
