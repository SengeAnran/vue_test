<template>
  <label>
    {{label}}：
    <input
      ref="input"
      v-bind="$attrs"
      :value="value"
      v-on="inputListeners"
    >
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  name: "BaseInput",
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: String,
    label: String,
  },
  computed: {
    inputListeners() {
      const vm = this;
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        this.$listeners,
        {
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  mounted() {

    console.log(this.inputListeners);
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    }
  }
}
</script>

<style scoped>

</style>