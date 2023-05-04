<!--地图选择地址-->
<template>
  <div class="map-search">
    <div class="flex mb-4">
      <div class="mr-4">
        <el-select v-model="city">
          <el-option v-for="(item, index) in cities" :key="index"></el-option>
        </el-select>
        市
      </div>
      <div class="mr-4">
        <el-select v-model="district">
          <el-option
            v-for="(item, index) in districts"
            :key="index"
          ></el-option>
        </el-select>
        县（市、区）
      </div>
      <div class="mr-4">
        <el-select v-model="village">
          <el-option v-for="(item, index) in villages" :key="index"></el-option>
        </el-select>
        村
      </div>
    </div>
    <div class="map" ref="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cities: [],
      districts: [],
      villages: [],
      city: "",
      district: "",
      village: "",
      address: "湖州市双子大厦",
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new AMap.Map(this.$refs.map, {});
      this.geocoder = new AMap.Geocoder({
        //city: "010", //城市设为北京，默认：“全国”
      });
      this.marker = new AMap.Marker();
    },
    search() {
      // const address = `${this.city}${this.district}${this.village}`;
      const address = this.address;
      this.geocoder.getLocation(address, (status, result) => {
        if (status === "complete" && result.geocodes.length) {
          const lnglat = result.geocodes[0].location;
          this.marker.setPosition(lnglat);
          this.map.add(this.marker);
          this.map.setFitView(this.marker);
        } else {
          this.$message.error("根据地址查询位置失败");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.map-search {
  height: 100%;
}
.map {
  width: 100%;
  height: 500px;
}
</style>
