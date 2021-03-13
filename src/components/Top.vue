<template>
  <div class="top">
    <Icon @click.native="back" name="icon-icon"/>
    <span>{{ topName }}</span>
    <span @click="saveTag" class="right">{{ name }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Top extends Vue {
  @Prop(String) readonly topName!: string;
  @Prop(String) readonly name?: string;
  @Prop(String) readonly value!: string;
  @Prop(String) readonly selectedTag!: string;

  created() {
    store.commit('fetchCustomTag');
  }

  saveTag() {
    if (!this.value) {
      window.alert('不能添加空格');
    } else {
      let result;
      this.addType === '-' ? result = this.customTagsOut.filter(tag => tag.name === this.value) : result = this.customTagsIn.filter(tag => tag.name === this.value);
      if (result.length === 0) {
        store.commit('addCustomTag', {icon: this.selectedTag, name: this.value});
        this.back();
      } else {
        window.alert('类别不能重复添加');
      }

    }
  }

  get customTagsOut() {
    return store.state.customTagsOut;
  }

  get customTagsIn() {
    return store.state.customTagsIn;
  }

  get addType() {
    return store.state.addType;
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
