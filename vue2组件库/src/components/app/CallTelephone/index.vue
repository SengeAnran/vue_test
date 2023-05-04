<template>
  <div class="tel-wrp">
    <span class="text-type" v-if="type !== 'icon'">
      <span class="tel" :style="`color:${telColor || '#666666'}`" @click="telephone">{{ tel }}</span>
      <van-icon v-if="!hideLogo" class="icon" name="phone" @click="telephone" />
    </span>
    <span class="icon-type" v-if="type === 'icon'">
      <van-icon class="icon" name="phone" @click="telephone" />
    </span>
  </div>
</template>
<script>
export default {
  name: 'Telephone',
  props: {
    type: String,
    tel: [String, Number],
    hideLogo: {
      type: Boolean,
      default: false,
    },
    telColor: String,
  },
  methods: {
    // telephone() {
    //   if (!this.tel) return;
    //   const aDom = document.createElement("a");
    //   aDom.href = `tel:${this.tel}`;
    //   document.body.appendChild(aDom);
    //   aDom.click();
    //   document.body.removeChild(aDom);
    // },
    telephone() {
      if (!this.tel) return;
      ZWJSBridge.phoneCall({
        corpId: this.tel,
      })
        .then((result) => {
          console.log(result, 'phonecall');
        })
        .catch((error) => {
          console.log(error, 'phonecall err');
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.tel-wrp {
  display: inline-block;
  .text-type {
    .tel {
      font-size: 15px;
      font-weight: 400;
      color: #666666;
      line-height: 20px;
    }
    .icon {
      color: #1c6c74;
      font-size: 15px;
      transform: scale(-1) rotate(80deg);
      margin-left: 7px;
    }
  }
  .icon-type {
    width: 20px;
    height: 20px;
    background: #5d959a;
    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      font-size: 15px;
      color: #fff;
    }

    .aria-old-people & {
      width: 28px;
      height: 28px;
      .icon {
        font-size: 18px;
      }
    }
  }
}
</style>
