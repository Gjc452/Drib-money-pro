<template>
  <Layout>
    <div class="chartWrapper">
      <ChartHeader :type.sync="type" :time.sync="time"/>
      <div class="week">
        <ol ref="ol">
          <li ref="lis" v-for="n in this.week" :class="{selected:selectedLi===n}" @click="changeSelectedLi(n)" :key="n">
            {{ n }}
          </li>
        </ol>
      </div>
      <div class="title">
        <span>总支出：{{ moneyData.map(d => d.total).reduce((a, b) => a + b) }}</span>
        <span>平均值：{{ (moneyData.map(d => d.total).reduce((a, b) => a + b) / moneyData.length).toFixed(2) }}</span>
      </div>
      <Charts :options="chartOptions"/>
      <div class="records">
        <h3>支出排行榜</h3>
        <ul v-if="newList.length!==0">
          <li v-for="(r,index) in this.newList" :key="index">
            <div class="iconWrapper">
              <Icon :name="r.tag"/>
            </div>
            <div class="detailWrapper">
              <div class="detail">
                <span>{{ r.note }}</span>
                <span>{{ r.percent }}</span>
                <span>{{ r.total }}</span>
              </div>
              <div ref="moneyLi" class="progressbar"></div>
            </div>
          </li>
        </ul>
        <div v-else>
          <NoList/>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import store from '@/store';
import Charts from '@/components/Charts.vue';
import ChartHeader from '@/components/Chart/ChartHeader.vue';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import getWeekResult from '@/lib/getWeekResult';
import getMonthResult from '@/lib/getMonthResult';
import getYearResult from '@/lib/getYearResult';
import isoWeek from 'dayjs/plugin/isoWeek';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import getRankResult from '@/lib/getRankResult';
import NoList from '@/components/common/NoList.vue';

dayjs.extend(isLeapYear);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
@Component({
  components: {NoList, ChartHeader, Charts}
})
export default class Chart extends Vue {
  type = '-';
  time = '周';
  selectedLi = '本周';

  @Watch('time')
  updateSelectedLi() {
    if (this.time === '周') {
      this.selectedLi = '本周';
    } else if (this.time === '月') {
      this.selectedLi = '本月';
    } else {
      this.selectedLi = '今年';
    }
  }

  changeSelectedLi(n: string) {
    this.selectedLi = n;
  }

  updated() {
    const lis = this.$refs.moneyLi as HTMLDivElement[];
    if (lis) {
      for (let i = 0; i < lis.length; i++) {
        lis[i].style.width = this.newList[i].percent;
      }
    }
    const oldLis = this.$refs.lis as HTMLDivElement[];
    const oldLi = oldLis.filter(li => li.className === 'selected')[0];
    const oldIndex = oldLis.indexOf(oldLi);
    this.$nextTick(() => {
      const ol = this.$refs.ol as HTMLDivElement;
      const lis = this.$refs.lis as HTMLDivElement[];
      const {clientWidth} = document.body;
      if (this.week[this.week.length - 1] !== this.selectedLi) {
        const selectedLi = lis.filter(li => li.className === 'selected')[0];
        const index = lis.indexOf(selectedLi) + 1;
        const {left, width} = selectedLi.getBoundingClientRect();
        const {left: left1} = ol.getBoundingClientRect();
        const moveLeft = clientWidth / 2 - width / 2 - left;
        if (lis.length >= 5) {
          lis.length - index < 3
              ? oldIndex < index ? ol.style.left = '0px' : ''
              : ol.style.left = left1 + moveLeft + 'px';
        }
      } else {
        if (!lis) {return [];}
        const width = lis.map(li => li.getBoundingClientRect().width).reduce((a, b) => a + b, 0);
        if (lis.length <= 5) {
          ol.style.left = width - clientWidth + 'px';
        } else {
          ol.style.left = '0px';
        }
      }
    });
  }

