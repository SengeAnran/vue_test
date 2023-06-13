<!--第三方动画库-->
<template>
<div class="style-transition">
  <button @click="show = !show">显示/隐藏</button>
  <transition-group
    appear
    name="animate__animated animate__bounce"
    enter-active-class="animate__backInRight"
    leave-active-class="animate__backOutDown"
  >
    <div v-show="show" key="1" class="box">你好啊!</div>
    <div v-show="show" key="2" class="box">上规则!</div>
  </transition-group>

</div>
</template>

<script>
import 'animate.css';
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
</style>