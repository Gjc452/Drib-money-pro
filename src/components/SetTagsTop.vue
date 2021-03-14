<template>
  <header>
    <Top top-name="类别设置"/>
    <div class="change">
      <div @click="selected('-')" :class="type === '-' && 'selected'">支出</div>
      <div @click="selected('+')" :class="type === '+' && 'selected'">收入</div>
    </div>
  </header>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import Top from '@/components/Top.vue';

@Component({
  components: {Top}
})
export default class SetTagsTop extends Vue {
  @Prop(String) readonly type!: string;

  selected(type: string) {
    if (type !== '-' && type !== '+') {throw new Error('type is unknown');}
    if (this.type === type) {return;}
    this.$emit('update:type', type);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

header {
  padding: 0 10px;
  background: $color-highlight;

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
