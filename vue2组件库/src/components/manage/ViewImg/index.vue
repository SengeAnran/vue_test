<!--照片查看-->
<template>
  <div>
    <el-image
      class="image"
      v-for="(item, i) in data"
      :key="i"
      :src="item.filePath"
      fit="cover"
      @click="preview(item.filePath)"
    ></el-image>
    <el-dialog :visible.sync="dialogVisible" :modal="modal">
      <img width="100%" :src="dialogImageUrl" alt="" />
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
    modal: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
    };
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
