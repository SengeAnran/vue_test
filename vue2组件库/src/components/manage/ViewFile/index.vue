<!--查看文档-->
<template>
  <div class="flex flex-col justify-start items-start">
    <el-link
      class="file"
      v-for="(item, i) in data"
      :key="i"
      @click="isDownload(item.filePath, item.fileName)"
    >
      <i class="el-icon-link"></i>
      <span>{{ item.fileName }}</span>
    </el-link>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    isDownload(url, name) {
      this.$confirm(`是否下载附件 ${name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.download(url, name);
        })
        .catch(() => {});
    },
    download(url, name) {
      let a = document.createElement("a");
      a.download = `${name}.doc`;
      a.style.display = "none";
      a.href = `${url}?response-content-type=application/octet-stream`;
      a.setAttribute("target", "_self");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => {
        this.$message({
          type: "success",
          message: "下载成功!",
        });
      }, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
.file {
}
</style>
