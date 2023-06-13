<template>
  <div class="student">
    <div class="" @click="sendNameMessage">姓名{{name}}</div>
    <div class="" >年龄{{age}}</div>
    <div class="" >数字{{number}}</div>
    <button @click="add">点我number++</button>
    <button @click="destroyCompnonet">销毁</button>
  </div>
</template>

<script>
import pubsub from 'pubsub-js';
export default {
  name: 'Student',
  data() {
    return {
      name: '张森云',
      age: 18,
      number: 0,
    }
  },
  methods: {
    add() {
      console.log('点击了增加');
      this.number++;
    },
    sendNameMessage() {
      // this.$bus.$emit('sendNameMessage', 666);
      pubsub.publish('hello', 999);
    },
    destroyCompnonet() {
      console.log('bye');
      this.$destroy();
    }
  }
}
</script>

<style scoped>

</style>