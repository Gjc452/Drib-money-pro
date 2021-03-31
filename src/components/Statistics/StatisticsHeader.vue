<template>
  <header>
    <div class="top">
      <div class="time" @click="open">
        <span>{{ time.format('YYYY') }}年</span>
        <div>
          <span>{{ time.format('MM') }}</span><span>月</span>
          <Icon name="icon-xiala"/>
          <span>|</span>
        </div>
      </div>
      <div class="income">
        <span>收入</span>
        <span>{{ money[0].toFixed(2) }}</span>
      </div>
      <div class="outlay">
        <span>支出</span>
        <span>{{ money[1].toFixed(2) }}</span>
      </div>
    </div>
    <ul>
      <li>
        <Icon name="icon-zhangdan"/>
        <span>账单</span>
      </li>
      <router-link to="/fitting">
        <Icon name="icon-ziyuan"/>
        <span>预算</span>
      </router-link>
      <router-link to="/fitting">
        <Icon name="icon-_baoxianlipei"/>
        <span>资产管家</span>
      </router-link>
      <router-link to="/fitting">
        <Icon name="icon--zhishichanquan"/>
        <span>理财知识</span>
      </router-link>
      <router-link to="/fitting">
        <Icon name="icon-A"/>
        <span>购物返现</span>
      </router-link>
    </ul>
    <yd-datetime v-show="false" type="month" ref="datetime" v-model="datetime" slot="right"></yd-datetime>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import dayjs from 'dayjs';

@Component
export default class StatisticsHeader extends Vue {
  @Prop(Object) readonly time!: dayjs.Dayjs;
  @Prop(Array) readonly money!: [];
  datetime = dayjs(this.time).format('YYYY-MM');

  @Watch('datetime')
  update() {
    this.$emit('update:time', dayjs(this.datetime));
  }

  open() {
    this.$refs.datetime.open();
  }
}
</script>

<style lang="scss" scoped>
$gray: rgb(150, 150, 150);
header {
  padding: 0 6px;
  background: linear-gradient(180deg, rgba(255, 222, 92, 1) 70%, rgba(253, 234, 157, 1) 83%, rgba(255, 255, 255, 1) 100%);

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
        display: flex;
        align-items: flex-end;

        span:first-child {
          line-height: 1.0;
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
          margin-bottom: 1px;
        }

        span:last-child {
          display: inline-block;
          font-size: 22px;
          margin-bottom: 1px;
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
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);

    > li, a {
      width: 20%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 10px 0;

      .icon {
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
</style>
