<template>
  <div class="polygonMap-wrp" ref="container"></div>
</template>
<script>
const BASE_MAP_CONFIG = {
  zoom: 13,
};
const POLYGON_CONFIG = {
  fillColor: "blue", // 多边形填充颜色
  borderWeight: 2, // 线条宽度，默认为 1
  strokeColor: "#2196f3", // 线条颜色
  fillOpacity: 0.3,
};

/**
 * @param {Array} path 路径点，格式[经度，纬度]
 */
export default {
  name: "PolygonMap",
  props: {
    path: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const container = this.$refs.container;
      this.map = new AMap.Map(container, BASE_MAP_CONFIG);
    },
    // 绘制图层
    drawLayer() {
      this.clearMap();
      if (this.path.length > 2) {
        this.drawPolygon();
      }
      this.path.forEach((item) => {
        this.drawPoint(item);
      });
      this.setFitView();
    },

    // 根据经纬度绘制点信息
    drawPoint(lngLat) {
      if (!Array.isArray(lngLat)) {
        console.error("经纬度类型错误");
        return;
      }

      const point_location =
        lngLat instanceof AMap.LngLat ? lngLat : new AMap.LngLat(...lngLat);
      this.map.add(
        new AMap.Marker({
          position: point_location,
        })
      );
    },

    // 根据path绘制polygon
    drawPolygon() {
      this.map.add(
        new AMap.Polygon({
          path: this.path,
          ...POLYGON_CONFIG,
        })
      );
    },

    // 移除所有覆盖物
    clearMap() {
      this.map.clearMap();
    },

    // 根据覆盖物调整视野范围
    setFitView() {
      this.map.setFitView(
        null, // 覆盖物数组
        true, // 动画过渡到制定位置
        [60, 60, 60, 60], // 周围边距，上、下、左、右
        13
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.polygonMap-wrp {
  width: 100%;
  height: 306px;
}
</style>
