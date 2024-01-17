<template>
  <!-- onlyoffice展示 -->
  <div class='qualityManual-container'>
    <div class='qualityManual-container-office'>
      <vab-only-office id="office-preview" :documentServerUrl='documentServerUrl' :config="config" />
    </div>
  </div>

</template>
<script>
import vabOnlyOffice from './components/docPreview/index.vue'

export default {
  components: {vabOnlyOffice},
  data() {
    return {
      documentServerUrl: "http://192.168.0.15:8701/",
      config: {
        document: {
          fileType: "docx",
          key: "Khirz6zTPdfd7",
          title: "Example Document Title.docx",
          url: "http://192.168.0.15:8701/example/editor?fileName=new.docx"
        },
        documentType: "word",
        editorConfig: {
          callbackUrl: "https://example.com/url-to-callback.ashx"
        }
      }
    }
  },
  methods: {
    //这里的val是传递的参数
    loadOnlyOffice(val) {
      this.option.key =        // key 默认置空则不走缓存
          this.option.title = ''   // 该文件名在下载文档时也将用作文件名
      this.option.url =        // 定义存储原始查看或编辑的文档的绝对URL
          this.option.fileType = 'docx'                // 文件类型
      this.option.callbackUrl = ''                  // 回调地址
      this.show = true                        // 打开onlyOffice窗口
      console.log(val, '编辑word默认配置参数')
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.qualityManual-container {
  padding: 0 !important;
  width: 100%;
  height: calc(100vh - 180px);
}

.qualityManual-container-office {
  width: 100%;
  height: calc(100% - 55px);
}

</style>
