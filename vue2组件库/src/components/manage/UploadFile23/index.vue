<!--带上传进度的单文件上传-->
<template>
  <div class="upload-img-wrp" :class="{ disabled: disabled }">
    <el-upload
      ref="upload"
      action="/"
      drag
      :accept="accept"
      :before-upload="beforeImgUpload"
      :http-request="uploadImg"
      :show-file-list="false"
      :multiple="multiple"
    >
      <!--      图标-->
      <section class="icon-wrp">
        <div class="uploading-img" :class="{ loading }" v-if="loading || fileInfo.fileId">
          <img src="@/assets/imgs/file-icon.png" alt="" />
        </div>
        <i v-else class="el-icon-upload"></i>
      </section>
      <!--文件展示信息      -->
      <section class="file-info">
        <div class="el-upload__text" v-if="fileName" :title="fileName">
          {{ fileName.length > 17 ? fileName.slice(0, 17) + '...' : fileName }}
        </div>
        <div class="el-upload__text" v-else>点击或将文件拖拽到这里</div>
      </section>
      <!--      上传提示-->
      <section class="tips-wrp">
        <CommonProgress v-if="loading" :progress="progressPercent" @cancel="cancelUpload" />
        <div v-else>
          <div v-if="fileInfo.fileId" class="el-upload__btn">重新上传</div>
          <div v-else class="el-upload__tip">{{ tip }}</div>
        </div>
      </section>
    </el-upload>
  </div>
</template>
<script>
import { singleUpload2 } from '@/api/common.js';
import emitter from 'element-ui/lib/mixins/emitter.js';
import axios from 'axios';
import CommonProgress from './CommonProgress';
const CancelToken = axios.CancelToken;
let source = CancelToken.source();

// 区别于 uploadFile2,这里不需要特别的监听add\remove事件，通过v-model绑定value值获取到最新值。
export default {
  mixins: [emitter],
  // model: {
  //   type: 'update',
  //   prop: 'value',
  // },
  components: {
    CommonProgress,
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          fileId: null,
        };
      },
    },
    // 限制文件大小（MB）
    limitSize: {
      type: Number,
      default: 30,
    },
    multiple: {
      type: Boolean,
      default: false,
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
      loading: false,
      progressPercent: 0, // 上传进度展示
      fileList: [],
      // fileName: '',
      data: [],
    };
  },
  computed: {
    fileInfo() {
      return this.value;
    },
    fileName() {
      return this.value.fileName || '';
    },
  },
  // watch: {
  //   value(val) {
  //     if (val) {
  //       console.log()
  //       this.fileName = val.fileName || '';
  //     }
  //   },
  // },
  methods: {
    async uploadImg(info) {
      try {
        const formData = new FormData();
        formData.append('file', info.file);
        formData.append('business', 'history');
        this.progressPercent = 0;
        this.loading = true;
        const res = await singleUpload2(formData, {
          onUploadProgress: this.onUploadProgress,
          cancelToken: source.token,
        });
        this.$message.success('文件上传成功');
        this.$emit('change', res);
        this.$emit('input', res);
        // this.$emit('input', value)，这种情况不会触发表单的校验的，
        // 因为当前组件作为一个整体，被嵌入在el-form-item中，它并不知道你的数据变化了
        this.$parent.$emit('el.form.change'); // 通知上层数据变了
        this.loading = false;
      } catch (error) {
        // this.$refs.upload.handleRemove(info.file);
        throw new Error('上传失败');
      }
    },
    // 计算上传进度
    onUploadProgress(progressEvent) {
      // progressEvent.loaded:已上传文件大小
      // progressEvent.total:被上传文件的总大小
      this.progressPercent = Number(((progressEvent.loaded / progressEvent.total) * 100).toFixed(1));
    },
    // 上传过程中取消
    cancelUpload() {
      console.log('取消');
      source.cancel('Operation canceled by the user.');
      source = axios.CancelToken.source();
      this.loading = false;
      this.progressPercent = 0;
    },
    beforeImgUpload(file) {
      // this.fileName = file.name;
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
  ::v-deep .el-upload-dragger {
    background: #f7f8fa;
    .el-upload__text:first-of-type {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
    }
    .el-upload__tip {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
    }
    .el-upload__btn {
      overflow: hidden;
      position: relative;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #1492ff;
      &::before {
        content: '';
        display: inline-block;
        margin-right: 4px;
        padding-top: 2px;
        //position: absolute;
        //left: 0px;
        //top: 2px;
        width: 15px;
        height: 21px;
        background: url('./upload.png') no-repeat 0 7px;
        background-size: 100% 15px;
      }
    }
  }
  ::v-deep .icon-wrp {
    height: 106px;
    .uploading-img {
      margin: 0 auto;
      padding-top: 40px;
      width: 42px;
      height: 48px;
    }
    .loading {
      opacity: 0.6;
    }
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
