<template>
  <div class="box">
    <div class="popup">
      <div class="scroll">
        <div class="title" v-if="name">
          {{ name }}
        </div>
        <div class="desc" v-if="feature.properties.content">
          {{ feature.properties.content }}
<!--          <img src="@/assets/images/tuceng2.png" alt="">-->
        </div>
        <div class="img" v-if="feature.properties.picture">
          <img :src="'data:image/png;base64,'+ feature.properties.picture" alt="">
        </div>
        <div class="info" v-if="feature.properties.listData">
          <div class="content2 item" v-for="(item, index) in feature.properties.listData" :key="index">
            <span class="item-title">{{item.title}}： </span>
            <span>
              {{item.value}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    feature: {
      type: Object,
      default: () => ({}),
    },
    contentWidth: {
      type: String,
      default: '400px',
    },
    itemWidth: {
      type: String,
      default: '375px',
    },
  },
  data() {
    return { age: undefined };
  },
  computed: {
    name() {
      return this.feature?.properties?.name || '';
    },
  },
  // mounted() {
  //   console.log('mounted111', this.feature);
  // },
  // beforeDestroy() {
  //   console.log('beforeDestroy');
  // },
};
</script>
<style lang="scss" scoped>
.box{
  padding-top: 190px;
  .popup {
    background: rgba(6, 27, 44, 0.8);
    border: 2px solid #a5e0ff;
    color: #fff;
    font-size: 4rem;
    padding: 2rem 4rem;
    cursor: pointer;
    margin-bottom: 4rem;
    // border: 1px solid #00f;
    // height: 400px;
    width: max-content;
    overflow: auto;
    word-wrap: break-word;
    .scroll {
      overflow: auto;
      max-height: 50rem;
      .title {
        margin-top: 21px;
        margin-bottom: 25px;
        font-size: 34px;
        font-family: Source Han Sans SC;
        font-weight: bold;
        color: #77FFFF;
        //margin: 2rem 0;
      }
      .desc {
        width: 800px;
        font-size: 2.5rem;
        font-weight: 400;
        color: #FFFFFF;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
      .info {
        position: relative;
        z-index: 999;
        max-width: 800px;
        //padding: 10px 0;
        padding-bottom: 10px;
        //background: url('./img/info.png');
        box-sizing: border-box;
        word-wrap: break-word;
        font-size: 2.5rem;
        font-weight: 400;
        color: #FFFFFF;
        white-space: pre-wrap;
        > div {
          font-size: 24px;
          font-family: 'Source Han Sans SC';
          margin-top: 15px;
          //margin-left: 10px;
        }
        .content2 {
          //width: 375px;
          // border: 1px solid #00f;
          word-wrap: break-word;
          .item-title {
            //font-size: 30px;
            //font-family: Source Han Sans CN;
            //font-weight: 500;
            //color: #FFFFFF;
          };
        }
      }
    }
  }
}

//h3 {
//  font-size: 3.4rem;
//  color: #abfdfe;
//  margin: 2rem 0;
//  //margin-top: 0rem;
//}
</style>
