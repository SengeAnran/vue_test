import axios from 'axios';
import { Message } from 'element-ui';
import config from '@/utils/config';
import { timeoutRedirect, getToken, removeToken } from '@/utils/auth';

const option = {
  baseURL: config.requestBaseUrl,
};

// 创建 axios 实例
const service = axios.create(option);

service.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    console.log(error, '请求失败'); // for debug
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 判断处理结果是文件类型时，不对结果集处理，直接返回
    if (res instanceof Blob) {
      return response;
    }
    if (res.code === undefined) {
      return response;
    }
    // 这里需要根据不同的项目后端接口封装情况做适当调整
    if (res.code === 2001 || res.code === 401) {
      Message.error((res && res.msg) || '未知异常！');
      removeToken();
      // location.href = getLoginPath(true);
      timeoutRedirect();
    } else if (res.code !== 0) {
      Message.error((res && res.msg) || '未知异常！');
      return Promise.reject(new Error((res && res.msg) || '未知异常！'));
    } else {
      return res.data;
    }
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log('Request canceled');
      return null;
    }
    const res = error.response.data || {};

    Message.error({ message: res.msg || '未知异常！', showClose: true });
    if (res.code === 2001) {
      removeToken();
      // location.href = getLoginPath(true);
      timeoutRedirect();
    }
    return Promise.reject(error);
  },
);

export default service;
