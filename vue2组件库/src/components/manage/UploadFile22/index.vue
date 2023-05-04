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
      :multiple="multiple"
      :on-change="emitChange"
      :on-remove="emitChange"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">点击或将文件拖到这里上传</div>
      <div v-if="tip" class="el-upload__text">{{ tip }}</div>
    </el-upload>
  </div>
</template>
<script>
import { uploadFile2 } from '@/api/common.js';
import emitter from 'element-ui/lib/mixins/emitter.js';

// 区别于 uploadFile2,这里不需要特别的监听add\remove事件，通过v-model绑定value值获取到最新值。默认值通过defaultData传入
export default {
  mixins: [emitter],
  props: {
    defaultData: {
      type: Array,
      default: () => [],
    },
    value: {
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
      default: 30,
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
      disabled: false,
      fileList: [],
      data: [],
    };
  },
  watch: {
    defaultData: {
      handler: function (val) {
        this.fileList = (val || []).map((list) => {
          return {
            name: list.fileName,
            url: list.filePath,
            status: 'success',
            response: list,
            filePath: list.filePath,
            fileName: list.fileName,
            fileId: list.fileId,
          };
        });
        this.data = this.fileList;
        if (this.fileList.length >= this.limit) {
          this.disabled = true;
        }
        this.$emit('input', this.data);
        this.$emit('change', this.data);
        // this.dispatch('ElFormItem', 'el.form.change', [this.data]);
      },
      immediate: true,
    },
  },
  methods: {
    async uploadImg(info) {
      try {
        const formData = new FormData();
        formData.append('file', info.file);
        formData.append('business', 'history');
        const res = await uploadFile2(formData);
        this.$message.success('文件上传成功');
        return res;
      } catch (error) {
        this.$refs.upload.handleRemove(info.file);
        throw new Error('上传失败');
      }
    },
    beforeImgUpload(file) {
      //console.log(file);
      const suffix = file.name.split('.').slice(-1)[0].toLowerCase();
      const isFormat = this.accept === '*' ? true : this.accept.indexOf(suffix) >= 0;
      const isLimit = file.size / 1024 / 1024 < this.limitSize;

      if (!isFormat) {
        this.$message.error('上传文件格式不正确!');
      }
      if (!isLimit) {
        this.$message.error(`上传文件大小不能超过 ${this.limitSize}MB!`);
      }
      const r = isFormat && isLimit;

      if (!r) {
        this.$refs.upload.handleRemove(file);
      }
      return r;
    },
    handleExceedImg() {
      this.$message.warning(`当前限制上传 ${this.limit} 个文件`);
    },
    emitChange(file, fileList) {
      if (fileList.length >= this.limit) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
      const dest = fileList.map((ele) => {
        const { name, url, uid, status, response } = ele;
        const { fileId, fileName, filePath } = response || {};
        return {
          name,
          url,
          uid,
          status,
          fileId,
          fileName,
          filePath,
          response,
        };
      });
      this.data = dest;
      this.$emit('input', dest);
      this.$emit('change', dest);
      this.dispatch('ElFormItem', 'el.form.change', [dest]);
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
