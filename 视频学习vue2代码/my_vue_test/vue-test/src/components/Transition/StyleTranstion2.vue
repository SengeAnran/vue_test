<template>
<div class="style-transition">
  <button @click="show = !show">显示/隐藏</button>
  <transition-group name="fade" appear>
    <div v-show="show" key="1" class="box">你好啊!</div>
    <div v-show="show" key="2" class="box">上规则!</div>
  </transition-group>
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
  height: 100px;
}
.box {
  background-color: #ff8800;
  font-size: 24px;
  margin-bottom: 10px;
}
.fade-enter-active,.fade-leave-active {
  transition: 0.5s linear;
}
.fade-enter, .fade-leave-to {
  transform: translateX(-100%);
}
.fade-enter-to {
  transform: translateX(0%);
}
</style>