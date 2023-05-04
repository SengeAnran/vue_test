<template>
  <Uploader
    v-model="imgList"
    :after-read="afterRead"
    capture="camera"
    :before-delete="deletePic"
    :max-count="maxCount"
    :max-size="500 * 1024"
    @oversize="onOversize"
  ></Uploader>
</template>
<script setup>
import { Uploader, Toast } from 'vant';
import { reactive, toRefs, computed } from 'vue';
import { fileUpload } from '@/api/common';
const props = defineProps({
  maxCount: {
    type: Number,
    default: 10,
  },
  dataList: {
    type: Array,
    default: () => {},
  },
  index: {
    type: Number,
    default: 999,
  },
});
const { maxCount, index } = toRefs(props);

const emits = defineEmits(['uploadImag']);

let fileList1 = reactive([]);
// 删除图片
const deletePic = (event) => {
  console.log(event.url);
  const ind = fileList1.findIndex((i) => {
    return i.url === event.url;
  });
  console.log(ind);
  fileList1.splice(ind, 1);
  emits('uploadImag', index.value !== 999 ? { fileList: fileList1, index } : fileList1);
};

// 新增图片
const afterRead = async (file) => {
  console.log('dsddd', file);
  // 此时可以自行将文件上传至服务器
  file.status = 'uploading';
  file.message = '上传中...';
  let formData = new FormData();
  console.log(fileList1);
  formData.append('file', file.file);
  // formData.append('type', 1); // 0：文件，1：附件，2：图片
  const res = await fileUpload(formData);

  file.status = 'done';
  file.message = '上传完成';
  fileList1.push({ url: res.filePath });
  console.log(fileList1);
  if (index.value !== 999) {
    emits('uploadImag', { fileList: fileList1, index });
  } else {
    emits('uploadImag', fileList1);
  }
};
// 图片过大
const onOversize = (file) => {
  console.log(file);
  Toast('文件大小不能超过 500kb');
}; // 图片过大

// 数据回显
const imgList = computed(() => {
  // dataList.map(i => {
  //
  // })
  return props.dataList;
});
// imgList();
// //情况四：监视reactive定义的响应式数据中的某个属性
// watch(
//   () => props.dataList,
//   (newValue, oldValue) => {
//     console.log(newValue, oldValue);
//     // init();
//   },
//   { immediate: true, deep: true },
// );
</script>
