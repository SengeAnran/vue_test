<template>
<button @click="waitAdd">等一等再加</button>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: "WaitAdd",
  methods: {
    ...mapActions(['jia']),
    waitAdd() {
      this.jia().then(res=> {
        console.log(res);
      });
    }
  }
}
</script>

<style scoped>

</style>