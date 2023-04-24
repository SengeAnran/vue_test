<template>
  <div class="page">
    我是首页
  </div>
</template>

<script>
export default {
  name: 'home',
  mounted() {
    const obj = {};
    function defineReactive(obj, key, val) {
      // 生成闭包 val的中间变量
      Object.defineProperty(obj,key, {
        enumerable: true, /* 是否可以被枚举*/
        configurable: true,
        get() {
          return val;
        },
        set(v) {
          if (v=== val) return;
          val = v;
        }
      });
    }
    defineReactive(obj,'a', 2);
    console.log(obj.a);
    obj.a = 5;
    console.log(obj.a);
    // Object.defineProperty(obj,'c', {
    //   value: 3,
    //   // writable: true, // 是否可被修改
    //   enumerable: true, /* 是否可以被枚举*/
    // });
    // Object.defineProperty(obj,'b', {
    //   value: 4,
    //   // writable: true,
    // });
    // for (const objKey in obj) {
    //   console.log(objKey);
    // }
  }

}
</script>

<style scoped>

</style>