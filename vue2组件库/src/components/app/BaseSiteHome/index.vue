<!-- 站点选择 -->
<template>
  <div class="site-module" @click.prevent.stop="goPageSite">
    <div class="con" :style="{ color: props.color }" :class="{ plain: props.plain }">
      <van-icon name="location" :color="props.color" />
      {{ (activeSite && activeSite.areaName) || '请选择' }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const props = defineProps({
  color: {
    type: String,
    default: '#00b7a7',
  },
  plain: {
    type: Boolean,
    default: false,
  },
});

const store = useStore();
const router = useRouter();

const activeSite = computed(() => store.state.user.activeSite);

const goPageSite = () => {
  router.push({ name: 'HomeSiteSelect' });
};
</script>

<style lang="scss" scoped>
.site-module {
  display: flex;
  .con {
    background: #fff;
    height: 26px;
    padding: 0 9px 0 8px;
    line-height: 26px;
    box-shadow: 0px 2px 16px 0px rgba(96, 65, 38, 0.1);
    border-radius: 13px;
    font-size: 12px;
    font-weight: 500;
    color: #00b7a7;
  }
  .plain {
    // box-shadow: none;
    // background-color: transparent;
  }
}
</style>
