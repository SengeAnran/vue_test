<template>
  <div class="overview-top-btn" @click="showPicker = true">
    <span>{{ result.areaName }}</span>
    <van-icon name="play" size="12" color="#555" class="icon" :class="{ active: showPicker }" />
  </div>
  <van-popup v-model:show="showPicker" round position="bottom">
    <van-picker
      :columns="pickerColumns"
      @cancel="showPicker = false"
      @confirm="onConfirm"
      :columns-field-names="customFieldName"
    />
  </van-popup>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { sonAreas } from '@/api/common';
const emits = defineEmits(['confirm']);

const pickerColumns = ref([]);
const customFieldName = { text: 'areaName' };

const defaultResult = { areaName: '全部', areaId: '33' };
const result = ref(defaultResult);
const showPicker = ref(false);

const onConfirm = (value) => {
  result.value = value;
  showPicker.value = false;
  emits('confirm', value);
};

const setPickerData = () => {
  searchCity();
};

function searchCity() {
  sonAreas({ areaId: 33 }).then((res) => {
    res.unshift({ areaName: '全部', areaId: '33' });
    pickerColumns.value = res;
  });
}

onMounted(() => {
  setPickerData();
});
</script>
<style lang="scss" scoped>
.overview-top-btn {
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 7px 0 20px;
  box-shadow: 0px 2px 10px 0px rgba(221, 231, 255, 0.4);
  border-radius: 13px;
  border: 1px solid #f7f7f7;
  & > span {
    font-size: 12px;
    margin-right: 18px;
  }
  .icon {
    transition: all 0.2s;

    &.active {
      transform: rotate(90deg);
    }
  }
}
</style>
