<template>
  <div id="app">
    <School ref="school" @showOne=show ></School>
    <School ref="school" @showOne=show ></School>
    <Student></Student>
    <TodoList></TodoList>
    <StyleTranstion></StyleTranstion>
    <StyleTranstion2></StyleTranstion2>
    <StyleTranstion3></StyleTranstion3>
  </div>
</template>

<script>
import School from './components/School';
import Student from './components/Student';
import TodoList from './components/TodoList/index'
import StyleTranstion from './components/Transition/StyleTranstion'
import StyleTranstion2 from './components/Transition/StyleTranstion2'
import StyleTranstion3 from './components/Transition/StyleTranstion3'
export default {
  name: 'App',
  components: {
    Student,
    School,
    TodoList,
    StyleTranstion,
    StyleTranstion2,
    StyleTranstion3,
  },
  mounted() {
    this.init();
  },
  methods: {
    show(value) {
      console.log(value);
    },
    init() {
      // 灵活性更强
      setTimeout(() => {
        // this.$refs.school.$on('showOne', this.show);
        this.$refs.school.$once('showOne', this.show);
      },3000);

    }
  }
}
</script>

<style>
</style>
