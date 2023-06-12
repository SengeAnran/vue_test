<template>
<div class="header">
  <input width="200" type="text" placeholder="请输入你的任务名称，按回车键确认" v-model.trim.lazy="value" @change="submit">
</div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      value: '',
    }
  },
  methods: {
    submit() {
      const obj = {
          id: undefined,
          name: this.value,
          complete: false,
      };
      this.$emit('addOne', obj);
      this.value = '';
    }
  }
}
</script>

<style scoped>

</style>