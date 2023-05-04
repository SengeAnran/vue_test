import { fileUpload } from '@/api/file';

export function initDefault() {
  function afterRead(file) {
    file.status = 'uploading';
    file.message = '上传中...';
    const formdata = new FormData();
    formdata.append('file', file.file);
    fileUpload
      .uploadSingle(formdata)
      .then((res) => {
        file.status = 'done';
        file.message = '上传完成';
        file.response = res;
        file.filePath = res.filePath;
      })
      .catch(() => {
        file.status = 'failed';
        file.message = '上传失败';
      });
  }

  return {
    afterRead,
  };
}
