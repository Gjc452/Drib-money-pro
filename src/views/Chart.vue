<template>
  <Layout>
    <ChartHeader :type.sync="type" :time.sync="time"/>
    <div class="week">
      <ol ref="ol">
        <li ref="lis" v-for="n in this.week" :class="{selected:selectedLi===n}" @click="changeSelectedLi(n)" :key="n">
          {{ n }}
        </li>
      </ol>
      <div class="title">
        <span>总支出：{{ moneyData.map(d => d.total).reduce((a, b) => a + b) }}</span>
        <span>平均值：{{ (moneyData.map(d => d.total).reduce((a, b) => a + b) / moneyData.length).toFixed(2) }}</span>
      </div>
      <Charts :options="chartOptions"/>
    </div>
    <div class="records">
      <h3>支出排行榜</h3>
      <ul>
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

dayjs.extend(isLeapYear);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
@Component({
  components: {ChartHeader, Charts}
})
export default class Chart extends Vue {
  type = '+';
  time = '周';
  selectedLi: string = this.week[this.week.length - 1];

  @Watch('time')
  updateSelectedLi() {
    this.selectedLi = this.week[this.week.length - 1];
    this.$nextTick(() => {
      const ol = this.$refs.ol as HTMLDivElement;
      const lis = this.$refs.lis as HTMLDivElement[];
      const width = lis.map(li => li.getBoundingClientRect().width).reduce((a, b) => a + b, 0);
      const {clientWidth} = document.body;
      if (lis.length <= 5) {
        ol.style.left = width - clientWidth + 'px';
      } else {
        ol.style.left = '0px';
      }
    });
  }

  changeSelectedLi(n: string) {
    const oldLis = this.$refs.lis as HTMLDivElement[];
    const oldLi = oldLis.filter(li => li.className === 'selected')[0];
    const oldIndex = oldLis.indexOf(oldLi);
    this.selectedLi = n;
    this.$nextTick(() => {
      const ol = this.$refs.ol as HTMLDivElement;
      const lis = this.$refs.lis as HTMLDivElement[];
      const selectedLi = lis.filter(li => li.className === 'selected')[0];
      const index = lis.indexOf(selectedLi) + 1;
      const {left, width} = selectedLi.getBoundingClientRect();
      const {clientWidth} = document.body;
      const {left: left1} = ol.getBoundingClientRect();
      const moveLeft = clientWidth / 2 - width / 2 - left;
      if (lis.length >= 5) {
        lis.length - index < 3
            ? oldIndex < index ? ol.style.left = '0px' : ''
            : ol.style.left = left1 + moveLeft + 'px';
      }
    });
  }

  updated() {
    const lis = this.$refs.moneyLi as HTMLDivElement[];
    for (let i = 0; i < lis.length; i++) {
      lis[i].style.width = this.newList[i].percent;
    }
  }

  mounted() {
    store.commit('fetchRecordList');
    store.commit('resetRecord');
    store.commit('setType', '-');
    const lis = this.$refs.moneyLi as HTMLDivElement[];
    for (let i = 0; i < lis.length; i++) {
      lis[i].style.width = this.newList[i].percent;
    }
  }

