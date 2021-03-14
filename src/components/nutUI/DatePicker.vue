<template>
  <nut-datepicker
      :is-visible="isVisible"
      type="date"
      title="请选择日期"
      :default-value="selectedDate"
      :is-show-chinese="false"
      end-date="2046-12-24"
      @close="switchPicker('isVisible')"
      @choose="setChooseValue"
  >
  </nut-datepicker>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class DatePicker extends Vue {
  @Prop(Boolean) readonly isVisible!: boolean;
  @Prop(String) readonly selectedDate!: string;

  switchPicker(param) {
    this.$emit('update:isVisible', !this[`${param}`]);
  }

  setChooseValue(param) {
    this.$emit('update:selectedDate', param[3]);
  }
}
</script>

<style lang="scss" scoped>

</style>
