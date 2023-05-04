<template>
  <div class="wrapper">
    <div class="name-style">
      {{name}}
    </div>
    <div class="contain-box">
      <div v-for="(item, index) in dataList"
      class="flex-item"
      :key="index">
        <div class="num-style">
          {{item.num}}
        </div>
        <!-- <div class="zhu" :style="'width:' + (item.num/sum * 100) + '%;'+'background:' + colorList[index].bgColor"></div>
        <div class="name-style" :style="'color: ' + colorList[index].fontColor">
          {{item.name}}
        </div> -->
      </div>
    </div>

    <div class="contain-box2" :style="'width:' + barStyle.width + '%;height:' + barStyle.height">
      <div v-for="(item, index) in dataList"
      class="flex-item"
      :style="'width:' + (item.num/sum * 100) + '%; background:' + colorList[index].bgColor"
      :key="index">
        <div class="zhu" ></div>
      </div>
    </div>

    <div class="contain-box">
      <div v-for="(item, index) in dataList"
      class="flex-item"
      :key="index">
        <div class="name-style" :style="'color: ' + colorList[index].fontColor">
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      default: '',
      type: String,
    },
    dataList: {
      type: Array,
    },
    barStyle: {
      type: Object,
      default: function () {
        return {
          width: '80rem',
          height: '3.17rem',
        };
      },
    },
  },
  data() {
    return {
      colorList: [
        { fontColor: 'rgba(174, 250, 254, 1)', bgColor: 'linear-gradient(-90deg, rgba(180, 250, 254, 0.02) 0%, rgba(180, 250, 254, 1), 100%)' },
        { fontColor: 'rgba(255,  167, 162, 1)', bgColor: 'linear-gradient(90deg, rgba(255, 167, 162, 1) 0%, rgba(255, 167, 162, .02) 100%);' },
      ],
    };
  },
  computed: {
    sum() {
      return this.dataList && this.dataList.length > 0 ? this.dataList.map((i) => i.num).reduce((temp, i) => { return temp + i; }) : 0;
    },
  },
};
</script>
<style scoped lang="scss">
.wrapper {
  width: 100%;
  padding: 3.4rem 0;
  .name-style {
    color: rgba(255, 255, 255, .8);
    font-size: 3.52rem;
    text-align: center;
  }
  .contain-box {
    display: flex;
    width: 100%;
    justify-content: space-between;
    .flex-item {
      width: auto;
      .name-style {
        font-size: 2.4rem;
      }
      .num-style {
        font-size: 3.2rem;
        font-weight: 600;
        color: white;
      }

    }

  }
  .contain-box2 {
    display: flex;
    justify-content: space-between;
    .flex-item {
      width: auto;
    }
    .zhu {
      height: 1.18rem;
      width: auto;
    }
  }
}

</style>
