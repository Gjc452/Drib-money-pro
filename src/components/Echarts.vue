<template>
  <div ref="container"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import * as echarts from 'echarts';

@Component
export default class Echarts extends Vue {
  @Prop() readonly option!;

  mounted() {
    const width = document.documentElement.clientWidth;
    this.$refs.container.style.width = `${width}px`;
    this.$refs.container.style.height = `${width * 0.4}px`;
    this.chart = echarts.init(this.$refs.container);
    this.chart.setOption(this.option);
  }
}
</script>

<style lang="scss" scoped>

</style>
