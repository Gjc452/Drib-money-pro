<template>
  <div class="top">
    <Icon @click.native="back" name="icon-icon"/>
    <span>{{ topName }}</span>
    <span @click="saveTag" class="right">{{ name }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Top extends Vue {
  @Prop(String) readonly topName!: string;
  @Prop(String) readonly name?: string;
  @Prop(String) readonly value?: string;

  saveTag() {
    if (!this.value) {
      window.alert('不能添加空格');
    } else {
      return;
    }
  }

  back() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0 20px;

  .icon {
    width: 20px;
    height: 20px;
  }

  .right {
    font-size: 12px;
  }
}
</style>
