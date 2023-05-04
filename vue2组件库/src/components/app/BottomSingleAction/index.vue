<template>
  <!-- 底部tab -->
  <view class="bottom-action" @click="onHandleClick">
    <van-button color="linear-gradient(45deg, #00B7A7, #58b3ab)" round size="16px">
      {{ props.text }}
    </van-button>
  </view>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['btnClick']);

const onHandleClick = () => {
  emits('btnClick');
};
</script>
<style lang="scss" scoped>
.bottom-action {
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 70px;
  padding: 14px 35px 0;
  background: #ffffff;
  box-shadow: 0px -1px 1px 0px #f7f7f7;
  .van-button {
    width: 100%;
    box-shadow: 0px 2px 6px 0px rgba(88, 179, 171, 0.45);
  }
}
</style>
