<!--返回标题-->
<template>
  <h3 class="text-gray-800 mb-8 router-back" @click="$router.back()">
    <i class="el-icon-arrow-left"></i>
    <slot />
  </h3>
</template>
<style lang="scss" scoped>
.router-back {
  cursor: pointer;
  display: inline-block;
  font-size: 18px;
  line-height: 30px;
  .el-icon-arrow-left {
    margin-right: 4px;
  }
}
</style>
