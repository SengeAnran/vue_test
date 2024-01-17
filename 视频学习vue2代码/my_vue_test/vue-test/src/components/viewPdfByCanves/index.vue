<template>
  <div class="page">
    <div class="pdf_down">
      <el-button type="primary" class="pdf_set_left" @click="provPage">选择文档</el-button>
      {{ pdf_page }} / {{ pdf_pages }}
      <el-button type="primary" class="pdf_set_left" @click="provPage">上一页</el-button>
      <el-button type="primary" class="pdf_set_middle" @click="nextPage">下一页</el-button>
      <el-button type="primary" class="pdf_set_middle" @click="exportData">导出数据</el-button>
    </div>

    <div class="drawing-box" :style="{width:pdf_div_width,margin:'0 auto'}">
      <!--      <canvas v-for="page in pdf_pages" :id="'the-canvas'+page" :key="page"></canvas>-->
      <canvas ref="drawing">
        A drawing of something.
      </canvas>
      <div class="rectDrawing">
        <canvas class="rect-drawing-canvas" :width="canvasWidth" :height="canvasHeight" ref="rectDrawing">
          A drawing of something.
        </canvas>
      </div>
    </div>
    <info-dialog
        :show.sync="dialogShow"
        @submit="addData"
    ></info-dialog>
  </div>
</template>
<script>
let PDFJS = require('pdfjs-dist');
import axios from "axios";
import infoDialog from "./InfoDialog.vue";

export default {
  name: "index",
  components: {
    infoDialog,
  },
  data() {
    return {
      positionData: {}, // 标记位置信息
      dialogShow: false,
      pdf_scale: 1.0,//pdf放大系数
      pdf_page: 1, // 页数
      pdf_pages: undefined, // 总计页数
      pdf_div_width: '100%', // 宽度
      pdf_src: null, //文件地址
      canvasWidth: undefined, // 宽
      canvasHeight: undefined, // 高
      rectDrawing: null, // 标记容器
      context: null, // pdf容器
      drawContext: null, // 标记上下文
      tapLocationList: [],

    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this._loadFile('/pdfFile/test.pdf');

      let x1, y1, x2, y2;
      this.rectDrawing = this.$refs.rectDrawing;
      if (this.rectDrawing.getContext) {
        this.drawContext = this.rectDrawing.getContext('2d');
      }
      this.rectDrawing.addEventListener('mousedown', function (e) {
        x1 = e.offsetX;
        y1 = e.offsetY;
      });
      this.rectDrawing.addEventListener('mouseup', (e) => {
        x2 = e.offsetX;
        y2 = e.offsetY;
        this.positionData = {
          x1, y1, x2, y2
        }
        this.dialogShow = true; // 打开标记弹框
      });
    },
    //  添加标记点
    addData(data) {
      const item = {
        pdf_page: this.pdf_page,
        ...this.positionData,
        ...data,
      }
      // 画框
      this.drawRect(this.positionData);
      this.tapLocationList.push(item);
    },
    //获得pdf
    get_pdfurl() {
      // //例子:加载pdf线上示例
      // this.pdf_src = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
      // this._loadFile(this.pdf_src)
      // return

      //线上请求
      axios.get('/pdfFile/test.pdf')
          .then((res) => {
            console.log(res);
            this.pdf_src = res.url
            this._loadFile(this.pdf_src)
            // this._loadFile('/pdfFile/test.pdf')
          })
    },
    //初始化pdf
    _loadFile(url) {
      let loadingTask = PDFJS.getDocument(url)
      loadingTask.promise
          .then((pdf) => {
            this.pdfDoc = pdf
            this.pdf_pages = this.pdfDoc.numPages
            this.$nextTick(() => {
              this._renderPage(this.pdf_page)
            })
          })
    },
    //渲染pdf页
    _renderPage(num) {
      const that = this
      this.pdfDoc.getPage(num)
          .then((page) => {
            let canvas = this.$refs.drawing;
            let ctx = canvas.getContext('2d')
            this.context = ctx;
            let dpr = window.devicePixelRatio || 1
            let bsr = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1
            let ratio = dpr / bsr
            let viewport = page.getViewport({scale: this.pdf_scale})

            canvas.width = viewport.width * ratio
            canvas.height = viewport.height * ratio

            canvas.style.width = viewport.width + 'px'

            that.pdf_div_width = viewport.width + 'px'

            canvas.style.height = viewport.height + 'px'
            this.canvasWidth = viewport.width * 1;
            this.canvasHeight = viewport.height * 1;

            ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
            let renderContext = {
              canvasContext: ctx,
              viewport: viewport
            }
            page.render(renderContext)
          })
    },
    //  上一页
    provPage() {
      if (this.pdf_page - 1 === 0) {
        console.log('已是第一页');
        return
      }
      this.pdf_page--;
      this._renderPage(this.pdf_page);
    },
    //  下一页
    nextPage() {
      if (this.pdf_page + 1 > this.pdf_pages) {
        console.log('已是最后一页');
        return
      }
      this.pdf_page++;
      this._renderPage(this.pdf_page);
    },
    /**
     *  标记
     * @param data
     */
    drawRect(data) {
      const {x1, y1, x2, y2} = data;
      const width = x2 - x1;
      const height = y2 - y1;
      this.drawContext.strokeStyle = 'red';
      this.drawContext.strokeRect(x1, y1, width, height);
    },

    /**
     * 清除标记点
     * @param data
     */
    clearRect(data) {
      const {x1, y1, x2, y2} = data;
      const width = x2 - x1;
      const height = y2 - y1;
      this.drawContext.clearRect(x1 - 1, y1 - 1, width + 2, height + 2);
    },

    /**
     *  重置标注容器
     */
    resetDraw() {
      if (!this.drawContext) {
        return;
      }
      this.drawContext.width = this.drawContext.width;
    },
    /**
     * 将canvas obj对象导出为.png图片
     * @param obj
     */
    canvasToImg(obj) {
      if (!obj.getContext) {
        return;
      }
      // 获得图像的数据url toDataURL（图像的MINI类型格式）
      const imgUrl = obj.toDataURL('image/png');
      // 显示图像
      const image = document.createElement('img');
      image.src = imgUrl;
      document.body.appendChild(image)
      // const a = document.createElement('a');
      // const formData = new FormData();
      // formData.append('file', imgUrl);
      //
      // a.href = formData;
      // document.body.appendChild(a);
      // a.click();
    },
    //  导出数据
    exportData() {
      console.log('导出数据')
    }
  }
}
</script>


<style scoped>
.page {
  background: aliceblue;
  padding: 20px 0;
}

.pdf_down {
  display: flex;
}

.drawing-box {
  position: relative;
}

.rectDrawing {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
}

.rect-drawing-canvas {
  //margin: 0 auto;
}

</style>
