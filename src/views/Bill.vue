<template>
  <div class="wrapper">
    <header>
      <div class="top">
        <div class="year">
          <span>2021年</span>
          <Icon name="icon-xiala"/>
        </div>
        <span>账单</span>
        <div class="back">返回</div>
      </div>
      <div class="surplus">
        <span>结余</span>
        <div>-6821.00</div>
      </div>
      <div class="sortMoney">
        <div>
          <span>收入</span>
          <span>1019.00</span>
        </div>
        <div>
          <span>支出</span>
          <span>7840.00</span>
        </div>
      </div>
    </header>
    <main>
      <ol>
        <li>
          <span>月份</span>
          <span>收入</span>
          <span>支出</span>
          <span>结余</span>
        </li>
        <li>
          <span>3月</span>
          <span>1019.00</span>
          <span>7831.00</span>
          <span>-6812.00</span>
        </li>
        <li>
          <span>2月</span>
          <span>0.00</span>
          <span>0.00</span>
          <span>0.00</span>
        </li>
        <li>
          <span>1月</span>
          <span>0.00</span>
          <span>0.00</span>
          <span>-9.00</span>
        </li>
      </ol>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Bill extends Vue {
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.wrapper{
  height: 100vh;
  background: rgb(250,250,250);
}
header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: $color-highlight;
  padding: 12px;

  .top {
    font-size: 14px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > span {
      font-size: 16px;
    }

    .year {
      display: flex;
      justify-content: center;
      align-items: center;

      .icon {
        margin-left: 4px;
        width: 14px;
        height: 14px;
      }
    }

    .back {
      text-align: right;
      width: 65px;
    }
  }

  .surplus {
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    span {
      font-size: 10px;
      color: gray;
      padding-bottom: 5px;
    }

    div {
      font-size: 20px;
    }
  }

  .sortMoney {
    padding-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-around;

    div {
      display: flex;
      align-items: center;

      span:nth-child(1) {
        font-size: 10px;
        color: gray;
        padding-right: 5px;
      }
    }
  }
}
main{
  font-weight: 300;
  ol{
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    font-size: 14px;
    li:nth-child(1){
      padding: 2px 12px;
      font-size: 10px;
    }
    li:nth-child(n+2){
      border-top: 1px solid $gray;
    }
    li{
      display: flex;
      padding: 12px 12px;
      span:nth-child(1){
        padding-right: 10px;
      }
      span:nth-child(n+2){
        display: flex;
        justify-content: center;
        width: 30%;
      }
    }
  }
}
</style>
