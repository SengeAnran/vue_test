<template>
<div class="page">
  <h2>当前求和为： {{num}}</h2>
  <h2>其他模块的值：{{aValue}}</h2>
  <button @click="$store.commit('moduleA/ADD_A_VALUE', 5)">+aValue</button>
  <Select/>
  <AddAndRed/>
  <IsOddAdd/>
  <WaitAdd/>
</div>
</template>

<script>
import Select from './Components/Select';
import AddAndRed from './Components/AddAndRed';
import IsOddAdd from './Components/IsOddAdd';
import WaitAdd from './Components/WaitAdd';
import {mapGetters} from 'vuex';
export default {
  name: "index",
  components: {Select, AddAndRed, IsOddAdd,WaitAdd },
  computed: {
    // ...mapMutations.getters({'num'});\
    ...mapGetters({
      num: 'num',
      aValue: 'aValue',
    })
    // ...mapState({
    //   num:'num',
    //   aValue:state => state.moduleA.aValue,
    // })
    // num() {
    //   return this.$store.getters.num;
    //   // return 1;
    // },
    // aValue() {
    //   return this.$store.getters.aValue;
    //   // return 1;
    // }
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.page {
 button {
    margin-right: 5px;
  }
}
</style>