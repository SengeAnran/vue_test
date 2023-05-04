<template>
  <div class="bottom-action flex">
    <van-button
      class="btn plain-btn"
      type="primary"
      :plain="true"
      round
      color="linear-gradient(45deg, #00B7A7, #58b3ab)"
      @click="onAuditNoPass"
    >
      不通过
    </van-button>
    <van-button class="btn" type="primary" round color="linear-gradient(45deg, #00B7A7, #58b3ab)" @click="onAuditPass">
      通过
    </van-button>
  </div>
  <AuditNoPass
    v-if="showAuditDialog"
    @close="closeDialog"
    :noPassFunc="props.noPassFunc"
    :passFunc="props.passFunc"
    @success="onAuditConfirm"
  />
</template>

<script setup>
import { ref } from 'vue';
import { Dialog } from 'vant';
import { Toast } from 'vant';

const props = defineProps({
  noPassFunc: {
    type: Function,
    required: true,
  },
  passFunc: {
    type: Function,
    required: true,
  },
});

const emits = defineEmits(['success']);

const showAuditDialog = ref(false);

const onAuditNoPass = () => {
  console.log('不通过');
  showAuditDialog.value = true;
};
// 关闭不通过审核弹窗
const closeDialog = () => {
  showAuditDialog.value = false;
};

const onAuditPass = () => {
  console.log('通过');
  Dialog.confirm({
    message: '是否确认审核通过？',
    confirmButtonColor: '#00B7A7',
  })
    .then(() => {
      props.passFunc().then(() => {
        Toast('操作成功');
        onAuditConfirm();
      });
    })
    .catch(() => {
      // on cancel
    });
};
// 审核完成后的回调
const onAuditConfirm = () => {
  emits('success');
};
</script>

<style lang="scss" scoped>
.bottom-action {
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 70px;
  padding: 14px 35px 0;
  background: #ffffff;
  box-shadow: 0px -1px 1px 0px #f7f7f7;
}
.btn {
  width: 100%;
  font-family: PingFangSC-Regular, PingFang SC;
  box-shadow: 0px 2px 6px 0px rgba(88, 179, 171, 0.45);
}
.btn.plain-btn {
  color: rgb(88, 179, 171);
  border-color: rgba(88, 179, 171) !important;
}

.flex {
  .btn:first-child {
    margin-right: 10px;
  }
}
</style>
