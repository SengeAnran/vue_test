<template>
  <div class="page">
    <!-- onlyoffice展示 -->
<!--    <div class='qualityManual-container'>-->
<!--      <div class='qualityManual-container-office'>-->
<!--        <vab-only-office id="office-preview" :documentServerUrl='documentServerUrl' editorConfig_lang="zh" :config="config" />-->
<!--      </div>-->
<!--    </div>-->
    <div class="pdf-canvas">
      <view-pdf-by-canves/>
    </div>
  </div>

</template>
<script>
import vabOnlyOffice from './components/docPreview/index.vue'
import viewPdfByCanves from './components/viewPdfByCanves/index.vue'

export default {
  components: {vabOnlyOffice, viewPdfByCanves},
  data() {
    return {
      //本地onlyoffice安装成功后的服务
      documentServerUrl: "http://123.57.130.198:5566/",
      config: {
        document: {
          fileType: "docx",
          key: "",
          title: "Example Document Title.docx",
          async: false,
          //你要打开的文档绝对路径，这里可以使用7.4页面左侧去生成文档并复制其文档地址进行开发测试！
          url: "http://123.57.130.198:8181/onlyoffice/downloadFile?fileName=/20240105/文字文稿1.docx"
        },
        permissions: {
          edit: true,
          print: true,
          download: true
        },
        documentType: "word",
        editorConfig: {
          callbackUrl: "http://123.57.130.198:8181/onlyoffice/save?fileName=/20240105/文字文稿1.docx",
          lang:"zh"
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

<style>
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
