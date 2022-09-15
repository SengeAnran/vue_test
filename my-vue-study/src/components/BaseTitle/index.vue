<template>
 <div class="title">
   <h4>{{title}}</h4>
   <h6>{{smallTitle}}</h6>
   <button @click="$emit('update:title', '儿子的标题')">改变为'儿子的标题'</button>
   <button @click="$emit('update:smallTitle', '儿子的副标题')">副标题改变为'儿子的副标题'</button>
 </div>

</template>

<script>
export default {
  name: 'BaseTitle',
  props: {
    title: String,
    smallTitle: String,
  },
  inject: ['sing'],
  mounted() {
    this.sing();
    console.log(111);
    // console.log(this.$root.$children[0]);
  }
}
</script>

<style scoped>
.title {
  font-size: 24px;
}
</style>