<template>
  <div class="container">
    <div class="icon">
      <img src="./icon.png" alt="" />
    </div>
    <div class="file-name content">{{ data.fileName }}</div>
    <div class="action-btn">
      <span class="action" @click.stop="preview(data.filePath, data.fileName)">查看</span>
      <span class="action" @click.stop="isDownload(data.filePath, data.fileName)">下载</span>
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
      type: Object,
      default: () => {},
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
.container {
  width: 384px;
  height: 195px;
  background: #f7f8fa;
  border-radius: 4px;
  border: 1px dashed #dddddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  .icon {
    margin-top: 37px;
    margin-bottom: 20px;
  }
  .file-name {
    width: 80%;
    margin-bottom: 15px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
  }
  .action-btn {
    .action {
      cursor: pointer;
      display: inline-block;
      margin-left: 8px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #1492ff;
      //line-height: 24px;
      &:first-child {
        margin-right: 42px;
      }
      &:first-child::before {
        content: '';
        display: inline-block;
        vertical-align: middle;
        margin-right: 7px;
        width: 14px;
        height: 15px;
        background: url('./look.png') no-repeat;
        background-size: 100% 100%;
      }
      &:nth-child(2)::before {
        content: '';
        display: inline-block;
        vertical-align: middle;
        margin-right: 7px;
        width: 14px;
        height: 15px;
        background: url('./download.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}

.content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
