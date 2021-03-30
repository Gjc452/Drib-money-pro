<template>
  <div ref="container"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import * as echarts from 'echarts';
import {ECharts} from 'echarts';

@Component
export default class Charts extends Vue {
  @Prop() readonly options?: object
  chart?: ECharts

  mounted() {
    const width = document.documentElement.clientWidth;
    const chartDom = this.$refs.container as HTMLDivElement;
    chartDom.style.width = `${width}px`;
    chartDom.style.height = `${width * 0.35}px`;
    this.chart = echarts.init(chartDom);
    this.chart.setOption(this.options);
  }
  @Watch('options')
  onOptionsChange(newValue){
    this.chart.setOption(newValue)
  }
}
</script>

<style lang="scss" scoped>

</style>
