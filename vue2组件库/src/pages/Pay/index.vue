<!--支付宝支付-->
<template>
  <div class="page">
    <div class="payCode" ref="payCode" v-html="payCodeHtml">

    </div>
    <el-button type="primary" @click="clickPay"> 支付</el-button>
  </div>
</template>

<script>
import {
  payTwoHundred
} from '@/api/pay'

export default {
  name: 'index',
  data() {
    return {
      payCodeHtml: ''
    }
  },
  methods: {
    // 支付流程
    // 调用支付接口→拿到form表单→调起支付页面→查询支付结果
    clickPay: function () {
      const data = {
        payType: 2, // 支付方式：1微信扫码支付(默认)，2支付宝扫码支付
        courseId: 2, // 课程ID
        quitUrl: '' // 用户付款中途退出的回调地址
      }
      payTwoHundred(data).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
