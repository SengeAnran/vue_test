<template>
  <div class="bg-img" :style="{ backgroundImage: `url(/imgs/${name})` }" />
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss" scoped>
.bg-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2070px;
  background-size: 100% 100%;
}
</style>
