<template>
  <div class="total-title-wrp">
    <div class="t-icon" v-if="icon"><img :src="icon" alt="" /></div>
    <div class="t-desc">{{ name }}</div>
    <div class="t-num" v-if="!hideNum">
      <RollNum :num="count" class="num" :fixed="fixed" :style="{ fontSize: countSize + 'px' }" />
      <span>{{ unit }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: [String, Boolean],
      default: require('./progress-icon.png'),
    },
    name: {
      type: String,
    },
    unit: {
      type: String,
    },
    count: {
      type: [String, Number],
      default: 0,
    },
    countSize: {
      type: [String, Number],
      default: 18,
    },
    fixed: {
      type: [Number, String],
      default: 'auto',
    },
    hideNum: { type: Boolean, default: false },
  },
};
</script>
<style lang="scss" scoped>
.total-title-wrp {
  display: flex;
  align-items: center;
  .t-icon {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    & img {
      width: 100%;
      height: 100%;
    }
  }
  .t-desc {
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 22px;
    margin-right: 12px;
  }
  .t-num {
    font-size: 16px;
    font-weight: 500;
    color: #1492ff;
    //line-height: 38px;
    .num {
      font-size: 30px;
      font-family: DINPro-Medium, DINPro;
      font-weight: 500;
      color: #1492ff;
    }
  }
}
</style>
