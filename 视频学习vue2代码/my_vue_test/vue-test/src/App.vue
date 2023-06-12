<template>
  <div id="app">
    <School ref="school" @showOne=show ></School>
    <Student></Student>
  </div>
</template>

<script>
import School from './components/School';
import Student from './components/Student';
export default {
  name: 'App',
  components: {
    Student,
    School,
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
