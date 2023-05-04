<template>
  <div class="page">
    我是首页
  </div>
</template>

<script>
// import defineReactive from './defineReactive';
// import Observer from './Observer';
import observe from './observe';
import './array';
import Watcher from './Watcher';
export default {
  name: 'home',
  mounted() {
    const obj = {
      a: {
        m: {
          n:55,
        }
      },
      b: 4,
      g: [1, 2,3,4,5],
    };
    // 创建observe函数，注意函数的名字没有r
    observe(obj);
    console.log(obj);
    console.log('sss');
    new Watcher(obj, 'a.m.n', (val) => {
      console.log('XXX', val)
    })
    obj.a.m.n = 88;
    obj.a.m.n = 435;
    // console.log(obj)
    // obj.g.splice(2, 0, [32, 12]);
    // console.log(obj.g);
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