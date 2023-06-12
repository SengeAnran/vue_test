<template>
<div class="footer">
  <input type="checkbox" v-model="allCheck">
  <span>已完成{{completeNumber}}/全部{{allNumber}}</span>
  <button v-if="completeNumber" @click="$emit('clearComplete')">清除已完成</button>
</div>
</template>

<script>
export default {
  props: {
    allNumber: Number,
    completeNumber: Number,
  },
  name: "Footer",
  data() {
    return {
      // allCheck: false,
    }
  },
  computed: {
    allCheck: {
      set(value) {
        this.$emit('changeAll', value);
      },
      get() {
        return this.allNumber === this.completeNumber;
      }
    }
  },
  methods: {
    change() {
      console.log('change', this.allCheck);
      this.$emit('allCheck', this.allCheck);
    }
  },

}
</script>

<style scoped>

</style>