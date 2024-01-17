import request from '@/utils/request2'

export const payTwoHundred = (data) => {
  return request({
    method: 'post',
    url: '/user/auth/order/pay/create',
    data
  })
}
