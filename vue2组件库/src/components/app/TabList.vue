<template>
  <van-tabs
    v-model="active"
    :line-width="lineWidth"
    :color="color"
    :title-active-color="color"
    @click="onClick"
    :background="background"
    v-if="data.length"
    :ellipsis="false"
    :style="`width:${data.length * 25}%;max-width: 100%;`"
    swipe-threshold="4"
  >
    <van-tab v-for="(item, index) in data" :key="index" :name="item.name" :title="item.title"> </van-tab>
  </van-tabs>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  props: {
    lineWidth: {
      type: [String, Number],
      default: 20,
    },
    color: {
      type: String,
      default: '#65d1b8',
    },
    data: {
      type: Array,
      default: () => [],
    },
    background: {
      type: String,
      default: 'transparent',
    },
    initActive: {
      // 初始化标签项
      type: String,
      default: '',
    },
  },
  data() {
    return {
      active: '',
    };
  },
  computed: {
    ...mapState('home', ['tabType']),
  },
  mounted() {
    this.active = this.tabType;
    if (this.initActive) {
      this.active = this.initActive;
    }
  },
  methods: {
    ...mapMutations('home', ['SET_Tab_TYPE']),
    onClick(value) {
      this.$emit('handleClick', value);
      this.SET_Tab_TYPE(value);
    },
  },
};
</script>

<style lang="less" scoped></style>
