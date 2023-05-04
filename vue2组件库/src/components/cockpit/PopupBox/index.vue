<template>
<!--  teleport是一个内置组件，它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。-->
<teleport to="#app">
  <div class="PopupBox-root backdrop" :class="{'show-app-title': showAppTitle}" @click.self="handleMaskClose">
    <div class="popup-modal-body">
      <div class="popup-body">
        <slot></slot>
      </div>
    </div>
  </div>
</teleport>
</template>

<script>
export default {
  props: {
    name: { type: String},
    hideBodyBorder: { type: Boolean, default:false,},
    maskCloseable: { type: Boolean, default:false,}, // 关闭空隙处可关闭
    showAppTitle: { type: Boolean, default:false,}, // 手机端
  },
  methods: {
    handleMaskClose() {
      if (this.maskCloseable) return;
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.PopupBox-root {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  &.show-app-title {
    z-index: 886;
    padding-top: 90px;
  }
}
</style>
