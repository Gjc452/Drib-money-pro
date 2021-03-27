<template>
  <Layout>
    <ChartHeader :type.sync="type"/>
    <div class="week">
      <ol>
        <li>01周</li>
        <li>02周</li>
        <li>03周</li>
        <li>04周</li>
        <li>05周</li>
        <li>06周</li>
        <li>上周</li>
        <li class="selected">本周</li>
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
import {Component} from 'vue-property-decorator';
import store from '@/store';
import Charts from '@/components/Charts.vue';
import ChartHeader from '@/components/Chart/ChartHeader.vue';

@Component({
  components: {ChartHeader, Charts}
})
export default class Chart extends Vue {
  type = '+'
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
      axisLabel:{
        fontSize: 10,
      },
    },
    yAxis: {
      type: 'value',
      max: 'dataMax',
      splitNumber: 1,
      axisLabel: {
        showMinLabel: false,
        showMaxLabel:false
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

  mounted() {
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

  ol {
    display: flex;
    font-size: 12px;
    justify-content: flex-end;
    border-bottom: 1px solid $gray;

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
  .title{
    display: flex;
    flex-direction: column;
    padding: 10px 10px 0;
    span{
      font-size: 12px;
      font-weight: 300;
    }
    span:nth-child(2){
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
