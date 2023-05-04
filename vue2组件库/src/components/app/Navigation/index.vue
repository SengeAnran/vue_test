<template>
  <van-action-sheet
    v-model:show="_show"
    :actions="actions"
    cancel-text="取消"
    close-on-click-action
    @cancel="onCancel"
    @select="onSelect"
  />
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    lng: {
      type: String,
      default: '0',
    },
    lat: {
      type: String,
      default: '0',
    },
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
    _show: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit('update:show', val);
      },
    },
  },
  data() {
    return {
      actions: [{ name: '高德地图' }, { name: '百度地图' }],
    };
  },
  methods: {
    onCancel() {
      // this._show = false;
    },
    onSelect(action) {
      let href;
      const location = [this.lng, this.lat]; // 测试位置
      // 啊，百度位置到时候需要转换
      if (action.name === '高德地图') {
        href = `https://uri.amap.com/marker?position=${location[0]},${location[1]}&name=${this.title}`;
      } else if (action.name === '百度地图') {
        const { bd_lat, bd_lng } = this.bd_encrypt(this.lng, this.lat);
        href = `http://api.map.baidu.com/marker?location=${bd_lat},${bd_lng}&title=${this.title}&output=html`;
      }
      this.evokeMap(href);
    },
    // 创建链接
    evokeMap(href) {
      if (!href) return;
      const link = document.createElement('a');
      link.setAttribute('href', href);
      document.body.appendChild(link);
      link.click();
      document.removeChild(link);
    },

    // 高德坐标转百度（传入经度、纬度）
    bd_encrypt(gg_lng, gg_lat) {
      var X_PI = (Math.PI * 3000.0) / 180.0;
      var x = gg_lng,
        y = gg_lat;
      var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
      var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
      var bd_lng = z * Math.cos(theta) + 0.0065;
      var bd_lat = z * Math.sin(theta) + 0.006;
      return {
        bd_lat: bd_lat,
        bd_lng: bd_lng,
      };
    },
  },
};
</script>
