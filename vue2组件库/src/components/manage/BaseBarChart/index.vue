<!--
柱状图
-->
<template>
  <div class="bar-chart">
    <div
      class="line_charts"
      ref="charts"
      :style="{ zoom: zoom, transform: `scale(${1 / zoom}, ${1 / zoom})`, transformOrigin: '0 0' }"
    ></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

// import { getFinancePublicTrend } from '@/api/Overview/CityEvolution/api';
export default {
  props: {
    batch: {
      type: String,
      default: '',
    },
    chartData: {
      type: Object,
      default: () => {
        return {
          name: '',
          xAxisData: [],
          dataList1: [],
          dataList2: [],
          dataList3: [],
          name1: '',
          name2: '',
          name3: '',
          unit: '',
          otherUnit: '',
        };
      },
    },
    showName: {
      type: Boolean,
      default: false,
    },
  },
  name: 'CityEvolution',
  data() {
    return {
      charts: null,
      xAxisData: [],
      dataList1: [],
      dataList2: [],
      dataList3: [],
      dataList4: [],
      data: [],
      timmerOneAnim: null,
      unit: '个',
      colors: ['#1492FF', '#FED887', '#FF9D9D'],
      zoom: 1,
    };
  },
  watch: {
    chartData: {
      handler: function () {
        this.$nextTick(() => {
          this.loadData();
        });
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    const charts = this.$refs.charts;
    this.charts = echarts.init(charts);

    // 消除zoom缩放导致鼠标偏移
    this.zoom = 1 / document.body.style.zoom;
  },
  methods: {
    setData() {
      this.charts.clear();
      this.charts.setOption(this.getOptions());
      this.charts.on('click', (params) => {
        if (params.name) {
          this.$emit('goDetail', params.name);
        }
      });
    },
    getOptions() {
      const option = {
        title: {
          text: this.chartData.name,
          textStyle: {
            fontSize: 16,
            fontFamily: 'PingFangSC-Regular, PingFang SC',
            color: ' #333333',
            fontWeight: 400,
          },
        },
        grid: {
          top: '28%',
          left: '5%',
          right: '5%',
          bottom: '15%',
        },
        legend: {
          show: true,
          data: [this.name1, this.name2, this.name3],
          left: 0,
          top: 10,
          textStyle: {
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: 12,
            fontFamily: 'PingFangSC-Regular, PingFang SC',
          },
          itemWidth: 10,
          itemHeight: 10,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器配置项。
            type: 'shadow',
          },
          textStyle: {
            color: '#fff',
            fontSize: 14,
          },
          borderColor: 'rgba(255, 255, 255, 0.4)',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          formatter: (params) => {
            let str = '';
            if (this.showName) {
              str = `<span style="font-size:16px;">&nbsp; &nbsp;${params[0].name}</span> <br />`;
            }
            params.forEach((item) => {
              str += `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color: ${item.color}
                                    "></span>
                                        ${item.seriesName}
                                        :
                                      ${item.value}${this.unit}
                                        <br/>`;
            });
            return str;
          },
        },
        xAxis: {
          data: this.xAxisData,
          type: 'category',
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.5)',
            },
          },
          axisTick: {
            show: false,
            alignWithLabel: true,
          },
          splitArea: {
            color: '#f00',
            lineStyle: {
              color: '#f00',
            },
          },
          axisLabel: {
            interval: 0, // 坐标轴刻度标签的显示间隔，在类目轴中有效；默认会采用标签不重叠的策略间隔显示标签；可以设置成0强制显示所有标签；如果设置为1，表示『隔一个标签显示一个标签』，如果值为2，表示隔两个标签显示一个标签，以此类推。
            color: '#666666',
            textStyle: {
              fontSize: 12,
            },
          },
          splitLine: {
            show: false,
          },
          boundaryGap: true,
        },
        yAxis: [
          {
            type: 'value',
            name: `(${this.unit})`,
            nameTextStyle: {
              align: 'center',
              color: '#8C8C8C',
              fontSize: 12,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#F2F2F2',
                type: 'dashed',
              },
            },
            axisLine: {
              show: false,
              lineStyle: {
                // color: '#979797',
              },
            },
            axisLabel: {
              color: 'rgba(0, 0, 0, 0.45)',
              margin: 10,
              textStyle: {
                fontSize: 12,
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            stack: 'AA',
            z: 1,
            name: this.name1,
            data: this.dataList1,
            type: 'bar',
            barMaxWidth: 'auto',
            barWidth: 10,
            itemStyle: {
              // color: {
              //   x: 0,
              //   y: 0,
              //   x2: 0,
              //   y2: 1,
              //   type: 'linear',
              //   global: false,
              //   colorStops: [
              //     {
              //       offset: 0,
              //       color: '#90E4FA',
              //     },
              //     {
              //       offset: 1,
              //       color: '#8CE1F9',
              //     },
              //   ],
              // },
              color: this.colors[0],
              borderRadius: [2, 2, 0, 0],
            },
            label: {
              show: false,
              position: 'top',
              distance: 10,
              color: '#fff',
            },
            // emphasis: {
            //   focus: 'series',
            //   tooltip: {
            //     textStyle: {
            //       color: '#fff',
            //       fontSize: 14,
            //     },
            //     borderColor: 'rgba(255, 255, 255, 0.4)',
            //     backgroundColor: 'rgba(0, 0, 0, 0.3)',
            //     formatter: (params) => {
            //       console.log(params);
            //     }
            //   },
            // },
          },
          {
            stack: 'AA',
            type: 'bar',
            name: this.name2,
            barWidth: 10,
            itemStyle: {
              color: this.colors[1],
              borderRadius: [2, 2, 0, 0],
            },
            label: {
              show: false,
              position: 'top',
              distance: 10,
              color: '#FFFFFF',
              textStyle: {
                fontSize: 22,
              },
            },
            data: this.dataList2,
          },
          {
            stack: 'AA',
            z: 1,
            name: this.name3,
            data: this.dataList3,
            type: 'bar',
            barMaxWidth: 'auto',
            barWidth: 10,
            itemStyle: {
              // color: {
              //   x: 0,
              //   y: 0,
              //   x2: 0,
              //   y2: 1,
              //   type: 'linear',
              //   global: false,
              //   colorStops: [
              //     {
              //       offset: 0,
              //       color: '#90E4FA',
              //     },
              //     {
              //       offset: 1,
              //       color: '#8CE1F9',
              //     },
              //   ],
              // },
              color: this.colors[2],
              borderRadius: [2, 2, 0, 0],
            },
            label: {
              show: false,
              position: 'top',
              distance: 10,
              color: '#fff',
            },
          },
        ],
      };
      return option;
    },
    loadData() {
      const { xAxisData, dataList1, dataList2, dataList3, dataList4, name1, name2, name3, otherUnit, unit, colors } =
        this.chartData;
      this.xAxisData = xAxisData;
      this.dataList1 = dataList1;
      this.dataList2 = dataList2;
      this.dataList3 = dataList3;
      this.dataList4 = dataList4;
      this.name1 = name1;
      this.name2 = name2;
      this.name3 = name3;
      this.unit = unit;
      if (otherUnit) {
        this.otherUnit = otherUnit;
      }
      if (colors && colors.length > 0) {
        this.colors = colors;
      }
      this.setData();
    },
  },
};
</script>
<style lang="scss" scoped>
.bar-chart {
  //background-color: pink;
  width: 100%;
  height: 100%;
  //padding-top: 20px;
  //padding-left: 20px;
  box-sizing: border-box;
  .line_charts {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
}
.content {
  font-size: 1050px;
  color: #1e8dff;
}
</style>
