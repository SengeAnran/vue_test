<template>
  <van-popup v-model:show="_show" round position="bottom">
    <van-cascader
      v-model="cascaderValue"
      title="请选择地区"
      :options="options"
      @close="_show = false"
      @finish="onFinish"
      @change="onChange"
      active-color="#259dff"
    />
  </van-popup>
</template>
<script setup>
import { ref, computed } from 'vue';
import { sonAreasForInfoBase } from '@/api/common';

const props = defineProps({
  show: { type: Boolean, default: false },
});
const emits = defineEmits(['update:show', 'finish']);

const _show = computed({
  get() {
    return props.show;
  },
  set() {
    emits('update:show');
  },
});

const fieldValue = ref('');
const cascaderValue = ref('');

// 选项列表，children 代表子选项，支持多级嵌套
const options = ref([
  {
    text: '浙江省',
    value: '33',
    children: [],
  },
]);
const onChange = async (val) => {
  const { value, tabIndex, selectedOptions } = val;
  if (tabIndex === 4) {
    return;
  }

  const children = await loadSonAreas(value);
  // 查找层级
  let searchOptions = options.value;
  const levelArr = [];
  selectedOptions.forEach((item, i) => {
    levelArr.push(
      searchOptions.findIndex((c) => {
        return c.value === item.value;
      }),
    );
    if (i === selectedOptions.length - 1) {
      searchOptions = searchOptions[levelArr[i]];
    } else {
      searchOptions = searchOptions[levelArr[i]].children;
    }
  });

  searchOptions.children = children;
};

// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  _show.value = false;
  fieldValue.value = selectedOptions.map((option) => option.text).join('/');

  emits('finish', {
    ...selectedOptions[selectedOptions.length - 1],
    fieldValue: fieldValue.value,
    cascaderValue: cascaderValue.value,
  });
};

/**
 * @desc 加载区域子节点
 */
const loadSonAreas = (areaId) => {
  return new Promise((resolve) => {
    sonAreasForInfoBase({ areaId }).then((res) => {
      const children = res.map((item) => {
        return {
          ...item,
          text: item.areaName,
          value: item.areaId,
          children: item.level == 5 ? undefined : [],
        };
      });
      resolve(children);
    });
  });
};
</script>
