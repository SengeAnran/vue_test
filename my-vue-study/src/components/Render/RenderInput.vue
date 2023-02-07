
<script>
export default {
  name: 'RenderInput',
  props: ['value'],
  render: function (createElement) {
    const self = this;
    return createElement('input', {
      domProps: {
        value: self.value
      },
      on: {
        'input': function (event) {
          self.$emit('input', event.target.value);
        }
      }
    })
  }
}
</script>

<style scoped>

</style>