  get newList() {
    const times = this.moneyData.map(l => l.time);
    const list = (JSON.parse(JSON.stringify(this.recordList)) as RecordItem[]).filter(r => r.type === this.type);
    if (list.length === 0) {return [];}
    if (this.time === '周') {
      let year = dayjs().year();
      this.selectedLi.length > 3 ? year = parseInt(this.selectedLi.slice(0, 4)) : '';
      const weekList = list.filter(l => dayjs(l.createAt).year() === year).filter(r => times.indexOf(dayjs(r.createAt).format('MM-DD')) >= 0);
      if (weekList.length === 0) {return [];}
      const result = [{
        tag: weekList[0].tag.icon,
        note: weekList[0].tag.name,
        total: 0,
        percent: '0%'
      }];
      for (let i = 1; i < weekList.length; i++) {
        if (result.map(r => r.tag).indexOf(weekList[i].tag.icon) < 0) {
          result.push({tag: weekList[i].tag.icon, note: weekList[i].tag.name, total: 0, percent: '0%'});
        }
      }
      result.map(group => group.total = weekList.filter(l => l.tag.icon === group.tag).reduce((sum, item) => sum + parseFloat(item.amount), 0));
      result.sort((a, b) => b.total - a.total);
      const amount = result.reduce((sum, item) => sum + parseFloat(item.total), 0);
      weekList.length !== 0 ? result.map(group => group.percent = (group.total / amount * 100).toFixed(2) + '%') : '';
      return result;
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
      if (monthList.length === 0) {return [];}
      const result = [{
        tag: monthList[0].tag.icon,
        note: monthList[0].tag.name,
        total: 0,
        percent: '0%'
      }];
      for (let i = 1; i < monthList.length; i++) {
        if (result.map(r => r.tag).indexOf(monthList[i].tag.icon) < 0) {
          result.push({tag: monthList[i].tag.icon, note: monthList[i].tag.name, total: 0, percent: '0%'});
        }
      }
      result.map(group => group.total = monthList.filter(l => l.tag.icon === group.tag).reduce((sum, item) => sum + parseFloat(item.amount), 0));
      result.sort((a, b) => b.total - a.total);
      const amount = result.reduce((sum, item) => sum + parseFloat(item.total), 0);
      monthList.length !== 0 ? result.map(group => group.percent = (group.total / amount * 100).toFixed(2) + '%') : '';
      return result;
    } else {
      let year;
      if (this.selectedLi === '去年') {
        year = dayjs().subtract(1, 'year').year();
      } else if (this.selectedLi === '今年') {
        year = dayjs().year();
      } else {
        year = parseInt(this.selectedLi.slice(0, this.selectedLi.length));
      }
      const yearList = list.filter(l => dayjs(l.createAt).year() === year).filter(r => dayjs(r.createAt).format('YYYY') === year.toString());
      const result = [{
        tag: yearList[0].tag.icon,
        note: yearList[0].tag.name,
        total: 0,
        percent: '0%'
      }];
      for (let i = 1; i < yearList.length; i++) {
        if (result.map(r => r.tag).indexOf(yearList[i].tag.icon) < 0) {
          result.push({tag: yearList[i].tag.icon, note: yearList[i].tag.name, total: 0, percent: '0%'});
        }
      }
      result.map(group => group.total = yearList.filter(l => l.tag.icon === group.tag).reduce((sum, item) => sum + parseFloat(item.amount), 0));
      result.sort((a, b) => b.total - a.total);
      const amount = result.reduce((sum, item) => sum + parseFloat(item.total), 0);
      yearList.length !== 0 ? result.map(group => group.percent = (group.total / amount * 100).toFixed(2) + '%') : '';
      return result;
    }
  }

  get chartOptions() {
    const time = this.moneyData.map(n => n.time);
    const money = this.moneyData.map(n => n.total);
    const max = JSON.parse(JSON.stringify(money)).sort((a, b) => b - a)[0];
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
    const {selectedLi} = this;
    type Result = [{ total: number; time: string }]
    const result: Result = [];
    const list = (JSON.parse(JSON.stringify(this.recordList)) as RecordItem[]).filter(r => r.type === this.type);
    if (this.time === '周') {
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
    if (newList.length === 0) {return [];}
    const year = newList.length !== 1 ? newList[newList.length - 1].createAt.slice(0, 4) : now.year().toString();
    const week = now.isoWeek();
    const weeks = [];
    for (let i = 1; i <= week; i++) {
      if (i === week) {
        weeks.push('本周');
      } else if (i === week - 1) {
        weeks.push('上周');
      } else {
        weeks.push(i + '周');
      }
    }
    const month = now.month();
    const months = [];
    for (let i = 0; i <= month; i++) {
      if (i === month) {
        months.push('本月');
      } else if (i === month - 1) {
        months.push('上月');
      } else {
        months.push(i + 1 + '月');
      }
    }
    const years = [];
    for (let i = parseInt(year); i <= now.year(); i++) {
      if (i === now.year()) {
        years.push('今年');
      } else if (i === now.year() - 1) {
        years.push('去年');
      } else {
        years.push(i + '年');
      }
    }
    for (let i = now.year() - 1; i >= parseInt(year); i--) {
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
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.week {
  padding-bottom: 20px;
  border-bottom: 1px solid $gray;
  overflow: hidden;

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

  .title {
    display: flex;
    flex-direction: column;
    padding: 10px 10px 0;
    border-top: 1px solid $gray;

    span {
      font-size: 12px;
      font-weight: 300;
    }

    span:nth-child(2) {
      font-size: 11px;
      padding-top: 3px;
    }
  }
}

.records {
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
