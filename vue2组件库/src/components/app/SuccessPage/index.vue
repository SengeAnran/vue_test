<template>
  <div class="Success-page">
    <div :class="options.type === 'fail' ? 'icon2' : 'icon1'">
      <img :src="options.type === 'fail' ? failIcon : successIcon" />
    </div>
    <span class="first-desc">{{ options.title }}</span>
    <span class="last-desc">{{ options.desc }}</span>
    <div class="foot-btn">
      <van-button round block type="primary" @click="goBack"> {{ options.btnText }}{{ `(${num})` }} </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import successIcon from '@/assets/img/desc/success.png';
import failIcon from '@/assets/img/desc/error.png';
defineProps({
  options: {
    type: Object,
    required: true,
  },
});
const router = useRouter();
const goBack = () => {
  router.go(-1);
};

// 倒计时
const num = ref(3);
const timerId = setInterval(() => {
  if (num.value === 1) {
    router.go(-1);
  }
  num.value -= 1;
}, 1000);

onUnmounted(() => {
  clearInterval(timerId);
});
</script>
<style lang="scss" scoped>
.Success-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  .icon1,
  .icon2 {
    height: 96px;
    width: 96px;
    position: relative;
    margin: 36px 0;
    img {
      height: 100%;
      width: 100%;
      position: relative;
    }
    &:before {
      content: '';
      position: absolute;
      height: 128px;
      width: 128px;
      background: #e8f6f0;
      border-radius: 50%;
      left: -16px;
      top: -16px;
    }
  }
  .icon2 {
    &:before {
      background: #f4e6e5;
    }
  }

  .first-desc {
    color: #333333;
    font-size: 20px;
  }
  .last-desc {
    color: #666666;
    font-size: 14px;
    margin: 12px 0 60px 0;
  }
  :deep(.van-button--block) {
    width: 90%;
  }
}
</style>
