<script>
import { equalRatioFull, centerFull, none } from '@/utils/resizeScreen';

const displayMap = {
  centerFull,
  equalRatioFull,
  none,
};

export default {
  props: {
    displayType: {
      validator: function (value) {
        return Object.keys(displayMap).indexOf(value) !== -1;
      },
      default: 'centerFull',
    },
    pageSize: {
      type: Object,
      default: () => ({
        width: 1920,
        height: 1080,
      }),
    },
  },
  mounted() {
    const fitScreen = this.fitScreen.bind(this); // 将当前组件内容绑定到fitScreen方法中并付给fitScreen
    fitScreen(); // 调用fitScreen方法
    window.addEventListener('resize', fitScreen); // 监听window当发生resize事件时调用fitScreen方法
    this.$once('hook:beforeDestroy', function () {
      window.removeEventListener('resize', fitScreen); // 在组件摧毁前注销监听事件
    });
  },
  methods: {
    fitScreen() {
      displayMap[this.displayType](this.pageSize); // 调用指定覆盖函数
    },
  },
  render() {
    return null;
  },
};
</script>
<style lang="scss">
html, body {
  overflow: hidden;
}
body {
  transform-origin: top left; // 变形起点为左上方
}
</style>
