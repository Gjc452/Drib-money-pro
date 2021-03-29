<template>
  <Layout>
    <ChartHeader :type.sync="type" :time.sync="time"/>
    <div class="week">
      <ol ref="ol">
        <li ref="lis" v-for="n in this.week"  :class="{selected:selectedLi===n}" @click="changeSelectedLi(n)"  :key="n">
          {{ n }}
        </li>
      </ol>
      <div class="title">
        <span>总支出：1314.00</span>
        <span>平均值：187.71</span>
      </div>
      <Charts :options="option"/>
    </div>
    <div class="records">
      <h3>支出排行榜</h3>
      <ul>
        <li>
          <div class="iconWrapper">
            <Icon name="icon-tongxun"/>
          </div>
          <div class="detailWrapper">
            <div class="detail">
              <span>通讯</span>
              <span>70%</span>
              <span>70</span>
            </div>
            <div class="progressbar"></div>
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
dayjs.extend(weekOfYear);
@Component({
  components: {ChartHeader, Charts}
})
export default class Chart extends Vue {
  type = '+';
  time = '周';
  selectedLi = this.week[this.week.length-1]
  option = {
    title: {
      text: '260',
      right: 5,
      textStyle: {
        fontSize: 13,
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
      data: ['03-08', '03-09', '03-10', '03-11', '03-12', '0-13', '03-14'],
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
      data: [0, 230, 224, 218, 135, 147, 260],
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

  @Watch('time')
  updateSelectedLi(){
    (this.$refs.ol as HTMLDivElement).style.left = '0px'
    this.selectedLi = this.week[this.week.length-1]
  }

  changeSelectedLi(n: string) {
    const oldLis = this.$refs.lis as HTMLDivElement[]
    const oldLi = oldLis.filter(li => li.className === 'selected')[0]
    const oldIndex =  oldLis.indexOf(oldLi )
    this.selectedLi = n;
    this.$nextTick(()=>{
      const ol = this.$refs.ol as HTMLDivElement
      const lis = this.$refs.lis as HTMLDivElement[]
      const selectedLi = lis.filter(li => li.className === 'selected')[0]
      const index =  lis.indexOf(selectedLi)+1
      console.log(`lis.length:${lis.length}`);
      console.log(`selected.index:${index}`);
      const {left,width} =  selectedLi.getBoundingClientRect()
      const {clientWidth} = document.body
      const {left:left1} = ol.getBoundingClientRect()
      const moveLeft = clientWidth/2-width/2-left
      if(lis.length >=5){
         lis.length-index<=3
             ? oldIndex < index ? ol.style.left = '0px' :  ''
             : ol.style.left = left1 + moveLeft + 'px'
      }
    })
  }

  get week() {
    const now = dayjs()
    const newList = (JSON.parse(JSON.stringify(this.recordList)) as RecordItem[]).sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
    const year = newList.length !== 1 ? newList[newList.length -1].createAt.slice(0,4) : now.year().toString()
    const week = now.week();
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
    const years = []
    for(let i = parseInt(year);i<= now.year();i++){
      if(i === now.year()){
        years.push('今年')
      }else if(i === now.year()-1){
        years.push('去年')
      }else {
        years.push(i+'年')
      }
    }
    for(let i=now.year() ;i>= parseInt(year) ;i--){
      for(let j = 52;j>=1;j--){
        weeks.unshift(i+'-'+j+'周')
      }
      for(let j = 12;j>=1;j--){
        months.unshift(i+'-'+j+'月')
      }
    }
    if(this.time === '周'){
      return weeks
    }else if(this.time === '月'){
      return months
    }else {
      return years
    }
  }

  get recordList(){
    return store.state.recordList
  }

  mounted() {
    store.commit('fetchRecordList')
    store.commit('resetRecord');
    store.commit('setType', '-');
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
