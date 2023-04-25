<template>
  <div class="page">
    我是首页
  </div>
</template>

<script>
// import defineReactive from './defineReactive';
// import Observer from './Observer';
import observe from './observe';
export default {
  name: 'home',
  mounted() {
    // const obj = {
    //   a: {
    //     m: {
    //       n: 5
    //     }
    //   },
    //   b: 4,
    // };
    // const obj2 = {
    //   a: {
    //     m: {
    //       n: 5
    //     }
    //   },
    //   b: 4,
    // };
    // const aimObj = {
    //   a: {
    //     m: {
    //       n: 5,
    //       __ob__: {},
    //     },
    //     __ob__: {},
    //   },
    //   b: 4,
    //   __ob__: {}
    // };
    // 创建observe函数，注意函数的名字没有r
    const arr = [1, 2,3,4,5];
    observe(arr);
    // observe(obj2);
    console.log('sss');
    arr.push(32)
    console.log(arr);
    // function defineReactive(obj, key, val) {
    //   // 生成闭包 val的中间变量
    //   Object.defineProperty(obj,key, {
    //     enumerable: true, /* 是否可以被枚举*/
    //     configurable: true,/*可被配置*/
    //     get() {
    //       return val;
    //     },
    //     set(v) {
    //       if (v=== val) {
    //         return;
    //       }
    //       val = v;
    //     }
    //   });
    // }
    // defineReactive(obj,'a', 2);
    // console.log(obj.a);
    // obj.a = 5;
    // console.log(obj.a);
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