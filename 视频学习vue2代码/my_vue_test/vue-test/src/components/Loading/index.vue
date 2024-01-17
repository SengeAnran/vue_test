<script>
export default {
  name: "index",
  data() {
    return {
      loadingInstance: null,
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    loadingInstance.destroy();
  },
  methods: {
    init() {
      this.loadingInstance = BJY.Loading.create({
        // 占位元素
        element: $("#loading .placeholder"),
        // logo URL 可自定义自己的加载 logo
        logoUrl:
          "https://img.baijiayun.com/0baijiacloud/logo/ydkt/v6/www-loading.png",
      });
    },
  },
};
</script>

<template>
  <div id="loading">
    <div class="placeholder"></div>
  </div>
</template>

<style scoped></style>
