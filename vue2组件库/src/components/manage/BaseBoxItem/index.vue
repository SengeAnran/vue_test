<!--小模块盒子-->
<template>
  <div class="base-box-item">
    <TotalTitle v-bind="$attrs" />
    <div class="bottom-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TotalTitle from './TotalTitle';
export default {
  components: { TotalTitle },
};
</script>

<style lang="scss" scoped>
.base-box-item {
  width: 100%;
  .bottom-content {
    position: relative;
    height: calc(100% - 24px);
  }
}
</style>
