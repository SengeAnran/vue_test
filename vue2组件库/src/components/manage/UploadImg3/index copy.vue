<template>
  <div class="upload-img-wrp" :class="{ disabled: disabled }">
    <el-upload
      ref="upload"
      action="string"
      list-type="picture-card"
      :limit="limit"
      accept="image/jpg, image/png, image/jpeg"
      :file-list="fileList"
      :before-upload="beforeImgUpload"
      :on-exceed="handleExceedImg"
      :http-request="uploadImg"
      :multiple="multiple"
    >
      <div class="default-upload" slot="default">
        <svg-icon :fontSize="48" iconClass="add" />
        <p class="desc">
          <span>支持:png，jpg格式</span>
          <span>大小不超过3M</span>
          <span>最多可上传10张</span>
        </p>
      </div>
      <div
        class="upload-ready"
        @click="handlePictureCardPreview(file)"
        slot="file"
        slot-scope="{ file, fileList }"
      >
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="delete-active">
          <svg-icon
            icon-class="delete"
            :fontSize="24"
            @click.stop.prevent="handleRemove(file, fileList)"
          />
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import { uploadFile } from "@/api/common.js";

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    limit: {
      type: Number,
      default: 10,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  computed: {
    fileList() {
      return this.data.map((list) => {
        return {
          name: list.fileName,
          url: list.filePath,
        };
      });
    },
  },
  methods: {
    async uploadImg(info) {
      const formData = new FormData();
      formData.append("file", info.file);

      const res = await uploadFile(formData);
      this.$message.success("图片上传成功");
      this.$emit("add", { ...res, uid: info.file.uid });

      if (this.$refs.upload.uploadFiles.length >= this.limit) {
        this.disabled = true;
      }
    },
    handleRemove(file) {
      this.$refs.upload.handleRemove(file);
      this.$emit("remove", file);
      this.disabled = false;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeImgUpload(file) {
      const isFormat =
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 3;

      if (!isFormat) {
        this.$message.error("上传图片只能是 JPG、PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 3MB!");
      }
      return isFormat && isLt2M;
    },
    handleExceedImg() {
      this.$message.warning(`当前限制上传 ${this.limit} 张图片`);
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-img-wrp {
  &.disabled {
    ::v-deep .el-upload--picture-card {
      display: none;
    }
  }
  ::v-deep .el-upload--picture-card {
    width: 124px;
    height: 122px;
    background: #f4f4f4;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    border: 0;
    outline: 0;
  }
  ::v-deep .el-upload-list__item {
    width: 124px;
    height: 122px;
    overflow: visible;
    border: 0;
    outline: 0;
  }
  .default-upload {
    width: 124px;
    height: 122px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .desc {
      height: 60px;
      display: flex;
      flex-direction: column;
      & span {
        display: inline-block;
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
        line-height: 18px;
      }
    }
  }

  .upload-ready {
    cursor: pointer;
    width: 100%;
    height: 100%;
    img {
      object-fit: cover;
    }
    .delete-active {
      position: absolute;
      top: -12px;
      right: -12px;
      z-index: 9;
    }
  }
}
</style>
