<template>
  <Layout>
    <header>
      <div class="switchType">
        <span>支出</span>
        <Icon name="icon-xiala"/>
      </div>
      <div class="date">
        <button class="selected">周</button>
        <button>月</button>
        <button>年</button>
      </div>
    </header>
    <div class="week">
      <ol>
        <li>01周</li>
        <li>02周</li>
        <li>03周</li>
        <li>04周</li>
        <li>05周</li>
        <li>06周</li>
        <li>上周</li>
        <li>本周</li>
      </ol>
      <Charts :options="option"/>
    </div>

  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import store from '@/store';
import Charts from '@/components/Charts.vue';

@Component({
  components: {Charts}
})
export default class Chart extends Vue {
  option = {
    title: {
      text: '总支出：6564.30',
      subtext:'平均值:937.76',
      top:6,
      left:3,
      textStyle: {
        fontSize: 13,
        fontWeight: 300,
      }
    },
    grid: {
      x: 10,
      y: 70,
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
    },
    yAxis: {
      type: 'value',
      max: 'dataMax',
      splitNumber: 1,
      position:'right',
      offset:-30,
      axisLabel:{
        showMinLabel:false,

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

header {
  background: $color-highlight;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 16px;

  .switchType {
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      width: 14px;
      height: 14px;
      margin-left: 4px;
    }
  }

  .date {
    display: flex;
    width: 100%;
    padding: 10px;

    button {
      background: transparent;
      width: 33.33333%;
      border: none;
      font-size: 12px;
      padding: 3px 0;

      &.selected {
        background: black;
        color: $color-highlight;
      }
    }

    button:nth-child(1) {
      border: 1px solid black;
      border-radius: 4px 0 0 4px;
    }

    button:nth-child(2) {
      border-top: 1px solid black;
      border-bottom: 1px solid black;
    }

    button:nth-child(3) {
      border: 1px solid black;
      border-radius: 0 4px 4px 0;
    }
  }
}
.week{
  ol{
    display: flex;
    font-size: 10px;
    justify-content: flex-end;
    border-bottom: 1px solid $gray;
    li{
      padding: 8px 0;
      flex-shrink: 0;
      width: 18%;
      overflow: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
