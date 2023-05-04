<template>
  <div class="base-box-title clearFloat">
    <h4 class="title">{{ title }}</h4>
    <div v-if="showRightIcon" class="right-icon" @click="$emit('onClick')">
      <Icon name="arrow" />
      <!--			<u-icon name="arrow-right" color="#666666 " size="16"></u-icon>-->
    </div>
  </div>
</template>

<script setup>
import { Icon } from 'vant';

defineProps({
  title: {
    type: String,
    default: '',
  },
  showRightIcon: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.w {
  width: 345px;
  margin: 0 auto;
}
.clearFloat::before,
.clearFloat::after {
  content: '';
  display: table;
}
.clearFloat::after {
  clear: both;
}
.base-box-title {
  .title {
    float: left;
    font-size: 16px;
    font-weight: 500;
    color: #222222;
    line-height: 22px;
    margin: 0;
  }
  .title::before {
    content: '';
    display: inline-block;
    width: 3px;
    height: 14px;
    background: #00b7a7;
    border-radius: 1px;
    margin-right: 7px;
  }
  .right-icon {
    margin-top: 3px;
    float: right;
  }
}
</style>
