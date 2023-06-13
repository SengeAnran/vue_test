<template>
<div class="list">
  <transition-group
    name="animate__animated animate__bounce"
    enter-active-class="animate__backInRight"
    leave-active-class="animate__backOutDown"
  >
    <ListItem
      v-for="(item, index) in dataList"
      :key="item.name"
      :objData="{...item, index}"
    ></ListItem>
  </transition-group>

</div>
</template>

<script>
import 'animate.css';
import ListItem from './ListItem'
export default {
  name: "List",
  props: {
    dataList: Array,
  },
  components: {
    ListItem,
  }
}
</script>

<style scoped>

</style>