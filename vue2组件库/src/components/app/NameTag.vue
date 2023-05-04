<template>
  <div class="name-tag-module">
    <text class="tag-name">{{ data.userNickname }}</text>
    <div class="tag-close" @click="$emit('removeTag', data)">
      <Icon name="cross" color="#B8B8B8" size="16" />
    </div>
  </div>
</template>

<script setup>
import { Icon } from 'vant';
defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
</script>
<style lang="scss" scoped>
.name-tag-module {
  position: relative;
  width: 170rpx;
  padding: 2rpx 0;
  .tag-name {
    display: inline-block;
    text-align: center;
    width: 158rpx;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 30rpx;
    border: 2rpx solid #00b7a7;
    color: #00b7a7;
  }
  .tag-close {
    position: absolute;
    top: -4rpx;
    right: 0rpx;
    background: #fff;
    border-radius: 100%;
  }
}
</style>
