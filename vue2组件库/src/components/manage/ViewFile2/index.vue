<template>
  <div class="container">
    <div class="item flex items-center content-between" v-for="(item, i) in data" :key="i">
      <span class="content">
        <i class="el-icon-link"></i>
        <span>{{ item.fileName }}</span>
      </span>
      <div class="ml-3 flex-shrink-0">
        <el-link class="action" @click.stop="isDownload(item.filePath, item.fileName)">下载</el-link>
        <el-link class="action" @click.stop="preview(item.filePath, item.fileName)">在线预览</el-link>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 相较于ViewFile,多了一个在线查看
 */
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
      this.$confirm(`是否下载附件 ${name}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.download(url, name);
        })
        .catch(() => {});
    },
    download(url, name) {
      let a = document.createElement('a');
      a.download = `${name}.doc`;
      a.style.display = 'none';
      a.href = `${url}?response-content-type=application/octet-stream`;
      a.setAttribute('target', '_self');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => {
        this.$message({
          type: 'success',
          message: '下载成功!',
        });
      }, 200);
    },
    preview(url) {
      const dest =
        'https://jqy.zjagri.cn/kkfile/onlinePreview?officePreviewType=pdf&url=' + encodeURIComponent(window.btoa(url));
      window.open(dest, '_blank');
    },
    // preview(url, name) {
    //   this.$confirm(`是否在线预览附件 ${name}`,  提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       const dest = 'https://jqy.zjagri.cn/kkfile/onlinePreview?officePreviewType=pdf&url=' + encodeURIComponent(window.btoa(url));
    //       window.open(dest, '_blank');
    //     })
    //     .catch(() => { });
    // },
  },
};
</script>

<style lang="scss" scoped>
.item {
  font-size: 14px;
}

.el-icon-link {
  margin-right: 4px;
}

.action {
  display: inline-block;
  margin-left: 8px;
  color: #7bb9f6;
}
.content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
