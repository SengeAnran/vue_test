<template>
  <div class="no-data-wrapper">
    <img :src="noData" />
    <div class="text">没有找到搜索内容</div>
  </div>
</template>

<script setup>
import noData from '@/assets/img/stadium-map/no-data.png';
</script>

<style lang="scss" scoped>
.no-data-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .text {
    font-size: 16px;
    font-weight: 400;
    color: #999999;
    margin-top: 31px;
  }
}
</style>
