<template>
<div class="person-info">
  <div class="name">name: {{data.name}}</div>
  <div class="age">age: {{data.age}}
    <button @click="data.age++">+</button>
  </div>
  <div class="like">
    likes: <span v-for="item in data.like" :key="item">{{item}} </span>
  </div>
</div>
</template>

<script>
export default {
  name: 'BasePersonInfo2',
  props: {
    data: Object,
  },
  data() {
    return {
      // localAge: this.age,
    }
  }

}
</script>

<style scoped>

</style>