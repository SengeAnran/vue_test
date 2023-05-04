<template>
  <div>
    <div ref='container' id='container' :style="{ transform: `scale(${scaleX}, ${scaleY})` }">
    </div>
<!--    <div style="position:absolute; left: 222rem;cursor:pointer; width: 30rem; height: 30rem; background: red" @click="showFW"></div>-->
  </div>

</template>

<script>
// import './css/main.css';
export default {
  props: {
    dataList: { // 点数据
      type: Array,
      default: () => {},
    },
    polygonList: { // 面数据
      type: Array,
      default: () => {},
    },
    multiLineList: { // 线数据
      type: Array,
      default: () => {},
    },
    flyingLineList: { // 线数据
      type: Array,
      default: () => {},
    },
    title: { // 弹窗标题
      type: String,
      default: '',
    },
    Scale: { // 放大倍数（点）
      type: Number,
      default: 1.3,
    },
    tipTemplate: { // 弹窗展示数据项
      type: Object,
      default: () => {},
    },
    Global: { // 展示地球
      type: Boolean,
      default: false,
    },
    showChinaOutLine: { // 展示中国边界线
      type: Boolean,
      default: false,
    },
  },
  name: 'index',
  data() {
    return {
      map: this.$refs.container,
      markers: null,
      sritMap: null,
      scaleX: 1,
      scaleY: 1,
      extent: {
        heading: 360,
        pitch: -90,
        // xmax: 123.39940883587116,
        // xmin: 120.92327212639972,
        // ymax: 30.47052982667381,
        // ymin: 29.1857049354057,
        xmax: 122.261519,
        xmin: 122.041629,
        ymax: 29.84163,
        ymin: 29.678456,
      },
      globalExtent: {
        heading: 5.088887490341627e-14,
        pitch: -60.60014509027408,
        // xmax: 144.45400012614263,
        // xmin: 60.957866454540365,
        // ymax: 51.074200623064215,
        // ymin: 35.84404579104466,
        // xmax: 136.80813149038022,
        // xmin: 87.16314880849087,
        // ymax: 50.00105650283994,
        // ymin: 38.95979864273946,
        xmax: 107.261519,
        xmin: 107.041629,
        ymax: 33.84163,
        ymin: 33.678456,
      },
      outLinesJson: require('./100000.json'),
    };
  },
  watch: {
    dataList() {
      this.sritMap.clear();
      this.drawMarker();
    },
    multiLineList() {
      this.sritMap.clear();
      this.drawLines();
    },
  },
  mounted() {
    console.log(this.outLinesJson);
    this.initMap();
    const handleScale = (scaleX, scaleY) => {
      this.scaleX = 1 / scaleX;
      this.scaleY = 1 / scaleY;
    };
    window.globalScale.add(handleScale);
    this.$once('hook:beforeDestroy', () => {
      window.globalScale.remove(handleScale);
    });
  },
  methods: {
    showFW() {
      console.log(this.sritMap.getExtent());
      console.log(this.sritMap.getCurrentScale());
    },
    initMap() {
      // new Map(id: string div的编号, config?: any 主配置文件, 或者用户信息及rest服务地址, options?: any 地图配置选项):
      this.sritMap = new Srit.Map('container', {
        onload: () => { // 地图准备就绪
          console.log('onload');
          // console.log(this.Scale);
          if (this.showChinaOutLine) {
            this.drawOutLines();
          }
          if (this.polygonList && this.polygonList.length > 0) {
            this.drawPolygon();
            // setTimeout(() => {
            //   this.drawMarker();
            // }, 5000);
          }
          if (this.multiLineList && this.multiLineList.length > 0) {
            console.log('画线');
            this.drawLines();
          }
          if (this.flyingLineList && this.flyingLineList.length > 0) {
            console.log('画飞线');
            this.drawFlyingLine();
          }
          if (this.dataList && this.dataList.length > 0) {
            console.log('画点');
            if (this.Global) {
              this.drawMarker2();
            } else {
              this.drawMarker();
            }

          }
          // this.displayRange();
        },
      });
    },
    // 显示范围
    displayRange() {
      const extent = this.sritMap.getExtent();
      this.sritMap.zoomToExtent([extent.xmin, extent.ymin, extent.xmax, extent.ymax])
    },
    // 打点
    drawMarker() {
      var jsondata = this.dataList;
      // const mainContent = {
      //
      // };
      console.log(jsondata);
      this.markers = this.sritMap.marker(jsondata, { "image": "images/markerHB.png" },
        {
          // is3D: true, // 3d模式
          isZoom: true, // 自适应缩放层级
          cluster: false,
          // highlightStyle: {
          //   "image": "images/RedPin1LargeB.png"
          // },
          // zoomFactor: this.Scale, // 针对缩放的范围比例因子,默认值为0.1,即缩放范围增大0.1倍
          title: this.title,
          // customInfoDom: (mainContent, attrs) => {
          //   console.log(mainContent);
          //   console.log(attrs)
          //
          //   var textNode = document.createTextNode("Hello world!");
          //
          //   // mainContent.appendChild(textNode);
          //   // mainContent.context = `<div style="font-size: 30px; color: #0d1f38">${attrs['简介']}</div>`;
          //   mainContent.context = `${attrs['简介']}`;
          //   // attrs = this.tipTemplate;
          //   return {
          //      mainContent, attrs
          //   }
          // }, // 根据回调方法提供的div及属性信息，自定义信息显示的DomNode
          tipTemplate: this.tipTemplate,
        });
      // console.log(this.markers);
      if(!this.Global) {
        setTimeout(() => {
          this.sritMap.zoomToExtent(this.extent);
          // this.sritMap.zoomToExtent(this.globalExtent,{
          //   heading: this.globalExtent.heading,
          //   pitch: this.globalExtent.pitch,
          //   zoomFactor: 398,
          //   // zoomFactor: 1.5,
          // });
        }, 5000);
      }
      console.log(this.markers);
    },
    // 港口打点
    drawMarker2() {
      var jsondata = this.dataList;
      // const mainContent = {
      //
      // };
      console.log(location);
      // this.markers = this.sritMap.marker(jsondata, { "image": location.origin +'/imgs/gangkou.png' },
      this.markers = this.sritMap.marker(jsondata, { "image": "images/markerCG.png" },
        {
          // is3D: true, // 3d模式
          isZoom: true, // 自适应缩放层级
          cluster: false,
          // highlightStyle: {
          //   "image": "images/RedPin1LargeB.png"
          // },
          // zoomFactor: this.Scale, // 针对缩放的范围比例因子,默认值为0.1,即缩放范围增大0.1倍
          title: this.title,
          // customInfoDom: (mainContent, attrs) => {
          //   console.log(mainContent);
          //   console.log(attrs)
          //
          //   var textNode = document.createTextNode("Hello world!");
          //
          //   // mainContent.appendChild(textNode);
          //   // mainContent.context = `<div style="font-size: 30px; color: #0d1f38">${attrs['简介']}</div>`;
          //   mainContent.context = `${attrs['简介']}`;
          //   // attrs = this.tipTemplate;
          //   return {
          //      mainContent, attrs
          //   }
          // }, // 根据回调方法提供的div及属性信息，自定义信息显示的DomNode
          tipTemplate: this.tipTemplate,
        });
      // console.log(this.markers);
      if(!this.Global) {
        setTimeout(() => {
          this.sritMap.zoomToExtent(this.extent);
          // this.sritMap.zoomToExtent(this.globalExtent,{
          //   heading: this.globalExtent.heading,
          //   pitch: this.globalExtent.pitch,
          //   zoomFactor: 398,
          //   // zoomFactor: 1.5,
          // });
        }, 5000);
      }
      console.log(this.markers);
    },
    // 画面
    drawPolygon() {
      this.polygonList.forEach((item) => {
        console.log(item);
        const points = item.points;
        const data = { ...item };
        // console.log(data);
        const polygonType = { style: 0, color: "#0080c088", outlineColor: "#ff0", outlineWidth: 1 };
        this.markers = this.sritMap.addPolygon(points, polygonType,
          {
            isZoom: true,
            cluster: false,
            disableInfoWindow: false,
            // zoomFactor: this.Scale, // 针对缩放的范围比例因子,默认值为0.1,即缩放范围增大0.1倍
            title: this.title,
            tipTemplate: this.tipTemplate,
            attrs: data,
          });
      });
      setTimeout(() => {
        this.sritMap.zoomToExtent(this.extent);
      }, 5000);
      // console.log('markers');
      // console.log(this.markers);
    },
    // 画线
    drawLines() {
      this.multiLineList.forEach((item) => {
        // console.log(item);
        const points = item.points;
        const data = { ...item };
        // console.log(points);
        const polygonType = { style: 0, color: "#ffff00", width: 3.0 };
        this.markers = this.sritMap.addPolyline(points, polygonType,
          {
            isZoom: true,
            // cluster: false,
            disableInfoWindow: false,
            // // zoomFactor: this.Scale, // 针对缩放的范围比例因子,默认值为0.1,即缩放范围增大0.1倍
            // title: this.title,
            clampToGround: true,
            tipTemplate: this.tipTemplate,
            attrs: data,
          });
      });
      this.sritMap.zoomOut();
      console.log(this.sritMap.getCurrentLevel());
      // console.log(this.sritMap.getCurrentScale());
      // setTimeout(() => {
      //   for (let i = 13; i > 0; i--) {
      //     this.sritMap.zoomOut();
      //     console.log(this.sritMap.getCurrentLevel());
      //   }
      // }, 8000);
      setTimeout(() => {
        this.sritMap.zoomToExtent(this.extent);
      }, 5000);
    },
    // 画轮廓线
    drawOutLines() {
      // const polygonType = { style: 1, color: "#ffff0055", width: 3.0, opacity: 0.1, };
      const polygonType = { style: 1, color: "#F5FFFA55", width: 3.0, opacity: 0.1, };
      this.markers = this.sritMap.addPolyline(this.outLinesJson, polygonType,
        {
          // isZoom: true,
          // cluster: false,
          // // zoomFactor: this.Scale, // 针对缩放的范围比例因子,默认值为0.1,即缩放范围增大0.1倍
          // title: this.title,
          clampToGround: true,
        });
      console.log(this.sritMap.getCurrentLevel());
      // console.log(this.sritMap.getCurrentScale());
      // setTimeout(() => {
      //   for (let i = 13; i > 0; i--) {
      //     this.sritMap.zoomOut();
      //     console.log(this.sritMap.getCurrentLevel());
      //   }
      // }, 8000);
      // setTimeout(() => {
      //   this.sritMap.zoomToExtent(this.extent);
      // }, 5000);
    },
    // 画飞线
    drawFlyingLine() {
      console.log(this.flyingLineList);
      this.flyingLineList.forEach((item) => {
        console.log(item);
        const startPoint = item.startPoint;
        const endPoints = item.endPoints.slice(1); // 终止点坐标集合 [[x1,y1],[x2,y2],[x3,y3],...]
        console.log(endPoints);
        this.sritMap.addParabola(startPoint, endPoints, 1500,
          {
            style: 5, color: "#006fff66", image: "images/colors2.png", width: 4, duration: 3000,
          },
          {
            isZoom: true,
          });
      });
      setTimeout(() => {
        this.sritMap.zoomToExtent(this.globalExtent,{
          heading: this.globalExtent.heading,
          pitch: this.globalExtent.pitch,
          zoomFactor: 398,
          // zoomFactor: 1.5,
        });
      }, 5000);
    },
    clear() {
      this.sritMap.clear(this.markers);
    },
  },
};
</script>

<style lang='scss' scoped>
#container {
  width: 100vw;
  height: 65.21739vh;
  //position: fixed;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: top left;
  &::v-deep .gis-popup {
    z-index: 9999;
    max-width: 350px;
    .gis-popup-content {
      font: normal 4.5pt 微软雅黑;
      color: white;
      //overflow-y: scroll;
      overflow-x: hidden;
      max-height: 300px;
      //&::-webkit-scrollbar {
      //  display: none;
      //}
      .gis-widget-row {
        padding: 3px;
        .mcirLabel {
          min-width: 20%;
        }
      }
    }
    .gis-popup-title {
      font: normal 5.5pt 微软雅黑;
      color: white;
    }

  }
}
</style>
