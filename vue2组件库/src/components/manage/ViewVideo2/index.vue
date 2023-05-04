<!--视频查看-->
<template>
  <div>
    <video
      class="image"
      fit="cover"
      v-for="(item, i) in data"
      :src="item.filePath"
      :key="i"
      @click="preview(item.filePath)"
    ></video>
    <el-dialog :visible.sync="dialogVisible" :top="'5vh'">
      <video ref="video" style="width: 100%; max-height: 80vh" :src="dialogImageUrl" controls></video>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
    };
  },
  watch: {
    dialogVisible(val) {
      if (!val) {
        const video = this.$refs.video;
        if (video) {
          video.pause();
        }
      }
    },
  },
  methods: {
    preview(src) {
      this.dialogVisible = true;
      this.dialogImageUrl = src;
    },
  },
};
</script>

<style lang="scss" scoped>
.image {
  margin-right: 8px;
  width: 124px;
  height: 124px;
  cursor: pointer;
}
</style>
