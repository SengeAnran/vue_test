<template>
  <div class="todo-list">
    <Header @addOne="addOne"/>
    <List :dataList="listData" @deleteOne="deleteOne" @checkOne="checkOne"/>
    <Footer :allNumber="allNumber" :completeNumber="completeNumber" @changeAll="changeAll" @clearComplete="clearComplete"/>
  </div>
</template>

<script>
import Header from './Header';
import List from './List';
import Footer from './Footer';
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
  },
  // beforeDestroy() {
  //   this.storeData();
  // },
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
      this.listData.splice(index, 1);
    },
    checkOne(index) {
      this.listData[index].complete = !this.listData[index].complete;
    },
    clearComplete() {
      this.listData = this.listData.filter(i => !i.complete);
    },
  }

}
</script>

<style scoped>

</style>