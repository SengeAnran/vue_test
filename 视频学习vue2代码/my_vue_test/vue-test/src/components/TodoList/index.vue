<template>
  <div class="todo-list">
    <Header @addOne="addOne"/>
    <List :dataList="listData"/>
    <Footer :allNumber="allNumber" :completeNumber="completeNumber" @changeAll="changeAll" @clearComplete="clearComplete"/>
  </div>
</template>

<script>
import Header from './Header';
import List from './List';
import Footer from './Footer';
import {DELETEONE, CHECKONE, EDITONE} from '@/bus.js'
import {NEWVALUE} from '../../bus';
export default {
  name: "TodoList",
  components: {
    Footer,
    Header,
    List,
  },
  data() {
    return {
      listData: [
        {
          id: 1,
          name: '打代码',
          complete: false,
        },
        {
          id: 2,
          name: '睡觉',
          complete: false,
        },
        {
          id: 3,
          name: '吃饭',
          complete: false,
        },
      ],

    }
  },
  mounted() {
    this.initData();
    this.$bus.$on(DELETEONE,this.deleteOne);
    this.$bus.$on(CHECKONE,this.checkOne);
    this.$bus.$on(EDITONE,this.editOne);
    this.$bus.$on(NEWVALUE,this.newValue);
  },
  beforeDestroy() {
    // this.storeData();
    this.$bus.$off([DELETEONE, CHECKONE,EDITONE]);
  },
  computed: {
    allNumber() {
      return this.listData.length;
    },
    completeNumber() {
      return this.listData.filter(i => i.complete).length;
    },
  },
  watch: {
    listData: {
      handler:function () {
        this.storeData();
      },
      deep: true,
    }
  },
  methods: {
    initData() {
      this.listData = JSON.parse(localStorage.getItem('dataList')) || [];
    },
    storeData() {
      localStorage.setItem('dataList', JSON.stringify(this.listData))
    },
    addOne(data) {
      this.listData.unshift(data);
    },
    changeAll(value) {
      this.listData.forEach(i => {
        i.complete = value;
      });
    },
    deleteOne(index) {
      console.log('接收到删除消息', index);
      this.listData.splice(index, 1);
    },
    checkOne(index) {
      console.log('接收到选中消息', index);
      this.listData[index].complete = !this.listData[index].complete;
    },
    editOne(index) {
      console.log('接收到编辑消息', index);
      this.listData[index].isEdit =  true;
    },
    newValue(index, value) {
      console.log('接收到编辑消息', index, value);
      this.listData[index].name =  value;
      this.listData[index].isEdit =  false;
    },
    clearComplete() {
      this.listData = this.listData.filter(i => !i.complete);
    },
  }

}
</script>

<style scoped>

</style>