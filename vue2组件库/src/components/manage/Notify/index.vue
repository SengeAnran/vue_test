<!--警告-->
<template>
  <div class="notify-wrp">
    <svg-icon :fontSize="24" icon-class="notify" />
  </div>
</template>
<script>
export default {
  name: "Notify",
};
</script>
<style lang="scss" scoped>
.notify-wrp {
  cursor: pointer;
  .icon {
    font-size: 24px;
  }
}
</style>
