<template>
  <header>
    <div class="switchType" @click="typeSet = !typeSet">
      <span>{{ type === '-' ? '支出' : '收入' }}</span>
      <Icon name="icon-xiala"/>
    </div>
    <div class="date">
      <button @click="setTime('周')" :class="{selected:time === '周'}">周</button>
      <button @click="setTime('月')" :class="{selected:time === '月'}">月</button>
      <button @click="setTime('年')" :class="{selected:time === '年'}">年</button>
    </div>
    <div v-if="typeSet" class="typeSet">
      <div class="typeWrapper">
        <div class="out" @click="setType('-')">
          <Icon name="icon-zhichu2"/>
          <span>支出</span>
          <Icon v-if="type=== '-'" name="icon-dui"/>
        </div>
        <span></span>
        <div class="in" @click="setType('+')">
          <Icon name="icon-zhichu2-copy"/>
          <span>收入</span>
          <Icon v-if="type === '+'" name="icon-dui"/>
        </div>
      </div>
    </div>
    <Shade v-if="typeSet" @click.native="typeSet = false"/>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import Shade from '@/components/common/Shade.vue';

@Component({
  components: {Shade}
})
export default class ChartHeader extends Vue {
  @Prop(String) readonly type!: string;
  @Prop(String) readonly time!: string;
  typeSet = false;

  setTime(value: string) {
    this.$emit('update:time', value);
  }

  setType(value: string) {
    this.$emit('update:type', value);
    setTimeout(() => {
      this.typeSet = false;
    }, 150);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

header {
  background: $color-highlight;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 16px;
  position: relative;

  .switchType {
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      width: 14px;
      height: 14px;
      margin-left: 4px;
    }
  }

  .date {
    display: flex;
    width: 100%;
    padding: 10px;

    button {
      background: transparent;
      width: 33.33333%;
      border: none;
      font-size: 12px;
      padding: 3px 0;

      &.selected {
        background: black;
        color: $color-highlight;
      }
    }

    button:nth-child(1) {
      border: 1px solid black;
      border-radius: 4px 0 0 4px;
    }

    button:nth-child(2) {
      border-top: 1px solid black;
      border-bottom: 1px solid black;
    }

    button:nth-child(3) {
      border: 1px solid black;
      border-radius: 0 4px 4px 0;
    }
  }

  .typeSet {
    position: absolute;
    top: 81px;
    width: 100%;
    z-index: 1;

    .typeWrapper {
      background: white;
      overflow: hidden;

      div {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 13px 30px;

        .icon {
          width: 18px;
          height: 18px;
        }

        span {
          font-size: 14px;
          padding-left: 10px;
        }

        .icon:nth-child(3) {
          margin-left: auto;
        }
      }

      > span {
        display: block;
        position: relative;
        width: 100%;
        margin-left: 15%;
        @extend %border-bottom
      }
    }
  }
}
</style>
