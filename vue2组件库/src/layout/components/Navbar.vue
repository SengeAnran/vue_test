<template>
  <div class="navbar">
    <div class="nav-main">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";

export default {
  components: {
    Breadcrumb,
  },
  computed: {
    ...mapState("app", ["sidebar"]),
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #f7f7f7;
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .nav-main {
    padding-top: 10px;
    overflow: hidden;
    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
  }
  .nav-name {
    padding-left: 58px;
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    color: rgba(38, 38, 38, 0.85);
    line-height: 1;
  }
}
</style>
