<!-- index -->
<template>
  <tabbar :fixed="false" route>
    <tabbar-item v-for="item in routeList" :to="item.path" :key="item.name" :badge="item.news" replace>
      <span>{{ item.name }}</span>
      <template #icon="props">
        <img :src="props.active ? item.activeIcon : item.inactiveIcon" />
      </template>
    </tabbar-item>
  </tabbar>
</template>

<script setup>
import { Tabbar, TabbarItem } from 'vant';
defineProps({
  routeList: { type: Array, required: true },
});
</script>
