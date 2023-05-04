<template>
<div class="force" ref="chart"></div>
</template>

<script>
import * as echarts from 'echarts';
import {getOption, getOption2} from './option';
export default {
  name: 'Force',
  data() {
    return {
      myChart: null,
      optionData : {
        FirstLevelData:[{
          name: '项目名称',
        },],
        SecondLevelData:[
          {
          name: '系统名称1',
        }, {
          name: '系统名称2',
        }, {
          name: '系统名称3',
        }, {
          name: '系统名称4',
        }, {
          name: '系统名称5',
        }
        ],
        ThirdLevelData:[
          {
          name: '企业名称1',
        }, {
          name: '企业名称2',
        }, {
          name: '企业名称3',
        }, {
          name: '企业名称4',
        }, {
          name: '企业名称5',
        }],
        FourthLevelData:[
          {
            name: '人物名称1',
            "symbolSize": 50,
            itemStyle:{
            }

          }, {
            name: '人物名称2',
            "symbolSize": 50,
            itemStyle:{
            }
          }, {
            name: '人物名称3',
            "symbolSize": 50,
            itemStyle:{
            }
          }, {
            name: '人物名称4',
            "symbolSize": 50,
            itemStyle:{
            }
          }, {
            name: '人物名称5',
            "symbolSize": 50,
            itemStyle:{
            }
          }, {
            name: '人物名称6',
            "symbolSize": 50,
            itemStyle:{
            }
          }, {
            name: '人物名称7',
            "symbolSize": 50,
            itemStyle:{
            }
          }, {
            name: '人物名称8',
            "symbolSize":50,
            itemStyle:{
            }
          }
        ],
        links: [
          {
            source: "项目名称",//边的源节点名称
            target: "系统名称1"//边的目标节点名称
          },
          {
            source: "项目名称",//边的源节点名称
            target: "系统名称2"//边的目标节点名称
          },
          {
            source: "项目名称",//边的源节点名称
            target: "系统名称3"//边的目标节点名称
          },
          {
            source: "项目名称",
            target: "系统名称4"
          },
          {
            source: "项目名称",
            target: "系统名称5"
          },
          {
            source: "系统名称5",
            target: "企业名称1"
          },
          {
            source: "系统名称5",
            target: "企业名称4"
          },
          {
            source: "系统名称5",
            target: "企业名称3"
          },
          {
            source: "系统名称5",
            target: "企业名称5"
          },
          {
            source: "系统名称4",
            target: "企业名称1"
          },
          {
            source: "系统名称4",
            target: "企业名称4"
          },
          {
            source: "系统名称4",
            target: "企业名称3"
          },
          {
            source: "系统名称4",
            target: "企业名称5"
          },
          {
            source: "系统名称1",
            target: "企业名称2"
          },
          {
            source: "系统名称2",
            target: "企业名称2"
          },
          {
            source: "系统名称3",
            target: "企业名称2"
          },
          {
            source: "企业名称1",
            target: "人物名称1"
          },
          {
            source: "企业名称5",
            target: "人物名称1"
          },
          {
            source: "企业名称1",
            target: "人物名称2"
          },
          {
            source: "企业名称2",
            target: "人物名称2"
          },
          {
            source: "企业名称2",
            target: "人物名称3"
          },
          {
            source: "企业名称3",
            target: "人物名称4"
          },
          {
            source: "企业名称3",
            target: "人物名称5"
          },
          {
            source: "企业名称4",
            target: "人物名称6"
          },
          {
            source: "企业名称4",
            target: "人物名称7"
          },
          {
            source: "企业名称5",
            target: "人物名称8"
          },
        ],
      }
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.myChart = echarts.init(this.$refs.chart);
      this.myChart.setOption(getOption(this.optionData));

      let model1  = this.myChart.getModel().getSeriesByIndex(0).getData()._itemLayouts;

      // // let model2  = this.myChart.getModel().getSeriesByIndex(2).getData()._itemLayouts;
      // // let model3  = this.myChart.getModel().getSeriesByIndex(4).getData()._itemLayouts;
      // // let model4  = this.myChart.getModel().getSeriesByIndex(6).getData()._itemLayouts;
      // let data1  = this.myChart.getOption().series[0].data;
      let model2  = this.myChart.getModel().getSeriesByIndex(2).getData()._itemLayouts;
      let model3  = this.myChart.getModel().getSeriesByIndex(4).getData()._itemLayouts;
      let model4  = this.myChart.getModel().getSeriesByIndex(6).getData()._itemLayouts;
      model1.forEach((i, index) => {
        this.optionData.FirstLevelData[index].value = i;
        this.optionData.FirstLevelData[index].itemStyle = {
          label: {
            show: true,
            position: 'inside',
            opacity : 1,
            color:'#fff',
            fontSize: 9,
          },
          borderWidth: 1,
          borderColor: '#fff',
          color:'#84CC1C',
          value: 25,
        };
        this.optionData.FirstLevelData[index].symbolSize = 48;
      })
      model2.forEach((i, index) => {
        this.optionData.SecondLevelData[index].value = i;
        this.optionData.SecondLevelData[index].itemStyle = {
          label: {
            show: true,
            position: 'inside',
            opacity : 1,
            color:'#fff',
            fontSize: 8,
          },
          borderWidth: 1,
          borderColor: '#fff',
          color:'#407FD1',
          value: 25,
        };
        this.optionData.SecondLevelData[index].symbolSize = 36;
      })
      model3.forEach((i, index) => {
        this.optionData.ThirdLevelData[index].value = i;
        this.optionData.ThirdLevelData[index].itemStyle = {
          label: {
            show: true,
            position: 'inside',
            opacity : 1,
            color:'#fff',
            fontSize: 8,
          },
          borderWidth: 1,
          borderColor: '#fff',
          color:'#84CC1C',
          value: 25,
        };
        this.optionData.ThirdLevelData[index].symbolSize = 41;
      })
      model4.forEach((i, index) => {
        this.optionData.FourthLevelData[index].value = i;
        this.optionData.FourthLevelData[index].itemStyle = {
          label: {
            show: true,
            position: 'inside',
            opacity : 1,
            color:'#fff',
            fontSize: 8,
          },
          borderWidth: 1,
          borderColor: '#fff',
          color: '#E16975',
        };
        this.optionData.FourthLevelData[index].symbolSize = 40;
      })

      console.log(this.optionData)
      // // this.optionData.FirstLevelData[0].
      // // console.log('model1',data1);
      // console.log('model1',model1);
      // console.log('model2',model2);
      this.myChart.clear();
      // this.myChart.setOption(getOption(this.optionData));
      this.myChart.setOption(getOption2(this.optionData));
      // console.log('model3',model3);
      // console.log('model4',model4);
      // 如果是vue中，在获取完坐标之后如果要对数据进行处理，最好使用:
      //   [dom].getOption().series[0].data

    }
  }
}
</script>

<style  scoped>
.force {
  width: 100%;
  height: 100%;
}
</style>