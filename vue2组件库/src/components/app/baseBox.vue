<template>
  <div class="base-box w" :style="{ marginTop: props.boxTop }" :class="{ radius: props.boxRadius }">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  boxTop: {
    type: String,
    default: '24px',
  },
  boxRadius: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.w {
  width: 345px;
  margin: 0 auto;
}
.clearFloat::before,
.clearFloat::after {
  content: '';
  display: table;
}
.clearFloat::after {
  clear: both;
}
.base-box {
  // margin-top: ;
}
.radius {
  box-shadow: 0 2px 10px 0 rgba(221, 231, 255, 0.4);
  border-radius: 4px;
  border: 1px solid #F7F7F7;
}
</style>
