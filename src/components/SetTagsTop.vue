<template>
  <header>
    <div class="top">
      <Icon @click.native="back" name="icon"/>
      <span>类别设置</span>
      <Icon/>
    </div>
    <div class="change">
      <div @click="selected('-')" :class="value === '-' && 'selected'">支出</div>
      <div @click="selected('+')" :class="value === '+' && 'selected'">收入</div>
    </div>
  </header>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class SetTagsTop extends Vue {
  @Prop(String) readonly value!: string;

  selected(type: string) {
    if (type !== '-' && type !== '+') {throw new Error('type is unknown');}
    if (this.value === type) {return;}
    this.$emit('update:value', type);
  }

  back() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

header {
  padding: 0 10px;
  background: $color-highlight;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 0 20px;

    .icon {
      width: 20px;
      height: 20px;
    }
  }

  .change {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2px 50px;
    }

    & .selected {
      background: black;
      color: $color-highlight;
    }

    div:nth-child(1) {
      border: 1px solid black;
      border-radius: 4px 0 0 4px;
    }

    div:nth-child(2) {
      border-top: 1px solid black;
      border-right: 1px solid black;
      border-bottom: 1px solid black;
      border-radius: 0 4px 4px 0;
    }
  }
}
</style>
