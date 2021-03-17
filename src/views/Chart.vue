<template>
  <Layout>
    <div>图表</div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import store from '@/store';
@Component
export default class Chart extends Vue{
  mounted(){
    store.commit('resetRecord')
    store.commit('setType', '-');
  }
}
</script>

<style lang="scss" scoped>

</style>
