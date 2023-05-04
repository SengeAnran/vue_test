<template>
  <div class="dialog-conform-module">
    <van-popup v-model:show="isShow" @close="handleCancel">
      <div class="dialog-box">
        <div class="title">
          <van-icon
            size="22"
            style="margin-right: 8px"
            name="warning"
            :color="`${warningColor || confirmBackgroundColor}`"
          />

          {{ title }}
        </div>
        <div class="tips">
          {{ tips }}
        </div>
        <div class="btns">
          <button @click="handleCancel">{{ cancelText }}</button>
          <button @click="handleConfirm" :style="{ background: confirmBackgroundColor }">
            <span :style="{ color: confirmTextColor }">{{ confirmText }}</span>
          </button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, toRefs, computed } from 'vue';
const emits = defineEmits(['cancel', 'confirm', 'update:show']);

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '提示',
  },
  tips: {
    type: String,
    default: '',
  },
  confirmText: {
    type: String,
    default: '确认',
  },
  cancelText: {
    type: String,
    default: '取消',
  },
  confirmBackgroundColor: {
    type: String,
    default: '#FFB111',
  },
  confirmTextColor: {
    type: String,
    default: '#FFFFFF',
  },
  warningColor: {
    type: String,
    default: '',
  },
});

const isShow = computed({
  get: () => props.show,
  set: (val) => {
    emits('update:show', val);
  },
});

const handleCancel = () => {
  emits('cancel');
};
const handleConfirm = () => {
  emits('confirm');
};

const { title, tips, confirmText, cancelText, confirmBackgroundColor, confirmTextColor, warningColor } = toRefs(props);
</script>

<style lang="scss" scoped>
.dialog-conform-module {
  .van-popup {
    border-radius: 8px;
  }
}
.dialog-box {
  background-color: #ffffff;
  width: 320px;
  padding: 28px 0;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    font-size: 15px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 21px;
  }

  .tips {
    width: 70%;
    font-size: 14px;
    text-align: left;
    margin: 3px auto 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
  }

  .btns {
    width: 100%;
    display: flex;
    justify-content: center;
    button {
      width: 88px;
      height: 32px;
      border-radius: 0;
      background-color: #ffffff;
      color: black;
      line-height: 64rpx;
      font-size: 14px;
      border-radius: 2px;
      border: 0;
      outline: none;
      margin: 0;

      &:first-of-type {
        opacity: 0.4;
        border: 1px solid #888888;
      }
      &:last-child {
        margin-left: 18px;
        border: 0;
      }
    }
  }
}
</style>
