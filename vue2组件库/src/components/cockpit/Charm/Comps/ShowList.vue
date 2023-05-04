<template>
  <div class="wrapper-showList" :style="'width:' + width">
    <div v-for="(item, index) in dataList" class="wrapper" :key="index">
      <div class="item item-left">
        <img :src="item.img" alt="" />
        <p>{{ item.name }}</p>
      </div>
      <div class="item item-right">
        <div>
          <span>{{ item.count }}</span>
          <span>{{ item.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dataList: {
      type: Array,
      require: true,
    },
    width: {
      type: String,
      default: '37.8rem',
    },
  },
};
</script>
<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
.wrapper-showList {
  padding: 1.2rem;
  background: linear-gradient(90deg, rgba(22, 40, 47, 0.8), rgba(16, 31, 37, 0.24));
  .wrapper {
    display: flex;
    border: 0.1px solid rgba(168, 247, 237, 0.2);
    height: 13.1rem;
    border-radius: 1rem;
    &:nth-last-child(1) {
      margin-top: 2.4rem;
    }
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .item-left {
      flex-flow: column;
      margin-left: 4.1rem;
      img {
        width: 4.8rem;
      }
      p {
        font-size: 2.4rem;
        margin-top: 1.3rem;
      }
    }
    .item-right {
      margin-left: 4.9rem;
      div {
        display: table-cell;
        vertical-align: bottom;
        span {
          font-size: 4.8rem;
          font-weight: 600;
          &:nth-child(2) {
            font-size: 2.4rem;
            margin-left: 1rem;
          }
        }
      }
    }
  }
}
</style>
