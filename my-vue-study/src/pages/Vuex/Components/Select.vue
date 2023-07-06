<template>
 <select v-model.number="selectValue" @change="chengeOne" >
   <option value="1">1</option>
   <option value="2">2</option>
   <option value="3">3</option>
 </select>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: "Select",
  data() {
    return {
      selectValue: 1,
    }
  },
  methods:{
    ...mapMutations(['ADD_ONE']),
    chengeOne() {
      console.log('change');
      this.ADD_ONE(this.selectValue);
    }
  }
}
</script>

<style scoped>

</style>