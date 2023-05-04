<script>
import { equalRatioFull, centerFull, none } from './resize';

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
      default: () => ({ width: 5760, height: 2070 }),
    },
  },
  watch: {
    'pageSize.height': {
      handler(newVal, oldVal) {
        console.log('newVal', newVal);
        console.log('oldVal', oldVal);
        this.init();
      },
      deep: true,
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const fitScreen = this.fitScreen.bind(this);
      fitScreen();
      window.addEventListener('resize', fitScreen);
      this.$once('hook:beforeDestroy', function () {
        window.removeEventListener('resize', fitScreen);
      });
    },
    fitScreen() {
      displayMap[this.displayType](this.pageSize);
    },
  },
  render() {
    return null;
  },
};
</script>
<style lang="scss">
html,
body {
  // overflow: hidden;
}
body {
  transform-origin: top left;
}
</style>
