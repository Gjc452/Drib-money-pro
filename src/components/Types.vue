<template>
  <ul class="types">
    <li @click="selectType('-')" :class="type ==='-' && 'selected'">支出</li>
    <li @click="selectType('+')" :class="type === '+' && 'selected'">收入</li>
    <span @click="back">取消</span>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  @Prop(String) readonly type: string;

  selectType(type) {
    if (type !== '-' && type !== '+') {throw new Error('type is unknown');}
    if (this.type === type) {return;}
    this.$emit('update:type', type);
  }

  back() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.types {
  background: $color-highlight;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  li {
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

  span {
    cursor: pointer;
    font-size: 14px;
    position: absolute;
    right: 10px;
  }
}
</style>
