import Vue from 'vue';
import { getPopupPostion } from '../utils';

export default {
  inject: ['mapPromise'],
  props: {
    source: { // 地图要画的数据
      type: Object,
      required: true,
    },
    geoStyle: {  // 打点样式
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    // source() {
    //   console.log('变 了');
    //   this.clearInfoWindow();
    //   this.renderLayer();
    // },
    'source.features': {
      handler(newVal, oldVal) {
        this.clearInfoWindow();
        this.renderLayer();
      },
    },
    deep: true,
  },
  mounted() {
    this.initGeoJSON();
  },
  methods: {
    // 初始化覆盖物种类和样式设置
    async initGeoJSON() {
      const map = await this.mapPromise; // 获得地图对象
      const {
        polygon: polygonStyle = {}, // 画面
        marker: markerStyle = {}, // 打点的
        polyline: polylineStyle = {}, // 画线
      } = this.geoStyle; // 分配要画的点位样式
      const layer = new AMap.GeoJSON({
        getPolygon(feature, path) {
          // console.log(feature, path);
          // console.log(polygonStyle);
          return new AMap.Polygon({
            ...polygonStyle,
            strokeColor: '#FF33FF',
            strokeOpacity: 0.2,
            strokeWeight: 3,
            fillColor: '#1791fc',
            fillOpacity: 0.35,
            path,
            extData: feature,
          });
        },
        getPolyline(feature, path) {
          return new AMap.Polyline({
            ...polylineStyle,
            path: path,
            strokeWeight: 6,
            // strokeColor: 'rgb(135, 227, 0)',
            // strokeColor: 'rgb(255, 203, 0)',
            // strokeColor: 'rgb(255, 75, 215)',
            lineJoin: 'round', // 折线拐点连接处样式
            cursor: 'pointer',
            extData: feature,
          });
        },
        getMarker(feature, position) { // 指定点要素的绘制方式，缺省时为Marker的默认样式 feature为当前要素对应的GeoJSON对象，position为对应的线的路径
          const content = typeof markerStyle.content === 'function' ? markerStyle.content(feature) : markerStyle.content;
          return new AMap.Marker({
            // content: '',
            ...markerStyle,
            content,
            position: position,
            extData: feature,
          });
        },
      });
      layer.setMap(map); // 设计加载到地图上
      this.layer = layer; // 抛出覆盖物
      this.renderLayer();
      this.$once('hook:beforeDestroy', () => {
        layer.setMap(null);
      });
    },
    // 加载覆盖物
    renderLayer() {
      this.layer.importData(this.source); // 加载新的GeoJSON对象，转化为覆盖物，旧的覆盖物将移除
      this.managePopup();
    },
    // 管理弹出窗口
    async managePopup() {
      if (!this.$scopedSlots.popup) {
        return;
      }
      const map = await this.mapPromise;
      this.layer.on('click', async (ev) => {
        const feature = ev.target.getExtData(); // 获取用户自定义属性
        // console.log(feature);
        this.$emit('onClick', feature);
        const popup = new Vue({
          render: () => this.$scopedSlots.popup(feature), //
        }).$mount(document.createElement('div'));
        // console.log(popup);
        const infoWindow = new AMap.InfoWindow({ // 弹窗
          content: popup.$el, // 弹窗参数设置
          isCustom: true,
          autoMove: true,
          closeWhenClickMap: true,
        });
        const position = getPopupPostion(feature); // 获取位置
        console.log(position, '位置');
        infoWindow.on('close', () => {
          popup.$destroy();
        });
        infoWindow.open(map, position);
        this.infoWindow = infoWindow;
      });
      this.$once('hook:beforeDestroy', () => {
        this.clearInfoWindow();
      });
    },
    // 关闭
    clearInfoWindow() {
      this.infoWindow && this.infoWindow.close();
    },
  },
  render() {
    return null;
  },
  beforeDestroy() {
    this.destroyFlag = true;
  },
};
