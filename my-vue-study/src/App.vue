<template>
  <div id="app">
    <base-title v-bind.sync="obj"></base-title>
<!--    <base-title-->
<!--      :title="title2"-->
<!--      v-on:update:title="title2 = $event"-->
<!--    ></base-title>-->

    <base-person-info
      v-bind="personInfo"
      :title="2334"
      @removeLike="removeLike"
    >
      <template v-slot="{data}">
       sss {{data}}
      </template>
      <template #content="scope">{{chengeScope(scope)}}内容内容</template>
      <template v-slot:otherLike>其他爱好</template>
    </base-person-info>
    <base-input
      v-on:focus="onFocus"
      v-model="inputValue"
      label="发士大夫"
      :title="1323"
    ></base-input>
    <base-input
      v-on:focus="onFocus"
      :value="inputValue2"
      @input="inputValue2 = $event"
      label="发士大夫"
      :title="1323"
    ></base-input>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      obj: {
        title: '我是标题',
        smallTitle: '我是副标题',
      },
      title: '我是标题',
      title2: '我是标题',
      personInfo: {
        name: '张森云',
        age: '26',
        like: ['电影', '美食', '旅游'],
      },
      inputValue: '',
      inputValue2: '',
    }
  },
  watch:{
    'inputValue': function (val) {
      console.log(val)
    }
  },
  methods: {
    removeLike(index) {
      console.log('removeLikeIndex:' + index);
    },
    onFocus(val) {
      console.log(val);
    },
    chengeScope(scope) {
      console.log(scope);
      return scope.row[1];
    }
  }
}
</script>

<style>
</style>
