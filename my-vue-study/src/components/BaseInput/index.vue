<template>
  <label>
    {{label}}：
    <input
      ref="input"
      type="text"
      v-bind="$attrs"
      :value="value"
      v-on="inputListeners"
    >
  </label>
</template>

<script>
// import Pikaday from 'pikaday';
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
  inject:['sing'],
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
    // this.sing();
    // const picker = new Pikaday({
    //   field: this.$refs.input,
    //   format: 'YYYY-MM-DD'
    // })
    // console.log(this.inputListeners);
    // this.$once('hook:beforeDestroy', function () {
    //   picker.destroy();
    // })
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