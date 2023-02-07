<template>
  <p>
    <span>{{folder.name}}</span>
    <tree-folder-contents v-if="folder.children" :children="folder.children"/>
  </p>
</template>

<script>
// import TreeFolderContents from './TreeFolderContents';
export default {
  name: "TreeFolder",
  components: {
    TreeFolderContents: () => import('./TreeFolderContents'),
    // TreeFolderContents: () => import('./TreeFolderContents'),
  },
  props: {
    folder: {
      type: Object,
      default: () => {},
    }
  },
  beforeCreate() {
  }
}
</script>

<style scoped>

</style>