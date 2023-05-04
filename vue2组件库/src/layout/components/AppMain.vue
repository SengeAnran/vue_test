<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!--      <keep-alive>-->
      <router-view class="view" :key="key" v-if="isRouterAlive" />
      <!--      </keep-alive>-->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      isRouterAlive: true,
    };
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  computed: {
    key() {
      return this.$route.path;
    },
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style lang="scss">
.block {
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
}
</style>

<style lang="scss" scoped>
.app-main {
  /* 80= navbar header 72  152  */
  min-height: calc(100vh - 202px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f7f7f7;
  padding: 15px;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
