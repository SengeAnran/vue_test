<template>
<div class="list">
  <ListItem
    v-for="(item, index) in dataList"
    :key="item.name"
    :objData="{...item, index}"
  ></ListItem>
</div>
</template>

<script>
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