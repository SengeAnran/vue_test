import { Notify } from 'vant';
import { fileUpload } from '@/api/file';
import { reactive } from 'vue';

export function initZlb(fileList) {
  const ZWJSBridge = window.ZWJSBridge;

  function chooseImage() {
    ZWJSBridge.onReady(() => {
      ZWJSBridge.chooseImage({ upload: false })
        .then(({ result, picSrc }) => {
          if (!result) {
            Notify({ type: 'error', message: '选择图片错误，请重试' });
            return;
          }
          const imgData = picSrc[0];
          const fileItem = reactive({
            content: imgData,
            file: convertBase64UrlToBlob(imgData),
            message: '上传中...',
            status: 'uploading',
          });
          fileList.value.push(fileItem);
          const formdata = new FormData();
          formdata.append('file', fileItem.file);
          fileUpload
            .uploadSingle(formdata)
            .then((res) => {
              fileItem.status = 'done';
              fileItem.message = '上传完成';
              fileItem.response = res;
              fileItem.filePath = res.filePath;
            })
            .catch(() => {
              fileItem.status = 'failed';
              fileItem.message = '上传失败';
            });
        })
        .catch(() => {
          Notify({ type: 'error', message: '选择图片错误，请重试' });
        });
    });
  }

  function handleDelete(i) {
    fileList.value.splice(i, 1);
  }

  return {
    chooseImage,
    handleDelete,
  };
}

/**
 * 将base64转换成可用formdata提交的文件,urlData base64的url
 * @param {*} urlData
 * @returns
 */
function convertBase64UrlToBlob(urlData) {
  const arr = urlData.split(',');
  const bytes = window.atob(arr[1]); // 去掉url的头，并转换为byte
  const mime = arr[0].match(/:(.*?);/)[1]; // 拿到文件格式
  // 处理异常,将ascii码小于0的转换为大于0
  const ab = new ArrayBuffer(bytes.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: mime });
}
