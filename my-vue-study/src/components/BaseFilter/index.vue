<template>
  <div class="p">{{name | capitalize}}</div>
</template>

<script>
export default {
  name: 'BaseFilter',
  data() {
    return {
      name: 'zhang',
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
}
</script>

<style scoped>

</style>