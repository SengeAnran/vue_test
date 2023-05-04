<template>
  <div class="calendar-wrapper">
    <div class="week">
      <div class="week-day" v-for="(item, index) in weekDay" :key="index">{{ item }}</div>
    </div>
    <div class="content" v-for="(e, i) in monthDates" :key="i">
      <div class="month">{{ e[e.length - 1].year }} 年 {{ e[e.length - 1].month }} 月</div>
      <div class="days">
        <div
          class="item"
          v-for="(item, index) in e"
          :key="index"
          @click="selectOne(item, $event)"
          :class="{
            choose: choose == `${item.year}-${item.month}-${item.date}` && item.isCurM && item.status == '可约',
            nolm: !item.isCurM,
            full: item.status == '约满' || item.status == '不可约',
          }"
        >
          <div v-if="isToday(item.year, item.month, item.date)" class="day">
            今天
            <div class="isNotFull" v-if="isCanOrder(item)">可约</div>
            <div class="isFull" v-if="!isCanOrder(item) && item.status !== '已预约'">约满</div>
            <div class="isFull" v-if="!isCanOrder(item) && item.status === '已预约'">已约</div>
          </div>
          <div v-else class="day">
            {{ Number(item.date) }}
            <!-- <div class="isFull">约满</div> -->
            <div class="isFull" v-if="!isCanOrder(item) && item.status !== '已预约'">约满</div>
            <div class="isFull" v-if="!isCanOrder(item) && item.status === '已预约'">已约</div>
            <div class="isNotFull" v-if="isCanOrder(item)">可约</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ren-calendar',
  props: {
    // 星期几为第一天(0为星期日)
    weekstart: {
      type: Number,
      default: 0,
    },
    // 标记的日期
    markDays: {
      type: Array,
      default: () => {
        return [];
      },
    },
    //是否展示月份切换按钮
    headerBar: {
      type: Boolean,
      default: true,
    },
    // 是否展开
    open: {
      type: Boolean,
      default: true,
    },
    //是否可收缩
    collapsible: {
      type: Boolean,
      default: true,
    },
    //未来日期是否不可点击
    disabledAfter: {
      type: Boolean,
      default: false,
    },
    dateStatusList: {
      type: Array,
      default: () => [],
    },
    chooseDate: {
      type: String,
      default: '',
    },
    dateKey: {
      type: String,
      default: 'orderTime',
    },
  },
  data() {
    return {
      weektext: ['日', '一', '二', '三', '四', '五', '六'],
      y: new Date().getFullYear(), // 年
      m: new Date().getMonth() + 1, // 月
      dates: [], // 当前月的日期数据
      positionTop: 0,
      monthOpen: true,
      choose: '',
      monthDates: [],
    };
  },
  created() {
    // this.dates = this.monthDay(this.y, this.m);
    this.monthDates = this.monthDay(this.y, this.m);

    var date1 = new Date();
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + 30);
    // console.log(date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() + '-' + date2.getDay());
  },
  mounted() {
    // this.choose = this.getToday().date;
    this.choose = this.chooseDate;
    // console.log(this.choose);
  },
  computed: {
    // 顶部星期栏
    weekDay() {
      return this.weektext.slice(this.weekstart).concat(this.weektext.slice(0, this.weekstart));
    },
    // height() {
    //   return (this.dates.length / 7) * 80 + 'px';
    // },
  },
  methods: {
    formatNum(num) {
      let res = Number(num);
      return res < 10 ? '0' + res : res;
    },
    getToday() {
      let date = new Date(); // Date('2021-10-27');
      let y = date.getFullYear();
      let m = date.getMonth();
      let d = date.getDate();
      let week = new Date().getDay();
      let weekText = ['日', '一', '二', '三', '四', '五', '六'];
      let formatWeek = '星期' + weekText[week];
      let today = {
        date: y + '-' + this.formatNum(m + 1) + '-' + this.formatNum(d),
        week: formatWeek,
      };
      return today;
    },
    // 获取当前月份数据
    monthDay(year, month, length) {
      let max = length || 7; // 显示的最大天数
      let dates = [];
      let monthDates = [];
      let y = Number(year);
      let m = Number(month);
      let firstDayOfMonth = new Date(y, m - 1, 1).getDay(); // 当月第一天星期几
      let lastDateOfMonth = new Date(y, m, 0).getDate(); // 当月最后一天
      // let lastDayOfLastMonth = new Date(y, m - 2, 0).getDate(); // 上一月的最后一天
      let weekstart = this.weekstart == 7 ? 0 : this.weekstart;

      // 当天是周几
      let todayOfMonth = new Date().getDay();
      let startDay = (() => {
        // 周初有几天是上个月的
        if (todayOfMonth == weekstart) {
          return 0;
        } else if (todayOfMonth > weekstart) {
          return todayOfMonth - weekstart;
        } else {
          return 7 - weekstart + todayOfMonth;
        }
      })();

      let d = new Date().getDate();
      for (let i = 1; i <= startDay; i++) {
        dates.push({
          date: this.formatNum(d - startDay + i - 1),
          day: weekstart + i - 1 || 7,
          month: this.formatNum(m),
          year: m == 12 ? y + 1 : y,
        });
      }

      for (let j = d; j <= d + max - 1; j++) {
        // console.log(j - d);
        // let dateItem = this.dateStatusList[j - d];
        let showDate = this.formatNum(j);
        let showMonth = this.formatNum(m);
        let showYear = m == 12 ? y + 1 : y;
        let dateStr = String(showYear) + '-' + String(showMonth) + '-' + String(showDate);
        // console.log(dateStr);
        var pushDate = {
          date: showDate,
          day: (j % 7) + firstDayOfMonth - 1 || 7,
          month: showMonth,
          year: showYear,
          isCurM: true, //是否当前月份
        };
        for (let index in this.dateStatusList) {
          let item = this.dateStatusList[index];
          if (dateStr == item[this.dateKey]) {
            pushDate['status'] = item.status;
          }
        }
        if (j <= lastDateOfMonth) {
          dates.push(pushDate);
          // dates.push({
          //     date: this.formatNum(j),
          //     day: (j % 7) + firstDayOfMonth - 1 || 7,
          //     month: this.formatNum(m),
          //     year: m==12?y+1:y,
          //     isCurM: true ,//是否当前月份
          // });
        }
      }
      // console.log(dates);
      monthDates.push(dates);
      // 若当前月天数不足max，则计算下个月数据
      let len = dates.filter((e) => {
        return e.isCurM;
      });
      if (len.length < max) {
        let dates2 = [];
        let lastLength = max - len.length; // 下个月需显示的天数

        let y_ = month == 12 ? Number(year + 1) : Number(year);
        let m_ = month == 12 ? 1 : Number(month + 1);
        let firstDayOfMonth_ = new Date(y_, m_ - 1, 1).getDay(); // 当月第一天星期几
        // let lastDateOfMonth_ = new Date(y_, m_, 0).getDate(); // 当月最后一天
        let lastDayOfLastMonth_ = new Date(y_, m - 2, 0).getDate(); // 上一月的最后一天

        let startDay_ = (() => {
          // 周初有几天是上个月的
          if (firstDayOfMonth_ == weekstart) {
            return 0;
          } else if (firstDayOfMonth_ > weekstart) {
            return firstDayOfMonth_ - weekstart;
          } else {
            return 7 - weekstart + firstDayOfMonth_;
          }
        })();

        for (let i = 1; i <= startDay_; i++) {
          dates2.push({
            date: this.formatNum(lastDayOfLastMonth_ - startDay_ + i),
            day: weekstart + i - 1 || 7,
            month: m_ - 1 >= 0 ? this.formatNum(m_ - 1) : 12,
            year: m_ - 1 >= 0 ? y_ : y_ - 1,
          });
        }
        for (let j = 1; j <= lastLength; j++) {
          // console.log(j);
          let showDate = this.formatNum(j);
          let showMonth = this.formatNum(m_);
          let dateStr = String(y_) + '-' + String(showMonth) + '-' + String(showDate);
          var pushDate2 = {
            date: showDate,
            day: (j % 7) + firstDayOfMonth - 1 || 7,
            month: showMonth,
            year: y_,
            isCurM: true, //是否当前月份
          };
          // console.log(dateStr);
          for (let index in this.dateStatusList) {
            let item = this.dateStatusList[index];
            // console.log(item);
            if (dateStr == item[this.dateKey]) {
              pushDate2['status'] = item.status;
            }
          }
          dates2.push(pushDate2);
          // dates2.push({
          //     date: showDate,
          //     day: (j % 7) + firstDayOfMonth_ - 1 || 7,
          //     month: showMonth,
          //     year: y_,
          //     isCurM: true //是否当前月份
          // });
        }
        monthDates.push(dates2);
      }

      // for (let k = 1; k <= endDay; k++) {
      //     dates.push({
      //         date: this.formatNum(k),
      //         day: (lastDateOfMonth + startDay + weekstart + k - 1) % 7 || 7,
      //         month: m + 1 <= 11 ? this.formatNum(m + 1) : 0,
      //         year: m + 1 <= 11 ? y : y + 1
      //     });
      // }
      // console.log(monthDates);
      // for (var i = 0; i < monthDates.length; i++) {
      // 	let item = monthDates[i]
      // 	console.log(item)
      // 	for (var j = 0; j < item.length; j++) {
      // 		console.log(item[j])
      // 	}
      // }
      // return dates;

      return monthDates;
    },
    isWorkDay(y, m, d) {
      //是否工作日
      let ymd = `${y}/${m}/${d}`;
      let formatDY = new Date(ymd.replace(/-/g, '/'));
      let week = formatDY.getDay();
      if (week == 0 || week == 6) {
        return false;
      } else {
        return true;
      }
    },
    isFutureDay(y, m, d) {
      //是否未来日期
      let ymd = `${y}/${m}/${d}`;
      let formatDY = new Date(ymd.replace(/-/g, '/'));
      let showTime = formatDY.getTime();
      let curTime = new Date().getTime();
      if (showTime > curTime) {
        return true;
      } else {
        return false;
      }
    },
    // 标记日期
    isMarkDay(y, m, d) {
      let flag = false;
      for (let i = 0; i < this.markDays.length; i++) {
        let dy = `${y}-${m}-${d}`;
        if (this.markDays[i] == dy) {
          flag = true;
          break;
        }
      }
      return flag;
    },
    isToday(y, m, d) {
      let checkD = y + '-' + m + '-' + d;
      let today = this.getToday().date;
      if (checkD == today) {
        return true;
      } else {
        return false;
      }
    },
    isCanOrder(item) {
      if (item.status) {
        if (item.status == '可约') {
          return true;
        } else {
          return false;
        }
      }
      return false;
    },
    // 点击回调
    selectOne(i) {
      let date = `${i.year}-${i.month}-${i.date}`;
      let selectD = new Date(date).getTime();
      let curTime = new Date().getTime();
      let week = new Date(date).getDay();
      let weekText = ['日', '一', '二', '三', '四', '五', '六'];
      let formatWeek = '星期' + weekText[week];
      let response = {
        date: date,
        week: formatWeek,
        status: i.status,
      };
      if (!i.isCurM) {
        // console.log('不在当前月范围内');
        return false;
      }
      if (!i.status || i.status == '约满' || i.status == '不可约') {
        // uni.showToast({
        // 	title:(i.status || '不可约')+' 请重新选择',
        // 	icon:'none'
        // })
        return false;
      }
      if (selectD > curTime) {
        if (this.disabledAfter) {
          // console.log('未来日期不可选');
          return false;
        } else {
          this.choose = date;
          this.$emit('onDayClick', response);
        }
      } else {
        this.choose = date;
        this.$emit('onDayClick', response);
      }
      // console.log(response);
    },
    //改变年月
    changYearMonth(y, m) {
      // this.dates = this.monthDay(y, m);
      this.monthDates = this.monthDay(y, m);
      this.y = y;
      this.m = m;
    },
    changeMonth(type) {
      if (type == 'pre') {
        if (this.m + 1 == 2) {
          this.m = 12;
          this.y = this.y - 1;
        } else {
          this.m = this.m - 1;
        }
      } else {
        if (this.m + 1 == 13) {
          this.m = 1;
          this.y = this.y + 1;
        } else {
          this.m = this.m + 1;
        }
      }
      // this.dates = this.monthDay(this.y, this.m);
      this.monthDates = this.monthDay(this.y, this.m);
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-wrapper {
  color: #333333;
  font-size: 14px;
  text-align: center;
  background-color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
  padding: 22px;
  .month {
    // text-align: left;
    margin-top: 22px;
    margin-bottom: 15px;
  }
  .week {
    display: flex;
    align-items: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    color: #999999;
    div {
      flex: 1;
    }
  }

  .content {
    // position: relative;
    // overflow: hidden;
    margin-bottom: 10px;
    .days {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .item {
        display: block;
        // height: 80px;
        line-height: 40px;
        width: calc(100% / 7);
        border-radius: 4px;
        .day {
          font-style: normal;
          display: inline-block;
          vertical-align: middle;
          width: 30px;
          // height: 60px;
          line-height: 30px;
          overflow: hidden;
          border-radius: 30px;
          color: #42464a;
        }
        .isWorkDay {
          color: #42464a;
        }

        .today {
          color: #fff;
          background-color: #a8c0ff;
        }

        .markDay {
          font-style: normal;
          width: 4px;
          height: 4px;
          background: #fc7a64;
          border-radius: 5px;
          position: absolute;
          left: 50%;
          bottom: 0;
          pointer-events: none;
        }
        &.choose {
          background-color: rgba(60, 125, 255, 0.1);
          // color: #fff;
        }

        &.nolm {
          color: #fff;
          opacity: 0;
        }
        &.full {
          background-color: #ffffff;
        }
        .isFull {
          color: #bfbfbf;
        }
        .isNotFull {
          color: #39bd65;
        }
      }
    }
  }
}
</style>
