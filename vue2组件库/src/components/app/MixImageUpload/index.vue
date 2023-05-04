<!-- MixImageUpload -->
<template>
  <template v-if="!isZlb">
    <van-uploader
      class="upload"
      v-model="fileList"
      accept="image/*"
      :after-read="afterRead"
      :max-count="maxCount"
      :multiple="false"
    />
  </template>
  <template v-else>
    <div class="van-field__body">
      <div class="van-field__control van-field__control--custom">
        <div class="van-uploader upload">
          <div class="van-uploader__wrapper">
            <div class="van-uploader__preview" v-for="(item, i) in fileList" :key="i">
              <div class="van-image van-uploader__preview-image">
                <img :src="item.content" class="van-image__img" />
              </div>
              <div class="van-uploader__mask" v-if="item.status === 'uploading'">
                <van-loading class="van-uploader__loading" />
                <div class="van-uploader__mask-message">{{ item.message }}</div>
              </div>
              <div class="van-uploader__mask" v-if="item.status === 'failed'">
                <i class="van-badge__wrapper van-icon van-icon-close van-uploader__mask-icon"></i>
                <div class="van-uploader__mask-message">{{ item.message }}</div>
              </div>
              <div class="van-uploader__preview-delete" @click="handleDelete(i)" v-if="item.status !== 'uploading'">
                <i class="van-badge__wrapper van-icon van-icon-cross van-uploader__preview-delete-icon"></i>
              </div>
            </div>
            <div class="van-uploader__upload" @click="chooseImage">
              <i class="van-badge__wrapper van-icon van-icon-photograph van-uploader__upload-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
import { initDefault } from './default-hook';
import { initZlb } from './zlb-hook';
/**
 * 图片上传组件，为兼容H5，微信浏览器，浙里办
 * 因为微信浏览器对H5原生做了优化，可以和H5原生保持一致
 * 只用对浙里办做特殊处理（采用浙里办的 chooseImage API 实现）
 * 注意：只做单选处理
 */
const isZlb = !!window.JupiterJSBridge; // 浙里办

const props = defineProps({
  maxCount: { type: Number, default: Infinity },
  modelValue: { type: Array, required: true },
});
const emit = defineEmits(['update:modelValue', 'change']);
const fileList = ref([]);

watch(
  () => props.modelValue,
  (val) => (fileList.value = Array.isArray(val) ? val : []),
  { immediate: true },
);

watch(
  fileList,
  (val) => {
    console.log(val);
    emit('update:modelValue', val);
    emit('change');
  },
  { deep: true },
);

const { chooseImage, handleDelete } = initZlb(fileList);
const { afterRead } = initDefault();
</script>