  get newList() {
    const list = (JSON.parse(JSON.stringify(this.recordList)) as RecordItem[]).filter(r => r.type === this.type);
    if (list.length === 0) {return [];}
    if (this.time === '周') {
      let year = dayjs().year();
      this.selectedLi.length > 3 ? year = parseInt(this.selectedLi.slice(0, 4)) : '';
      const weekList = list.filter(l => dayjs(l.createAt).year() === year).filter(r => this.moneyData.map(l => l.time).indexOf(dayjs(r.createAt).format('MM-DD')) >= 0);
      return getRankResult(weekList);
    } else if (this.time === '月') {
      let year = dayjs().year();
      let month = dayjs().month() + 1;
      if (this.selectedLi.length > 3) {
        year = parseInt(this.selectedLi.slice(0, 4));
        month = parseInt(this.selectedLi.slice(5, this.selectedLi.length));
      } else if (this.selectedLi === '上月') {
        month = dayjs().subtract(1, 'month').month() + 1;
      } else if (parseInt(this.selectedLi.replace('月', '')) <= 12) {
        month = parseInt(this.selectedLi.slice(0, this.selectedLi.length));
      }
      const monthList = list.filter(l => dayjs(l.createAt).year() === year).filter(r => dayjs(r.createAt).format('YYYY-MM') === dayjs(`${year}-${month}`).format('YYYY-MM'));
      return getRankResult(monthList);
    } else {
      let year = dayjs().year();
      if (this.selectedLi === '去年') {
        year = dayjs().subtract(1, 'year').year();
      } else if (this.selectedLi === '今年') {
        year = dayjs().year();
      } else {
        year = parseInt(this.selectedLi.slice(0, this.selectedLi.length));
      }
      const yearList = list.filter(l => dayjs(l.createAt).year() === year).filter(r => dayjs(r.createAt).format('YYYY') === year.toString());
      return getRankResult(yearList);
    }
  }

  get chartOptions() {
    const time = this.moneyData.map(n => n.time);
    const money = this.moneyData.map(n => n.total);
    const max = JSON.parse(JSON.stringify(money)).sort((a: number, b: number) => b - a)[0];
    return {
      title: {
        text: `最大值:${max}`,
        right: 5,
        top: -1,
        textStyle: {
          fontSize: 12,
          fontWeight: 300,
        }
      },
      grid: {
        x: 10,
        y: 20,
        x2: 10,
        y2: 20
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: time,
        axisTick: {
          show: false,
        },
        axisLabel: {
          fontSize: 10,
        },
      },
      yAxis: {
        type: 'value',
        max: 'dataMax',
        splitNumber: 1,
        interval: max === 0 ? '0' : max,
        axisLabel: {
          showMinLabel: false,
          showMaxLabel: false
        },
        splitLine: {
          lineStyle: {
            color: 'rgb(136,136,136)'
          }
        },
      },
      series: [{
        data: money,
        type: 'line',
        name: '金额',
        symbolSize: 5,
        emphasis: {
          lineStyle: {
            width: 0.5,
          },
        },
        lineStyle: {
          width: 0.5,
          color: '#000'
        },
        itemStyle:{
          color:'rgb(255,218,68)'
        },
        markLine: {
          silent: true,
          symbol: 'none',
          lineStyle: {
            width: 1,
            color: 'rgb(217,217,217)',
          },
          label: {
            show: false
          },
          itemStyle: {
            color: '#000',
          },
          data: [
            {type: 'average', name: '平均值'},
          ]
        }
      }]
    };
  }

  get moneyData() {
    let {selectedLi} = this;
    type Result = [{ total: number; time: string }]
    const result: Result = [];
    const list = (JSON.parse(JSON.stringify(this.recordList)) as RecordItem[]).filter(r => r.type === this.type);
    if (this.time === '周') {
      if (!selectedLi) {selectedLi = '本周';}
      if (selectedLi === '本周') {
        const year = dayjs().year();
        const week = dayjs().isoWeek();
        getWeekResult(result, year, week, list);
      } else if (selectedLi === '上周') {
        const year = dayjs().year();
        const week = dayjs().isoWeek() - 1;
        getWeekResult(result, year, week, list);
      } else if (parseInt(selectedLi.replace('周', '')) <= 53) {
        const year = dayjs().year();
        const week = parseInt(selectedLi.replace('周', ''));
        getWeekResult(result, year, week, list);
      } else {
        const year = parseInt(selectedLi.slice(0, 4));
        const week = parseInt(selectedLi.slice(5, selectedLi.length - 1));
        const selectedList = list.filter(r => dayjs(r.createAt).year() === year);
        getWeekResult(result, year, week, selectedList);
      }
    } else if (this.time === '月') {
      if (!selectedLi) {selectedLi = '本月';}
      if (selectedLi === '本月') {
        const month = dayjs().month();
        const days = dayjs(`${dayjs().year()}-${month + 1}`).daysInMonth();
        const monthList = list.filter(l => dayjs(l.createAt).year() === dayjs().year());
        getMonthResult(result, month, days, monthList);
      } else if (selectedLi === '上月') {
        const month = dayjs().month() - 1;
        const days = dayjs(`${dayjs().year()}-${month + 1}`).daysInMonth();
        const monthList = list.filter(l => dayjs(l.createAt).year() === dayjs().year());
        getMonthResult(result, month, days, monthList);
      } else if (parseInt(selectedLi.replace('月', '')) <= 12) {
        const month = parseInt(selectedLi.replace('月', '')) - 1;
        const days = dayjs(`${dayjs().year()}-${month + 1}`).daysInMonth();
        const monthList = list.filter(l => dayjs(l.createAt).year() === dayjs().year());
        getMonthResult(result, month, days, monthList);
      } else {
        const year = parseInt(selectedLi.slice(0, 4));
        const month = parseInt(selectedLi.slice(5, selectedLi.length - 1)) - 1;
        const days = dayjs(`${year}-${month + 1}`).daysInMonth();
        const selectedList = list.filter(r => dayjs(r.createAt).year() === year);
        getMonthResult(result, month, days, selectedList);
      }
    } else if (this.time === '年') {
      if (!selectedLi) {selectedLi = '今年';}
      if (selectedLi === '今年') {
        const year = dayjs().year();
        getYearResult(result, year, list);
      } else if (selectedLi === '去年') {
        const year = dayjs().year() - 1;
        getYearResult(result, year, list);
      } else {
        const year = parseInt(selectedLi.slice(0, 4));
        getYearResult(result, year, list);
      }
    }
    return result;
  }

