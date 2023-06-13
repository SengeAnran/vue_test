<template>
<div class="style-transition">
  <button @click="show = !show">显示/隐藏</button>
  <transition name="fade" appear>
    <div v-show="show" class="box">你好啊!</div>
  </transition>
</div>
</template>

<script>
export default {
  name: "styleTransition",
  data() {
    return {
      show: true,
    }
  }
}
</script>

<style lang="less" scoped>
.style-transition {
  height: 140px;
}
.box {
  background-color: #ff8800;
  font-size: 24px;
}
.fade-enter-active {
  animation: atguigu 1s linear;
}
.fade-leave-active {
  animation: atguigu 1s linear reverse;
}
@keyframes atguigu {
  from{
    transform: translateX(-100%);
  }
  to{
    transform: translateX(0%);
  }
}
</style>