<template>
<span>
  <button @click="addOne">+</button>
  <button @click="reduceOne">-</button>
</span>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: "AddAndRed",
  data() {
    return {

    }
  },
  methods: {
    ...mapMutations(['ADD_ONE', 'REDUCE_ONE']),
    addOne() {
      this.ADD_ONE();
    },
    reduceOne() {
      this.REDUCE_ONE();
    }
  }
}
</script>

<style scoped>

</style>