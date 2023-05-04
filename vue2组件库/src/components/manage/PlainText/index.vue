<template>
  <span>{{ displayText }}</span>
</template>

<script>
import emitter from 'element-ui/lib/mixins/emitter.js';

export default {
  mixins: [emitter],
  props: {
    value: {
      type: [String, Number],
    },
    formatter: {
      type: Function,
      default: (v) => v,
    },
  },
  computed: {
    displayText: {
      set: function (val) {
        this.$emit('input', val);
        this.$emit('change', val);
      },
      get: function () {
        return this.formatter(this.value);
      },
    },
  },
  watch: {
    value(val) {
      this.dispatch('ElFormItem', 'el.form.change', [val]);
    },
  },
};
</script>
