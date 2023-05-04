import axios from '@/utils/request';
import config from '@/utils/config';

const { apiHost, apiHost2, apiHost3 } = config;

export const uploadFile = (data) => {
  return axios.request({
    method: 'post',
    url: apiHost + '/file/upload',
    data,
    // headers: { 'APPLICATION-ID': '3' },
  });
};
export const uploadFile2 = (data, config) => {
  return axios.request({
    method: 'post',
    url: apiHost2 + '/api/workbench/custom/file/upload/single',
    data,
    ...config,
    // headers: { 'APPLICATION-ID': '3' },
  });
};
export const singleUpload2 = (data, config) => {
  return axios.request({
    method: 'post',
    url: apiHost2 + '/api/workbench/custom/file/upload/single',
    data,
    ...config,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

export const uploadFile3 = (data) => {
  return axios.request({
    method: 'post',
    url: apiHost3 + '/api/admin/custom/file/upload/single',
    data,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

export const downloadFile2 = (params) => {
  return axios.request({
    method: 'get',
    url: apiHost2 + '/file/download/' + params.id,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

export const downloadFile = (params) => {
  return axios.request({
    method: 'get',
    url: apiHost + '/file/download/' + params.id,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

export const deleteFile = (params) => {
  return axios.request({
    method: 'get',
    url: apiHost + '/file',
    params,
    // headers: { 'APPLICATION-ID': '3' },
  });
};
