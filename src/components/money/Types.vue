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
  @Prop(String) readonly type!: string;
  @Prop(Number) readonly id!: number;

  selectType(type: string) {
    if (type !== '-' && type !== '+') {throw new Error('type is unknown');}
    if (this.type === type) {return;}
    this.$emit('update:value', type);
  }

  back() {
    this.id <= this.recordList[this.recordList.length - 1].id
        ? this.$router.replace(`/statistics/edit/${this.id}`)
        : this.$router.back();
  }

  get recordList() {
    return this.$store.state.recordList as RecordItem[];
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
