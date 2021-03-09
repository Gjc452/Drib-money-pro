<template>
  <div class="moneyWrapper">
    <ul class="types">
      <li class="selected">支出</li>
      <li>收入</li>
      <span>取消</span>
    </ul>
    <div class="tagsWrapper">
      <ul class="tags">
        <li>
          <div class="selected">
            <Icon name="canyin"/>
          </div>
          <span>餐饮</span>
        </li>
        <li>
          <div>
            <Icon name="gouwu"/>
          </div>
          <span>购物</span>
        </li>
        <li>
          <div>
            <Icon name="riyong"/>
          </div>
          <span>日用</span>
        </li>
        <li>
          <div>
            <Icon name="lvxing"/>
          </div>
          <span>旅行</span>
        </li>
        <li>
          <div>
            <Icon name="yule"/>
          </div>
          <span>娱乐</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Money extends Vue {
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.moneyWrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .types {
    background: $color-highlight;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    li{
      padding: 15px 18px;
      font-weight: bolder;
      position: relative;
      &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 100%;
        background: #333;
      }
    }
    span{
      font-size: 14px;
      position: absolute;
      right: 10px;
    }
  }
  .tagsWrapper{
    flex-grow: 1;
    overflow: auto;
  }
  .tags {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    li{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 12px 0;
      width: 25%;
      div{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border-radius: 50%;
        background: rgb(245,245,245);
        &.selected{
          background: $color-highlight;
        }
        .icon{
          width: 26px;
          height: 26px;
        }
      }
      span{
        padding-top: 6px;
        font-size: 12px;
      }
    }
  }
}
</style>
