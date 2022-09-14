<template>
<div class="person-info">
  <div class="name">name: {{name}}</div>
  <div class="age">age: {{localAge}}
    <button @click="localAge++">+</button>
  </div>
  <div class="like" v-bind="$attrs">
    likes: <span v-for="(item, index) in like" :key="item" @click="$emit('removeLike', index)">{{item}} </span>
  <slot name="otherLike" :data="like"></slot>
  </div>
  <div class="content">
    <slot name="content" :row="like" :data="age"></slot>
    <div class="">
      <slot :data="name">这是后备内容</slot>
    </div>
  </div>

</div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'BasePersonInfo',
  props: {
    name: String,
    age: [Number, String],
    like: Array,
  },
  data() {
    return {
      localAge: this.age,
    }
  },
  mounted() {
    console.log(this)
  }

}
</script>

<style scoped>

</style>