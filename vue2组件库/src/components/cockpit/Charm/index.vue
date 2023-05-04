<template>
  <div class="wrapper">
    <div class="left-wrapper">
      <SamllTitle :name="CommunityOverview" />
      <div class="hehua-box">
        <div class="hehua-box-left">
          <div class="img-item">
            <img :src="contain1.img" alt="" />
          </div>
          <div class="hehua-text">
            <h4>{{ contain1.title }}</h4>
            <p>{{ contain1.content }}</p>
          </div>
        </div>
        <div class="hehua-box-right">
          <showList :dataList="contain3 && contain3.length > 0 ? contain3 : []" />
          <showList :dataList="contain2 && contain2.length > 0 ? contain2 : []" />
        </div>
      </div>
      <Proportion :name="manAwomenName" :dataList="manAwomenList" :barStyle="manAwomenStyle" />
      <!-- 年龄分布 + 学历分布 -->
      <div class="third-wrapper">
        <div class="third-wrapper-base">
          <SamllTitle :name="ageName" />
          <BarCharts style="height: 30rem; width: 100%" :xAxisData="ageData.xData" :yAxisData="ageData.yData" />
        </div>
        <div class="third-wrapper-base">
          <SamllTitle :name="educationName" />
        </div>
      </div>
    </div>
    <div class="center-wrapper"></div>
    <div class="right-wrapper">
      <div>
        <SamllTitle name="居民情况" />
        <SamllTitle name="五类老人" />
        <SamllTitle name="村民信息" />
      </div>
      <div>
        <SamllTitle name="乡村规划" />
        <SamllTitle name="村民用水用电趋势" />
      </div>
    </div>
  </div>
</template>
<script>
/**
 *
 */
import SamllTitle from './Comps/SamllTitle';
import Proportion from './Comps/Proportion';
import showList from './Comps/ShowList';
import BarCharts from './Comps/BarCharts';
export default {
  components: {
    SamllTitle,
    Proportion,
    showList,
    BarCharts,
  },
  data() {
    return {
      CommunityOverview: '社区概述',
      manAwomenName: '男女性别比',
      manAwomenStyle: {
        width: '80rem',
        height: '3.17rem',
      },
      manAwomenList: [
        {
          name: '男性人口',
          unit: '人',
          num: 14336,
        },
        {
          name: '女性人口',
          unit: '人',
          num: 33,
        },
      ],
      contain1: {
        // 社区概述-荷花小区
        img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3228549874,2173006364&fm=26&gp=0.jpg',
        title: '五星村',
        content:
          '五星村位六横岛的西北部，三面环山，南面是港湾平原。由三个自然岙（东坑、中岙、西坑）和一个外迁小区（水库扩容迁至山西村沈家）组成，由十九个村民小组，三百九十二户农户，1274人组成。其中五星村党支部有党员60人。集体经济以养殖和茶叶种植为主，五星三个自然岙的三条溪流汇入大水库，犹如母亲的乳汁哺育着五星近一千三百人口',
      },
      contain2: [
        // 社区概述-社区人口+镇宅住区+小区数量+住宅单元数
        {
          img: require('@/assets/images/Charm/icon-charm-1.png'),
          count: 348,
          name: '镇宅住区',
          unit: '幢',
        },
        {
          img: require('@/assets/images/Charm/icon-charm-2.png'),
          count: 543,
          name: '住宅单元数',
          unit: '个',
        },
      ],
      contain3: [
        {
          img: require('@/assets/images/Charm/icon-charm-3.png'),
          count: 1749,
          name: '社区人口',
          unit: '人',
        },
        {
          img: require('@/assets/images/Charm/icon-charm-4.png'),
          count: 54,
          name: '小区数量',
          unit: '个',
        },
      ],
      ageName: '年龄分布',
      ageData: {
        xData: [8, 13, 27, 15, 3, 8],
        yData: ['0～16岁', '17～25岁', '26～40岁', '27～65岁', '65岁以上'],
        bgColor: '',
      },
      educationName: '学历分布',
    };
  },
};
</script>
<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
.wrapper {
  position: relative;
  .left-wrapper {
    position: absolute;
    width: 165.2rem;
    left: 25rem;
    top: 13rem;
    .hehua-box {
      display: flex;
      color: white;
      margin-top: 2rem;
      .hehua-box-left {
        width: 80.5rem;
        background: linear-gradient(180deg, rgba(22, 40, 47, 0.4), rgba(16, 31, 37, 0.4));
        border: 0.1px solid rgba(168, 247, 237, 0.2);
        border-radius: 1rem;
        padding: 1rem 0 2rem 1.6rem;
        display: flex;
        .img-item {
          width: 46.3rem;
          height: 28rem;
          border-radius: 1rem;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .hehua-text {
          flex: 1;
          margin-left: 2.8rem;
          padding-right: 3.5rem;
          h4 {
            font-size: 4.8rem;
            color: white;
            padding-top: 2.2rem;
          }
          p {
            font-size: 2.4rem;
            color: rgba(255, 255, 255, 0.5);
            line-height: 4.8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
          }
        }
      }
      .hehua-box-right {
        display: flex;
        margin-left: 4.2rem;
      }
    }
    .third-wrapper {
      display: flex;
      justify-content: space-between;
      & .third-wrapper-base {
        width: 80.3rem;
      }
    }
  }
  .right-wrapper {
    position: absolute;
    width: 165.2rem;
    right: 25rem;
    top: 13rem;
    display: flex;
    justify-content: space-between;
    & > div {
      width: 79.97rem;
    }
  }
}
</style>
