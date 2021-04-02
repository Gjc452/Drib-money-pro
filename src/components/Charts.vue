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
  @Prop() readonly options?: ECBasicOption;
  chart?: ECharts;

  mounted() {
    const chartDom = this.$refs.container as HTMLDivElement;
    this.chart = echarts.init(chartDom);
    this.options && this.chart.setOption(this.options);

  }

  @Watch('options')
  onOptionsChange(newValue: ECBasicOption) {
    this.chart && this.chart.setOption(newValue);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

div {
  position: relative;
  padding-bottom: 20px;
  height: 152px;
  width: 100%;
  @extend %border-bottom;
}
</style>
