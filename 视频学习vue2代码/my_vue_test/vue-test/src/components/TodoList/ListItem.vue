<template>
<div class="item-list">
  <input type="checkbox" :checked="objData.complete" @change="$emit('checkOne')">
  <span>{{objData.name}}</span>
  <button @click="$emit('deleteOne')">删除</button>
</div>
</template>

<script>
export default {
  name: "ItemList",
  props: {
    objData: {
      type: Object,
      default: () => {
        return {
          id: undefined,
          name: this.value,
          complete: false,
        }
      }
    }
  }
}
</script>

<style scoped>

</style>