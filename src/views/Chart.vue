<template>
  <Layout>
    <Echarts :option="option"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import store from '@/store';
import Echarts from '@/components/Echarts.vue';

@Component({
  components: {Echarts}
})
export default class Chart extends Vue {
  option = {
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
    },
    yAxis: {
      type: 'value',
      max: 'dataMax',
      splitNumber: 1,
      axisLabel: {
        show: false
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
      itemStyle: {
        normal: {
          lineStyle: {
            width: 0.5,
            color: '#000'
          }
        }
      },
      markLine: {
        silent: true,
        symbol: 'none',
        lineStyle: {
          width: 1,
          color: 'rgb(217,217,217)',
        },
        itemStyle: {
          normal: {
            color: '#000',
            label: {
              show: false
            }
          }
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

</style>
