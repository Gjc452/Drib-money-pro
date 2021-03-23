<template>
  <div ref="container"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import * as echarts from 'echarts';

@Component
export default class Charts extends Vue {
  @Prop() readonly options?: EChartsOption;

  mounted() {
    const width = document.documentElement.clientWidth;
    const chartDom = this.$refs.container as HTMLDivElement;
    chartDom.style.width = `${width}px`;
    chartDom.style.height = `${width * 0.5}px`;
    this.chart = echarts.init(chartDom);
    this.chart.setOption(this.options);
  }
}
</script>

<style lang="scss" scoped>

</style>
