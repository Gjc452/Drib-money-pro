<template>
  <Layout>
    <header>
      <div class="top">
        <div class="time">
          <span>2021年</span>
          <div>
            <span>03</span><span>月</span>
            <Icon name="icon-juanzeng"/>
            <span>|</span>
          </div>
        </div>
        <div class="income">
          <span>收入</span>
          <span>20.00</span>
        </div>
        <div class="outlay">
          <span>支出</span>
          <span>6724.30</span>
        </div>
      </div>
      <ul>
        <li>
          <Icon name="icon-juanzeng"/>
          <span>账单</span>
        </li>
        <li>
          <Icon name="icon-juanzeng"/>
          <span>预算</span>
        </li>
        <li>
          <Icon name="icon-juanzeng"/>
          <span>资产管家</span>
        </li>
        <li>
          <Icon name="icon-juanzeng"/>
          <span>理财知识</span>
        </li>
        <li>
          <Icon name="icon-juanzeng"/>
          <span>购物返现</span>
        </li>
      </ul>
    </header>
    <main>
      <ol>
        <li>
          <h3 class="title">
            <div class="payTime">
              <span>03月15日</span>
              <span>星期一</span>
            </div>
            <div class="total">
              <span>收入:160</span>
              <span>支出:20</span>
            </div>
          </h3>
          <ul class="recordWrapper">
            <li class="record">
              <div>
                <Icon name="icon-juanzeng"/>
              </div>
              <span>彩票</span>
              <span>-60</span>
            </li>
            <li class="record">
              <div>
                <Icon name="icon-juanzeng"/>
              </div>
              <span>维修</span>
              <span>-100</span>
            </li>
            <li class="record">
              <div>
                <Icon name="icon-juanzeng"/>
              </div>
              <span>彩票</span>
              <span>-60</span>
            </li>
            <li class="record">
              <div>
                <Icon name="icon-juanzeng"/>
              </div>
              <span>维修</span>
              <span>-100</span>
            </li>
          </ul>
        </li>
        <li>
          <h3 class="title">
            <div class="payTime">
              <span>03月15日</span>
              <span>星期一</span>
            </div>
            <div class="total">
              <span>收入:160</span>
              <span>支出:20</span>
            </div>
          </h3>
          <ul class="recordWrapper">
            <li class="record">
              <div>
                <Icon name="icon-juanzeng"/>
              </div>
              <span>彩票</span>
              <span>-60</span>
            </li>
            <li class="record">
              <div>
                <Icon name="icon-juanzeng"/>
              </div>
              <span>维修</span>
              <span>-100</span>
            </li>
            <li class="record">
              <div>
                <Icon name="icon-juanzeng"/>
              </div>
              <span>彩票</span>
              <span>-60</span>
            </li>
            <li class="record">
              <div>
                <Icon name="icon-juanzeng"/>
              </div>
              <span>维修</span>
              <span>-100</span>
            </li>
          </ul>
        </li>
      </ol>
    </main>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Statistics extends Vue {
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

$gray: rgb(150, 150, 150);
header {
  padding: 0 6px;
  background: linear-gradient(180deg, rgba(255,222,92,1) 70%, rgba(253,234,157,1) 83%, rgba(255,255,255,1) 100%);

  .top {
    padding: 14px 8px;
    display: flex;
    justify-content: flex-start;

    > div {
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      > span:first-child {
        color: $gray;
        font-size: 12px;
        padding-bottom: 4px;
      }
    }

    .time {
      div {
        span:first-child {
          font-size: 22px;
          padding-right: 2px;
        }

        span:nth-child(2) {
          font-size: 14px;
          padding-right: 2px;
        }

        .icon {
          width: 14px;
          height: 14px;
        }

        span:last-child {
          font-size: 22px;
          font-weight: lighter;
          color: $gray;
          padding: 0 8px;
        }
      }
    }

    .income {
      padding: 0 10px;
    }

    .outlay {
      margin-left: auto;
      padding-right: 60px;
    }
  }

  ul {
    display: flex;
    background: white;
    border-radius: 4px;
    box-shadow: 0 0 2px 0 rgba(0,0,0,0.1);

    > li {
      width: 20%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 8px 0;
      .icon{
        width: 24px;
        height: 24px;
      }

      span {
        padding-top: 4px;
        font-size: 10px;
        color: $gray;
      }
    }
  }
}
main{
  ol{
    >li{
      .title{
        display: flex;
        color: $gray;
        font-size: 11px;
        justify-content: space-between;
        padding: 6px 12px;
        border-bottom: 1px solid;
        .payTime{
          span:first-child{
            padding-right: 10px;
          }
        }
        .total{
          span:first-child{
            padding-right: 20px;
          }
        }
      }
      .recordWrapper{
        .record{
          padding: 8px 12px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          div{
            display: flex;
            padding: 7px;
            background: rgb(245,245,245);
            border-radius: 50%;
            margin-right: 22px;
            .icon{
              width: 20px;
              height: 20px;
            }
          }
          span{
            font-size: 14px;
          }
          span:last-child{
            margin-left: auto;
          }
        }
      }
    }
  }
}
</style>
