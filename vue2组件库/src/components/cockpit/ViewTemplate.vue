<!--视图模板-->
<template>
  <div class="view">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    /**
      * @desc 定时器间隔时间
      */
    interval: {
      default: 0,
      type: Number,
    },
  },
  computed: {
    /**
      * @desc 定时器监听
      */
    intervalState() {
      return this.$store.state.interval;
    },
  },
  watch: {
    /**
      * @desc  定时器触发器 当设定 props.interval 即触发
      */
    intervalState() {
      if (this.interval) {
        if (!(this.intervalState % this.interval)) {
          this.$emit('interval');
        }
      }
    },
  },
};
</script>
