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
      :on-change="emitChange"
      :on-remove="emitChange"
      :http-request="uploadImg"
      :multiple="multiple"
    >
      <div class="default-upload" slot="default">
        <i class="el-icon-plus"></i>
        <p class="desc">
          <span>上传照片</span>
        </p>
      </div>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
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
    <el-dialog :visible.sync="dialogVisible" :modal="modal">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import { uploadFile2 } from '@/api/common.js';
import emitter from 'element-ui/lib/mixins/emitter.js';

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
    modal: {
      type: Boolean,
      default: true,
    },
    limit: {
      type: Number,
      default: 6,
    },
    size: {
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
      dialogImageUrl: '',
      dialogVisible: false,
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
        this.$message.success('图片上传成功');
        return res;
      } catch (error) {
        this.$refs.upload.handleRemove(info.file);
        throw new Error('上传失败');
      }
    },
    handleRemove(file) {
      this.$refs.upload.handleRemove(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeImgUpload(file) {
      const isFormat = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < this.size;

      if (!isFormat) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!');
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
      this.$message.warning(`当前限制上传 ${this.limit} 张图片`);
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
    overflow: visible;
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
