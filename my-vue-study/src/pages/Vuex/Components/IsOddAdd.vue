<template>
<button @click="oddAdd">当前和为奇数再加</button>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
  name: "IsOddAdd",
  methods: {
    ...mapMutations(['IS_ODD_ADD']),
    oddAdd() {
      this.IS_ODD_ADD();
    }
  }
}
</script>

<style scoped>

</style>