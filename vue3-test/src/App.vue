<template>
<!--  vue3组件中的模版可以没有根标签-->
  <h1>我是组件</h1>
</template>

<script>

export default {
  name: 'App',
  //数据、方法等等，均要配置在setup中
  setup() {
  //   数据
    let name = '张三';
    let  age = 18;
  //  方法
    function sayHello() {
      alert(`我叫${name}，我${age}岁了， 你好啊！`)

    }

  }
}
</script>

<style>
</style>
