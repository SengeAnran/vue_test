<!-- 投票统计 -->
<template>
  <div class="Vote-page">
    <div class="item" v-for="item in dataSource" :key="item.title">
      <van-progress :pivot-text="item.title" :percentage="item.percent" :stroke-width="item.percent" />
      <span class="after-text">{{ `${item.num}${item.unit}` }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  dataSource: { type: Array, required: true },
});
</script>
<style lang="scss" scoped>
.Vote-page {
  :deep(.van-progress) {
    height: 100% !important;
    background: #e9eefe;
    padding: 4px;
  }
  :deep(.van-progress__pivot) {
    left: 8px !important;
    transform: translate(0%, -50%) !important;
    background: none;
    color: #333333;
  }
  :deep(.van-progress__portion) {
    height: calc(100% - 8px);
    background: #3c7dff;
    margin: 0 4px;
  }
  .item {
    width: 100%;
    height: 40px;
    position: relative;
    margin-bottom: 10px;
    color: #333333;
    font-size: 14px;
    position: relative;
    .after-text {
      position: absolute;
      right: 8px;
      top: 10px;
    }
  }
  & > div:nth-last-child(1) {
    margin: 0;
  }
}
</style>
