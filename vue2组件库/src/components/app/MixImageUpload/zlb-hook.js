import { Notify } from 'vant';
import { reactive } from 'vue';

export function initZlb(fileList) {
  const ZWJSBridge = window.ZWJSBridge;

  function chooseImage() {
    ZWJSBridge.onReady(() => {
      // 由于IOS上传有问题（浙里办不会自动设置content-type，不会生成boundary，无法上传），暂时使用上传到浙里办服务器，使用公有链接
      ZWJSBridge.chooseImage({ upload: true })
        .then(({ result, picPath }) => {
          if (!result) {
            Notify({ type: 'error', message: '选择图片错误，请重试' });
            return;
          }
          const imgPath = picPath[0];
          const fileItem = reactive({
            content: imgPath,
            filePath: imgPath,
            message: '上传完成',
            status: 'done',
          });
          fileList.value.push(fileItem);
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
