<template>
  <ul>
    <li v-for="(child, index ) in children" :key="child.name + index">
      <tree-folder v-if="child.children" :folder="child"/>
      <span v-else>{{child.name}}</span>
    </li>
  </ul>
</template>

<script>
// import TreeFolder from './index';
export default {
  name: "TreeFolderContents",
  components: {
    // bi
    TreeFolder: () => import('./index'),
    // TreeFolder,
  },
  beforeCreate() {
  },
  props: {
    children: {
      type: Array,
      default: () => {},
    }
  }
}
</script>

<style scoped>

</style>