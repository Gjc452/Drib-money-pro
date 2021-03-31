<template>
  <div class="noList">
    <icon name="icon-qingdan"/>
    <div></div>
    <span>暂无数据</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class NoList extends Vue {
}
</script>

<style lang="scss" scoped>
.noList{
  color: rgb(209,209,209);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  .icon{
    width: 50px;
    height: 50px;
  }
  div{
    margin-top: 3px;
    background: rgb(209,209,209);
    width: 40px;
    height: 10px;
    border-radius: 80% 80% ;
  }
  span{
    padding-top: 10px;
    font-size: 12px;
  }
}
</style>
