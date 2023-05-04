<!--地区联选-->
<template>
  <el-cascader
    v-model="cascaderValue"
    style="max-width: 240px"
    :props="villageProps"
    @change="onChange"
    :placeholder="placeholder"
  ></el-cascader>
</template>
<script>
import store from '@/store';
import { getSonAreas } from '@/api2/common';

export default {
  props: {
    value: {
      type: [Array, String],
    }, // 用于重置
    checkStrictly: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '全部',
    },
  },
  data() {
    return {
      cascaderValue: [],
      villageProps: {
        lazy: true,
        checkStrictly: this.checkStrictly, // 单次可选
        lazyLoad: (node, resolve) => this.villageLazyLoad(node, resolve), // lazyload来设置加载数据源的方法
        //node为当前点击的节点，resolve为数据加载完成的回调(必须调用)
      },
    };
  },
  watch: {
    value(newVal) {
      if (newVal === '') {
        this.cascaderValue = [];
        return;
      }
      this.cascaderValue = newVal;
    },
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo || {};
    },
  },
  methods: {
    onChange(val) {
      const chooseAreaId = val[val.length - 1];
      this.$emit('change', chooseAreaId);
    },
    villageLazyLoad(node, resolve) {
      const { areaId, areaName } = store.getters.userInfo;
      const value = { areaId, areaName };
      if (node.level === 0) {
        // 第一层
        resolve([{ label: areaName, value: value }]);
        return;
      }
      getSonAreas({ areaId: node.value.areaId }).then((res) => {
        const nodes = res.map((c) => {
          const value = {
            areaId: c.areaId,
            areaName: c.areaName,
          };
          return {
            label: c.areaName,
            value: value,
            leaf: c.level === 3 || c.level === '3',
          };
        });
        resolve(nodes);
      });
    },
  },
};
</script>
