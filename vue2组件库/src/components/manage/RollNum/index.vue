<!--滚动数字-->
<template>
  <span class="count-up">
    <span class="num-1">{{ placeholder }}</span>
    <span class="num-2" ref="roll_num"></span>
  </span>
</template>
<script>
import * as d3 from 'd3';

const diffNumReg = /(\d+)(?:\.(\d+))?/; // 区别整数/小数
const splitNumReg = /(\d)(?=(\d{4})+$)/g; // 分割位数

export default {
  name: 'RollNum',
  props: {
    num: {
      type: Number,
      default: 0,
    },
    fixed: {
      type: [Number, String],
      default: 'auto',
    },
  },
  mounted() {
    this.initRollNum();
    this.update(this.num);
  },
  computed: {
    // 防抖动
    placeholder() {
      const numLe = this.num.toString().length;
      let p = '';
      for (let i = 0; i < numLe; i++) {
        p += '9';
      }
      return p;
    },
  },
  methods: {
    initRollNum() {
      this.container = d3.select(this.$refs.roll_num);
    },
    getFixed(newValue) {
      let res;
      if (this.fixed !== 'auto') {
        return Number(this.fixed);
      }
      res = newValue === Math.floor(newValue) ? 0 : newValue.toString().split('.')[1].length;
      return res;
    },
    update(newValue, oldVal) {
      const fixedBit = this.getFixed(newValue);
      this.container
        .datum({ value: oldVal || 0 })
        .transition()
        .duration(2000)
        .tween('d', (d) => {
          const i = d3.interpolate(d.value, newValue); // 取插值
          return (t) => {
            const num = i(t).toFixed(fixedBit);
            const int = num.replace(diffNumReg, '$1').replace(splitNumReg, '$1,');
            const bit = num.replace(diffNumReg, '$2');

            this.container.text(`${int}${bit ? '.' + bit : ''}`);
          };
        });
    },
  },
  watch: {
    num(val, oldVal) {
      if (typeof val === 'number') {
        this.update(val, oldVal);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.count-up {
  position: relative;
  font-family: 'DIN Alternate';
  // display: flex;
  // align-items: center;
  .num-1 {
    display: none;
  }

  .num-2 {
    // position: absolute;
    // left: 0;
  }
}
</style>
