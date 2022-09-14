<template>
  <div id="app">
    <base-title title="我是标题"></base-title>
    <base-person-info v-bind="personInfo" :title="2334" @removeLike="removeLike"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    // BasePersonInfo
    // BasePersonInfo
    // BaseTitle
  },
  data() {
    return {
      personInfo: {
        name: '张森云',
        age: '26',
        like: ['电影', '美食', '旅游'],
      }
    }
  },
  watch:{
    'personInfo.age': function (val) {
      console.log(val)
    }
  },
  methods: {
    removeLike(index) {
      console.log('removeLikeIndex:' + index);
    }
  }

}
</script>

<style>
</style>
