<template>
  <div class="swiper-container">
    <div :class="defaultSwiperClasses.wrapperClass">
      <slot></slot>
    </div>
    <div v-if="pagination" class="swiper-pagination"></div>
  </div>
</template>
<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
export default {
  name: 'Swiper',
  props: {
    options: {
      type: Object,
      default() {
        return {
          autoplay: 3500,
        };
      },
    },
    pagination: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      swiper: null,
      defaultSwiperClasses: {
        wrapperClass: 'swiper-wrapper',
      },
    };
  },
  mounted() {
    this.$nextTick(this.mount);
  },
  methods: {
    mount() {
      if (!this.swiper) {
        let setClassName = false;
        for (const className in this.defaultSwiperClasses) {
          // if (this.defaultSwiperClasses.hasOwnProperty(className)) {
          if (this.options[className]) {
            setClassName = true;
            this.defaultSwiperClasses[className] = this.options[className];
          }
          // }
        }
        const mountInstance = () => {
          this.swiper = new Swiper(this.$el, this.options);
        };
        setClassName ? this.$nextTick(mountInstance) : mountInstance();
      }
    },
  },
  updated() {
    if (this.swiper) {
      this.swiper.destroy();
      delete this.swiper;
      this.mount();
    }
  },
  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy();
      delete this.swiper;
    }
  },
};
</script>
