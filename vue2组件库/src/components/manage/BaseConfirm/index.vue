<!--确认取消弹框-->
<template>
  <el-dialog
    :visible.sync="centerDialogVisible"
    center
    :close-on-click-modal="false"
    class="base-confirm-wrp"
    :width="`${width}px`"
  >
    <div class="content-wrp">
      <svg-icon :iconClass="iconClass" style="font-size: 60px" />
      <span class="content">{{ content }}</span>

      <span slot="footer" class="dialog-footer">
        <el-button
          class="cancel"
          size="mini"
          type="primary"
          plain
          @click="close(false)"
        >
          取 消
        </el-button>
        <el-button size="mini" :type="type" @click="close(true)">
          确 定
        </el-button>
      </span>
    </div>
  </el-dialog>
</template>

<script>
/**
 * @description 自定义确认框
 * @param {String} icon 图标
 * @param {String} type 弹窗类型
 * @param {String} content 内容
 * @param {String} confirmButtonText 确认按钮文字
 * @param {String} cancelButtonText 取消按钮文字
 * @param {Number} width 宽度
 */
const ICON_TYPE = ["info", "error", "success"];
export default {
  name: "BaseConfirm",
  props: {
    icon: {
      type: String,
      default: "info",
    },
    type: {
      type: String,
      default: "primary",
    },
    content: {
      type: String,
      default: "",
    },
    confirmButtonText: {
      type: String,
      default: "确 定",
    },
    cancelButtonText: {
      type: String,
      default: "取 消",
    },
    width: {
      type: Number,
      default: 360,
    },
  },
  data() {
    return {
      centerDialogVisible: true,
    };
  },
  computed: {
    iconClass() {
      if (ICON_TYPE.indexOf(this.icon) !== -1) {
        return this.icon;
      }
      return "info";
    },
  },
  methods: {
    close(flag) {
      this.centerDialogVisible = false;
      this.$emit("close", flag);
    },
  },
};
</script>

<style lang="scss" scoped>
.base-confirm-wrp {
  ::v-deep .el-dialog {
    border-radius: 8px;
  }
}
.content-wrp {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 1;
    font-size: 16px;
    margin: 12px 0 36px;
  }

  .dialog-footer {
    ::v-deep button {
      font-size: 16px;
    }
    .cancel {
      background: #fff;
      color: #409eff;
      border-color: #409eff;
      margin-right: 24px;
      &:hover {
        color: #66b1ff;
        border-color: #66b1ff;
      }
    }
  }
}
</style>
