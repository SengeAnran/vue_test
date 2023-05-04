<!--带进度的视频上传-->
<template>
  <div class="upload-img-wrp" :class="{ disabled: disabled }">
    <el-upload
      ref="upload"
      action="string"
      list-type="picture-card"
      :limit="limit"
      accept="video/mp4, video/quicktime"
      :file-list="fileList"
      :before-upload="beforeImgUpload"
      :on-exceed="handleExceedImg"
      :on-change="emitChange"
      :on-remove="emitChange"
      :http-request="uploadImg"
      :multiple="multiple"
    >
      <div class="default-upload" slot="default">
        <i class="el-icon-plus"></i>
        <p class="desc">
          <span>上传视频</span>
        </p>
      </div>
      <div slot="file" slot-scope="{ file }" style="height: 100%">
        <video class="el-upload-list__item-thumbnail" :src="file.url"></video>
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <div style="display: block !important">
      <CommonProgress v-if="loading" :progress="progressPercent" @cancel="cancelUpload" />
    </div>

    <el-dialog :visible.sync="dialogVisible" :top="'5vh'">
      <video ref="video" style="width: 100%; max-height: 80vh" :src="dialogImageUrl" controls></video>
    </el-dialog>
  </div>
</template>
<script>
import { uploadFile2 } from '@/api/common.js';
import CommonProgress from './CommonProgress';
import emitter from 'element-ui/lib/mixins/emitter.js';
import axios from 'axios';
const CancelToken = axios.CancelToken;
let source = CancelToken.source();

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
      default: 1,
    },
    size: {
      type: Number,
      default: 600,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  components: { CommonProgress },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
      data: [],
      loading: false,
      progressPercent: 0, // 上传进度展示
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
            fileId: list.fileId,
            fileName: list.fileName,
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
    async uploadImg(info) {
      try {
        const formData = new FormData();
        formData.append('file', info.file);
        formData.append('business', 'history');
        this.progressPercent = 0;
        this.loading = true;
        const res = await uploadFile2(formData, {
          onUploadProgress: this.onUploadProgress,
          cancelToken: source.token,
        });
        if (res.fileId) {
          this.$message.success('视频上传成功');
        }
        this.loading = false;
        return res;
      } catch (error) {
        this.$refs.upload.handleRemove(info.file);
        throw new Error('上传失败');
      }
    },
    // 计算上传进度
    onUploadProgress(progressEvent) {
      // progressEvent.loaded:已上传文件大小
      // progressEvent.total:被上传文件的总大小
      this.progressPercent = Number(((progressEvent.loaded / progressEvent.total) * 100).toFixed(1));
      console.log(this.progressPercent);
    },
    // 上传过程中取消
    cancelUpload() {
      source.cancel('Operation canceled by the user.');
      source = axios.CancelToken.source();
      this.loading = false;
      this.progressPercent = 0;
    },
    handleRemove(file) {
      this.$refs.upload.handleRemove(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeImgUpload(file) {
      const lastName = file.name.slice(-4).toLowerCase(); // 防止大写后缀
      const isFormat = (file.type === 'video/mp4' && lastName === '.mp4') || file.type === 'video/quicktime';
      const isLt2M = file.size / 1024 / 1024 < this.size;

      if (!isFormat) {
        this.$message.error('上传视频只能是 MP4、MOV 格式!');
        this.$refs.upload.handleRemove(file);
        return false;
      }
      if (!isLt2M) {
        this.$message.error(`上传图片大小不能超过 ${this.size}MB!`);
        this.$refs.upload.handleRemove(file);
        return false;
      }
      return true;
    },
    handleExceedImg() {
      this.$message.warning(`当前限制上传 ${this.limit} 个视频`);
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
  .el-icon-plus {
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 14px;
  }

  &.disabled {
    ::v-deep .el-upload--picture-card {
      display: none;
    }
  }

  ::v-deep .el-upload--picture-card {
    width: 124px;
    height: 122px;
    border-radius: 4px;
    outline: 0;
  }

  ::v-deep .el-upload-list__item {
    width: 124px;
    height: 122px;
    overflow: hidden;
    border: 0;
    outline: 0;

    img {
      width: 124px;
      height: 124px;
      object-fit: contain;
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
      display: flex;
      flex-direction: column;

      & span {
        display: inline-block;
        font-size: 14px;
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
