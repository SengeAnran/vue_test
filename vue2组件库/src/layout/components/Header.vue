<template>
  <div class="header-wrp">
    <h2 class="title" @click="goHome">{{ systemTitle }}</h2>
    <div class="right-menu">
      <!--      <span class="go-home" @click="$router.push('/home')">-->
      <span class="go-home" @click="goHome">
        <img src="@/assets/imgs/go_home.png" alt="" />
      </span>
      <Notify style="margin-right: 20px" />
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="require('@/assets/imgs/avatar.svg')" />
          <span class="user-name">{{ userInfo.userNickname }}</span>
        </div>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="handleLogout"> 退出登录</el-dropdown-item>
          <el-dropdown-item @click.native="handleUnbind" v-show="zzdName"> 解除绑定 </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import Notify from '@/components/Notify';
import { mapGetters, mapActions } from 'vuex';
import { getLoginType } from '@/utils/auth';
import { unBind } from '@/api/user';
import { handleLoginOut, backHomeUrl } from '@/utils/auth';
// import config from '@/utils/config';

export default {
  name: 'Header',
  components: { Notify },
  computed: {
    ...mapGetters(['userInfo', 'systemTitle']),
    zzdName() {
      console.log(this.userInfo);
      return this.userInfo.zzdName;
    },
  },
  mounted() {
    // this.initTitle();
  },
  methods: {
    ...mapActions('user', ['logout']),
    handleLogout() {
      const loginType = getLoginType();
      const params = {
        loginType: loginType === 'in' ? 'in' : 'ext',
      };
      console.log(params);
      this.logout(params);
    },
    handleUnbind() {
      this.$confirm(`确认将当前账户与浙政钉用户【${this.zzdName}】解绑?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.unBind();
        })
        .catch(() => {});
    },
    unBind() {
      const { userId } = this.$store.getters.userInfo;
      if (!userId) return;
      unBind({ userId }).then(() => {
        handleLoginOut();
        this.$message.success('解绑成功!');
      });
    },
    goHome() {
      backHomeUrl();
      // this.$router.push('/home');
      // location.href = config.loginPath + 'home';
    },
    // initTitle() {
    //   if (localStorage.getItem('systemTitle')) {
    //     this.SET_SYSTEM_TYPE(localStorage.getItem('systemTitle'));
    //   }
    // },
  },
};
</script>
<style lang="scss" scoped>
.header-wrp {
  width: 100%;
  height: 72px;
  padding-left: 20px;
  background-color: $menuBg;
  box-shadow: 0px 1px 4px 0px #172439;
  position: fixed;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    height: 72px;
    line-height: 72px;
    font-size: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    color: #ffffff;
    cursor: pointer;
    user-select: none;
  }

  .right-menu {
    height: 100%;
    display: flex;
    align-items: center;

    .go-home {
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 42px;

      .avatar-wrapper {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;

        .user-avatar {
          max-width: unset;
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 100%;
          object-fit: cover;
          margin-right: 10px;
        }

        .user-name {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          color: #ffffff;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
