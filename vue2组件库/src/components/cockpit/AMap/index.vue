<template>
  <div class="map" ref="mapEle">
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    satelliteMap: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 记录点击的数组
      ObjeClickArr: [],
    };
  },
  watch: {
    satelliteMap() {
      if (this.satelliteMap) {
        this.map.add(this.layers);
      } else {
        this.map.remove(this.layers);
      }
    }
  },
  provide() {
    return {
      mapPromise: new Promise((resolve) => {
        this.resolveMap = resolve;
      }),
    };
  },
  mounted() {
    this.layers =  [
      new AMap.TileLayer.Satellite(),
      new AMap.TileLayer.RoadNet()
    ];
    this.map = new AMap.Map(this.$refs.mapEle, {
      resizeEnable: true,
      zoom: 13,
      zooms: [3, 16],
      center: [122.138836, 29.730147],
      viewMode:'3D',
      mapStyle: 'amap://styles/fd920fcbd2be012ec26b3d6f90c39f09',
    });
    if (this.satelliteMap) {
      this.map.add(this.layers);
    }
    this.resolveMap(this.map);
    window.amap = this.map;
  },

  beforeDestroy() {
    this.map.destroy();
  },
};
</script>
<style lang="scss" scoped>
.map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 135rem;
  background: #1e1e1e;
  &::after {
    position: absolute;
    content: ' ';
    top: 0;
    left: 0;
    width: 100%;
    height: 207rem;
    pointer-events: none;
    background: url('./img/mask.png') no-repeat;
    background-size: 100% 100%;
  }
  ::v-deep .amap-logo {
    display: none !important;
  }
}
</style>
