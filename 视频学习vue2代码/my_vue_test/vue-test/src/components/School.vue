<template>
  <div class="school bg-pink">
    <div v-red @click="$emit('showOne', name)">学校名称{{name | mySlice}}</div>
    <div>学校位置{{address}}</div>
    <button @click="hello">说话</button><br/>
    <button @click="destroyComponent">销毁</button>
  </div>
</template>

<script>
import pubsub from 'pubsub-js';
export default {
  name: 'School',
  data() {
    return {
      name: '四川轻化工大学',
      address:'宜宾',
      pubId:undefined,
    }
  },
  mounted() {
    this.$bus.$on('sendNameMessage',this.getMessage);
    this.pubId = pubsub.subscribe('hello', (msgName, data) => {
      console.log('接收到消息', msgName, data);
    });
  },
  beforeDestroy() {
    // 组件销毁前解绑该组建绑定的事件，不占用总线上之前只用过的事件名
    this.$bus.$off('sendNameMessage');
    pubsub.unsubscribe(this.pubId);
  },

  methods: {
    getMessage(value) {
      console.log('dddd');
      console.log('获得消息',value);
    },
    destroyComponent() {
      this.$destroy();
    }
  },
}
</script>

<style lang="less" scoped>
.bg-pink {
  background-color: pink;
}
</style>