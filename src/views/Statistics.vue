<template>
  <Layout>
    <header>
      <div class="top">
        <div class="time">
          <span>2021年</span>
          <div>
            <span>03月</span>
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

</style>
