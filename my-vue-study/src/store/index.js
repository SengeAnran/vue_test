import Vuex from 'vuex';
import Vue from 'vue'
import moduleA from './moduleA';
Vue.use(Vuex);
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'product',
  state: {
    num: 0,
  },
  mutations:{
    ADD_ONE(state, value = 1) {
      state.num += value;
    },
    REDUCE_ONE(state, value = 1) {
      state.num -= value;
    },
    IS_ODD_ADD(state) {
      state.num%2 === 1? state.num +=1: ''
    }
  },
  getters: {
    num: state => state.num,
    aValue: state => state.moduleA.aValue,
  },
  actions: {
    jia:(context) => {
      console.log(context);
        return new Promise((res) => {
          setTimeout(() => {
            context.commit('ADD_ONE');
            res(context.state.num)
          },1000)
        })
    }
  },
  modules: {
    moduleA: moduleA,
  }
})
export  default store;