  get week() {
    const now = dayjs();
    const newList = (JSON.parse(JSON.stringify(this.recordList)) as RecordItem[]).sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
    let month = dayjs().month();
    let week = dayjs().isoWeek();
    if (newList.length !== 0) {
      if (dayjs(newList[0].createAt).isAfter(dayjs())) {
        month = dayjs(newList[0].createAt).month();
        week = dayjs(newList[0].createAt).isoWeek();
      }
    }
    const lastYear = dayjs(newList[newList.length - 1].createAt).year();
    const weeks = [];
    for (let i = 1; i <= week; i++) {
      if (i === dayjs().isoWeek()) {
        weeks.push('本周');
      } else if (i === dayjs().isoWeek() - 1) {
        weeks.push('上周');
      } else {
        weeks.push(i + '周');
      }
    }
    const months = [];
    for (let i = 0; i <= month; i++) {
      if (i === dayjs().month()) {
        months.push('本月');
      } else if (i === dayjs().month() - 1) {
        months.push('上月');
      } else {
        months.push(i + 1 + '月');
      }
    }
    const years = [];
    for (let i = parseInt(lastYear); i <= now.year(); i++) {
      if (i === now.year()) {
        years.push('今年');
      } else if (i === now.year() - 1) {
        years.push('去年');
      } else {
        years.push(i + '年');
      }
    }
    for (let i = now.year() - 1; i >= parseInt(lastYear); i--) {
      for (let j = dayjs('2020').isoWeeksInYear(); j >= 1; j--) {
        weeks.unshift(i + '-' + j + '周');
      }
      for (let j = 12; j >= 1; j--) {
        months.unshift(i + '-' + j + '月');
      }
    }
    if (this.time === '周') {
      return weeks;
    } else if (this.time === '月') {
      return months;
    } else {
      return years;
    }
  }

  get recordList() {
    return store.state.recordList;
  }

  mounted() {
    store.commit('fetchRecordList');
    store.commit('resetRecord');
    store.commit('setType', '-');

  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.chartWrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.week {
  overflow: hidden;
  position: relative;

  ol {
    display: flex;
    font-size: 12px;
    justify-content: flex-end;
    position: relative;

    li {
      padding: 8px 0;
      flex-shrink: 0;
      width: 18%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      color: $gray;

      &.selected {
        color: black;
      }

      &.selected:after {
        content: '';
        position: absolute;
        bottom: -1px;
        background: black;
        height: 3px;
        width: 100%;
      }
    }
  }
}

.title {
  display: flex;
  flex-direction: column;
  padding: 10px 10px 0;
  position: relative;
  @extend %border-top;

  span {
    font-size: 12px;
    font-weight: 300;
  }

  span:nth-child(2) {
    font-size: 11px;
    padding-top: 3px;
  }
}

.records {
  @extend %border-top;
  flex-grow: 1;
  overflow: auto;

  h3 {
    padding: 12px 12px;
    font-size: 16px;
    font-weight: bolder;
  }

  ul li {
    display: flex;
    padding: 10px 12px 12px;
    align-items: center;

    .iconWrapper {
      margin-right: 14px;
      display: flex;
      padding: 8px;
      background: rgb(245, 245, 245);
      border-radius: 50%;

      .icon {
        width: 20px;
        height: 20px;
      }
    }

    .detailWrapper {
      flex-grow: 1;

      .detail {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 13px;
        padding-bottom: 8px;

        span {
          padding-right: 14px;
        }

        span:nth-child(3) {
          margin-left: auto;
        }
      }

      .progressbar {
        width: 100%;
        padding: 4px;
        border-radius: 4px;
        background: $color-highlight;
      }
    }
  }
}
</style>
