<!--一般文件上传-->
<template>
  <div class="upload-img-wrp" :class="{ disabled: disabled }">
    <el-upload
      ref="upload"
      action="/"
      drag
      :limit="limit"
      :accept="accept"
      :file-list="fileList"
      :before-upload="beforeImgUpload"
      :on-exceed="handleExceedImg"
      :http-request="uploadImg"
      :on-remove="handleRemove"
      :multiple="multiple"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">点击或将文件拖到这里上传</div>
      <div v-if="tip" class="el-upload__text">{{ tip }}</div>
    </el-upload>
  </div>
</template>
<script>
import { uploadFile } from '@/api/common.js';

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
    // 限制文件大小（MB）
    limitSize: {
      type: Number,
      default: 500,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    tip: {
      type: String,
      default: '',
    },
    accept: {
      type: String,
      default: '*',
    },
  },
  data() {
    return {
      dialogImageUrl: '',
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
      //console.log(info);
      const formData = new FormData();
      formData.append('file', info.file);

      const res = await uploadFile(formData);
      this.$message.success('文件上传成功');
      this.$emit('add', { ...res, uid: info.file.uid });

      if (this.$refs.upload.uploadFiles.length >= this.limit) {
        this.disabled = true;
      }
    },
    handleRemove(file) {
      // this.$refs.upload.handleRemove(file);
      this.$emit('remove', file);
      this.disabled = false;
    },
    beforeImgUpload(file) {
      //console.log(file);
      const suffix = file.name.split('.').slice(-1)[0];
      const isFormat = this.accept === '*' ? true : this.accept.indexOf(suffix) >= 0;
      const isLimit = file.size / 1024 / 1024 < this.limitSize;

      if (!isFormat) {
        this.$message.error('上传文件格式不正确!');
      }
      if (!isLimit) {
        this.$message.error(`上传文件大小不能超过 ${this.limitSize}MB!`);
      }
      return isFormat && isLimit;
    },
    handleExceedImg() {
      this.$message.warning(`当前限制上传 ${this.limit} 个文件`);
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
    width: 360px;
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
