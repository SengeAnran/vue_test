<template>
  <div :class="classObj" class="app-wrapper">
    <Header v-if="!onlyShowDetail" />
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar v-if="!onlyShowDetail" class="sidebar-container" />
    <div class="main-container" :class="{ showDetail: onlyShowDetail }">
      <div :class="{ 'fixed-header': false }">
        <navbar v-if="!onlyShowDetail" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Header, AppMain, Navbar, Sidebar } from './components';
import ResizeMixin from './mixin/ResizeHandler';
import { mapGetters, mapState } from 'vuex';
import { alertPrompt } from '@/api2/common';
import role from '@/views2/mixins/role';

export default {
  name: 'Layout',
  components: {
    Header,
    AppMain,
    Navbar,
    Sidebar,
  },
  mounted() {
    this.alertPrompt();
  },
  mixins: [ResizeMixin, role],
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      onlyShowDetail: (state) => state.app.onlyShowDetail,
    }),
    ...mapGetters(['roleSystemType']),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      };
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false });
    },
    alertPrompt() {
      // 提示
      if (!this.VILLAGE && !this.COUNTRY && !this.COUNTRY_LEADER) {
        return;
      }
      if (this.roleSystemType !== 4) {
        return;
      }
      alertPrompt().then((res) => {
        if (res) {
          this.$notify({
            title: '提示',
            dangerouslyUseHTMLString: true,
            customClass: 'notice-body',
            message: `
              <div>
                <span>您本月的项目调度还未完成报送（审核），请及时完成。</span>
                <span style="color: #1492FF; float: right; cursor: pointer">前往</span>
               </div>`,
            duration: 0,
            type: 'warning',
            onClick: this.goDetail,
          });
        }
      });
    },
    goDetail() {
      this.$router.push({
        name: this.VILLAGE ? 'ProgressSubmissionList' : 'ProjectSchedulingList',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.notice-body {
  width: auto;
}
.showDetail {
  top: 0 !important;
  margin-left: 0 !important;
}
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
