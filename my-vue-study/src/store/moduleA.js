export default  {
  namespaced: true, // 模块命名空间
  state: {
    aValue: 1,
  },
  mutations: {
    ADD_A_VALUE(state, value) {
      state.aValue = value;
    }
  }
}