<template>
  <div class="noPass-page">
    <van-form ref="form">
      <van-cell-group inset>
        <van-field
          v-model="message"
          rows="5"
          autosize
          type="textarea"
          placeholder="请输入原因"
          :rules="[{ required: true, message: '请输入原因' }]"
        />
      </van-cell-group>
    </van-form>

    <div class="bottom-action flex">
      <van-button
        class="btn plain-btn"
        type="primary"
        :plain="true"
        round
        color="linear-gradient(45deg, #00B7A7, #58b3ab)"
        @click="onHandleCancel"
      >
        取消
      </van-button>
      <van-button class="btn" type="primary" round color="linear-gradient(45deg, #00B7A7, #58b3ab)" @click="onSubmit">
        提交
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Dialog } from 'vant';
import { Toast } from 'vant';

const message = ref('');
const form = ref('');
const props = defineProps({
  noPassFunc: {
    type: Function,
    required: true,
  },
});

const emits = defineEmits(['close', 'success']);

const onHandleCancel = () => {
  emits('close');
};

const onSubmit = () => {
  form.value.validate().then(() => {
    console.log(props.noPassFun);
    Dialog.confirm({
      message: '是否不通过审核？',
      confirmButtonColor: '#00B7A7',
    })
      .then(() => {
        props.noPassFunc(message.value).then(() => {
          Toast('操作成功');
          emits('close');
          emits('success');
        });
      })
      .catch(() => {
        // on cancel
      });
  });
};
</script>
<style lang="scss" scoped>
.noPass-page {
  width: 100%;
  height: 100vh;
  background: #fafafa;
  position: fixed;
  top: 0;
  left: 0;
  .van-form {
    padding-top: 20px;
  }

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
}
</style>
