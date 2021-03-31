<template>
  <div ref="container"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import * as echarts from 'echarts';
import {ECharts} from 'echarts';
import {ECBasicOption} from 'echarts/types/dist/shared';

@Component
export default class Charts extends Vue {
  @Prop() readonly options?: ECBasicOption
  chart?: ECharts

  mounted() {
    const width = document.documentElement.clientWidth;
    const chartDom = this.$refs.container as HTMLDivElement;
    chartDom.style.width = `${width}px`;
    chartDom.style.height = '132px';
    this.chart = echarts.init(chartDom);
    this.options && this.chart.setOption(this.options);
  }
  @Watch('options')
  onOptionsChange(newValue: ECBasicOption){
    this.chart && this.chart.setOption(newValue)
  }
}
</script>

<style lang="scss" scoped>

</style>
