<template>
  <div @click="onClick()">
    <cellItem class="cell-item">
      <div class="item-tip" v-if="data.disputeStatus === 1 || data.disputeStatus === 4">
        {{ MEDIATE_STATUS[data.disputeStatus] }}
      </div>
      <div class="item-tip" v-else style="background-color: #58cdb3">{{ MEDIATE_STATUS[data.disputeStatus] }}</div>
      <div class="item-type">纠纷类型：{{ MEDIATE_TYPE[data.disputeType] }}</div>
      <div class="item-description"><span>案由描述：</span>{{ data.disputeDescription }}</div>
      <div class="line"></div>
      <div class="item-time"><span>申请时间：</span>{{ data.disputeCreatTime }}</div>
    </cellItem>
  </div>
</template>

<script setup>
import { MEDIATE_TYPE, MEDIATE_STATUS } from '@/app/Mediate/constant';
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
const emits = defineEmits(['handleClick']);
function onClick() {
  emits('handleClick', props.data.disputeId);
}
</script>

<style lang="scss" scoped>
.cell-item {
  position: relative;
  .item-tip {
    position: absolute;
    right: 0;
    top: 0;
    width: 60px;
    height: 20px;
    background: #ff7883;
    border-radius: 0px 8px 0px 8px;
    text-align: center;
    font-size: 10px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    line-height: 20px;
  }
  .item-type {
    margin-top: 12px;
    margin-left: 12px;
    height: 23px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 23px;
  }
  .item-description {
    //display: contents;
    display: inline-block;
    height: 17px;
    width: 94%;
    margin-left: 12px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000;
    line-height: 17px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    span {
      color: #9f9f9f;
    }
  }
  .line {
    margin: auto;
    width: 93%;
    height: 1px;
    background: #d8d8d8;
  }
  .item-time {
    display: inline-block;
    height: 17px;
    width: 94%;
    font-size: 12px;
    margin-left: 12px;
    margin-top: 10px;
    margin-bottom: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000;
    line-height: 17px;
    span {
      color: #9f9f9f;
    }
    //&::before {
    //  display: inline-block;
    //  content: close-quote;
    //  width: 100%;
    //  height: 1px;
    //  background: #D8D8D8;
    //}
  }
}
</style>
