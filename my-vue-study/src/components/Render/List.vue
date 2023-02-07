<script>
//<ul v-if="items.length">
// <li v-for="item in items">{{ item.name }}</li>
// </ul>
// <p v-else>No items found.</p>
export default {
  name: 'List',
  props: {
    items: {
      type: Array,
      default: () => [],
    }
  },
  render: function (createElement) {
    if (this.items.length) {
      return createElement('ul',{ class: 'my-ul'}, this.items.map(i => {
        return createElement('li',{attrs: { name: i}}, i);
      } ))
    } else {
      return createElement('p', 'No items found');
    }
  }
}
</script>

<style scoped>
.my-ul {
  color: red;
}
</style>