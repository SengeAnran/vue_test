
<!--  -->
<template>
  <div class="">
    <div v-if="false" class="Digital_line" :style="config.Font">
      <!-- 一条线模式 -->
      <div>
        <span>
          <i class="iconfont" :class="icon" :style="config.icon"></i>
        </span>
        <span :style="config.name">{{ data.name }}</span>
        <span :style="config.suffix">{{ data.suffix }}</span>
      </div>
      <div>
        <span :style="config.content">{{ displayValue }}</span>
        <span :style="config.unit">{{ data.unit }}</span>
      </div>
    </div>
    <div>
      <!-- 上下模式 -->
      <div class="Digital_squre" :style="config.Font">
        <div>
          <span>
            <i class="iconfont" :class="icon" :style="config.icon"></i>
          </span>
          <span :style="config.name">{{ data.name }}</span>
        </div>
        <div>
          <span :style="config.suffix">{{ data.suffix }}</span>
          <span :style="config.content">{{ displayValue }}</span>
          <span :style="config.unit">{{ data.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { requestAnimationFrame, cancelAnimationFrame } from './digital/requestAnimationFrame.js';

export default {
  props: {
    // 数据
    data: {
      type: Object,
      default: () => {},
    },
    // 起始值
    startNum: {
      // 数据类型
      type: [Number, String],
      // 默认起始值
      default: 0,
      // 是否必须传入
      required: false,
    },
    // 结束值
    endNum: {
      // 数据类型
      type: [Number, String],
      // 默认起始值
      default: '100',
      // 是否必须传入
      required: false,
    },
    // 图标
    icon: {
      type: String,
      default: 'default',
    },
    // 绑定config 样式
    config: {
      type: Object,
      default: () => {
        const Obj = {
          // 关于icon的一些配置
          icon: {
            fontSize: 19 + 'px',
            color: '#EAE30A',
          },
          // 关于标题的相关配置
          name: {
            fontSize: 20 + 'px',
          },
          // 符号(包括美元，￥ $)
          suffix: {
            color: '#EAE30A',
          },
          // 对应数字部分的配置
          content: {
            fontSize: 20 + 'px',
          },
          // 对于单位的配置
          unit: {
            fontSize: 10 + 'px',
            marginLeft: 5 + 'px',
          },
          Font: {
            textAlign: 'center',
          },
        };
        return Obj;
      },
      // 是否必须传入
      required: false,
    },
    // 完成这个动画需要的时间
    animation: {
      // 数据类型
      type: [Number, String],
      // 默认起始值
      default: 2000,
      // 是否必须传入
      required: false,
    },
    // 配置类
    loop: {
      type: Object,
      // 是否必须传入
      required: false,
      default: () => {
        const Obj = {
          // 是否开启数值循环
          loop1: true,
          // 多久循环一次
          time: 3000,
          // 循环几次
          count: 10,
          // 是否开启四舍五入 类型(0是不做什么取值操作,1去掉小数部分,2.向上取整,3.下取整,4.四舍五入)
          round: 4,
          // 精确的小数位数
          decimals: 2,
          // 分割小数
          decimal: '.',
          // 整数 分割器
          separator: ',',
        };
        return Obj;
      },
    },
    autoplay: {
      type: Boolean,
      required: false,
      default: true,
    },
    // 是否使用缓动功能
    useEasing: {
      type: Boolean,
      required: false,
      default: false,
    },
    // 缓动函数
    easingFn: {
      type: Function,
      default(t, b, c, d) {
        return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
      },
    },
  },
  components: {},
  data() {
    return {
      // 开始时间
      startTime: null,
      // 是否暂停
      paused: false,
      rAF: null,
      timestamp: null,
      remaining: null,
      printVal: null,
      displayValue: this.formatNumber(this.startNum),
      time1: null,
    };
  },
  computed: {
    /**
     * 描述 判断开始值是否大于结束值
     * @date 2021-08-17
     * @returns {any}
     */
    countDown() {
      return parseFloat(this.startNum) > parseFloat(this.endNum);
    },
  },
  watch: {
    /**
     * 描述
     * @date 2021-08-17
     * @returns {any}
     */
    startNum() {
      if (this.autoplay) {
        this.DigitalStartFun();
      }
    },
    /**
     * 描述
     * @date 2021-08-17
     * @returns {any}
     */
    endNum() {
      if (this.autoplay) {
        this.DigitalStartFun();
      }
    },
  },
  methods: {
    /**
     * 描述 这是开始函数
     * @date 2021-08-17
     * @returns {any}
     */
    DigitalStartFun() {
      // 开始的时间锉
      this.startTime = null;
      // 是否暂停
      this.paused = false;
      // 调用请求动画帧数函数
      this.rAF = requestAnimationFrame(this.DigitalCount);
    },

    /**
     * 描述
     * @date 2021-08-17
     * @param {any} timestamp 时间锉
     * @returns {any}
     */
    DigitalCount(timestamp) {
      // 如果开始的时间没有 侧赋值开始的时间戳
      if (!this.startTime) this.startTime = timestamp;
      // 记录当前的事件戳
      this.timestamp = timestamp;
      // 记录下已经过去多少时间了（时间cuo）
      const progress = timestamp - this.startTime;
      // 多少毫秒跑完这个帧数
      this.remaining = this.animation - progress;
      if (this.useEasing) {
        // 判断数值是否跑到位
        if (this.countDown) {
          // 开始时间 - 缓动函数的时间
          this.printVal =
            parseFloat(this.startNum) -
            this.easingFn(progress, 0, parseFloat(this.startNum) - parseFloat(this.endNum), this.animation);
        } else {
          this.printVal = this.easingFn(
            progress,
            parseFloat(this.startNum),
            parseFloat(this.endNum) - parseFloat(this.startNum),
            this.animation,
          );
        }
      } else {
        if (this.countDown) {
          this.printVal =
            parseFloat(this.startNum) -
            (parseFloat(this.startNum) - parseFloat(this.endNum)) * (progress / this.animation);
        } else {
          this.printVal =
            parseFloat(this.startNum) +
            (parseFloat(this.endNum) - parseFloat(this.startNum)) * (progress / this.animation);
        }
      }
      if (this.countDown) {
        this.printVal = this.printVal < parseFloat(this.endNum) ? parseFloat(this.endNum) : this.printVal;
      } else {
        this.printVal = this.printVal > parseFloat(this.endNum) ? parseFloat(this.endNum) : this.printVal;
      }
      this.displayValue = this.formatNumber(this.printVal);
      if (progress < this.animation) {
        this.rAF = requestAnimationFrame(this.DigitalCount);
      } else {
        // cancelAnimationFrame(this.rAF)
        this.$emit('callback');
      }
    },
    /**
     * 描述
     * @date 2021-08-17
     * @param {any} val
     * @returns {any}
     */
    isNumber(val) {
      return !isNaN(parseFloat(val));
    },
    /**
     * 描述
     * @date 2021-08-17
     * @param {any} num
     * @returns {any}
     */
    formatNumber(num) {
      // 精确到小数带你后面几位
      num = num.toFixed(this.loop.decimals);
      // 转换为字符串
      num += '';
      // 分割
      const x = num.split('.');
      let x1 = x[0];
      const x2 = x.length > 1 ? this.loop.decimal + x[1] : '';
      const rgx = /(\d+)(\d{3})/;
      if (this.loop.separator && !this.isNumber(this.loop.separator)) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + this.loop.separator + '$2');
        }
      }
      return x1 + x2;
    },
  },
  created() {},
  mounted() {
    this.DigitalStartFun();
    if (this.loop.loop1) {
      this.time1 = setInterval(() => {
        this.DigitalStartFun();
      }, this.loop.time);
    }
  },
  destroyed() {
    cancelAnimationFrame(this.rAF);
    clearInterval(this.time1);
  },
};
</script>
<style  scoped>
.Digital_line {
  display: flex;
  background-color: transparent;
  color: #3de7c9;
  /* margin-top: ; */
}
.Digital_squre {
  background-color: transparent;
  color: #3de7c9;
  /* text-align: center; */
}
</style>
