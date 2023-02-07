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
      ref="input"
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
    <button @click="fucus">fucus</button>
    <br/>
    <button @click="fristLevel = (fristLevel + 1)%6">改变标题等级+1</button>
    <button @click="fristLevel = (fristLevel - 1)">改变标题等级-1</button>
    <a-title :level="fristLevel">
      <p :style="{color: 'red'}">{{fristLevel}}</p>
    </a-title>
    <a-title :level="2">What you name?</a-title>
    <a-title :level="3">My name is ZhangSenYun</a-title>
    <a-title :level="4">Are you?</a-title>
    <a-title :level="5">I'am no name.</a-title>
    <list :items="personInfo.like"></list>
    <list></list>
    <render-input v-model="renderValue"></render-input>
    <div class="lang-box" @scroll.passive="onScroll">
      <div class="box"></div>
    </div>
    <top-a-title/>

  </div>
</template>

<script>
import List from './components/Render/List';
import RenderInput from './components/Render/RenderInput';
import TopATitle from './components/Render/TopATitle';
export default {
  name: 'App',
  components: {TopATitle, RenderInput, List},
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
      fristLevel: 1,
      renderValue: 222,
    }
  },
  provide() {
    return {
      sing: this.sing,
    }
  },
  watch:{
    'inputValue': function (val) {
      console.log(val)
    }
  },
  mounted() {
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
    },
    fucus() {
      this.$refs.input.focus();
    },
    sing() {
      console.log('我开始唱歌了！！！');
    },
    onScroll() {
      console.log('scroll');
    }
  }
}
</script>

<style>
.lang-box {
  width: 100px;
  height: 100px;
  background-color: pink;
  overflow: scroll;

}
.box {
  width: 40px;
  height: 300px;
  background-color: red;
}
</style>
