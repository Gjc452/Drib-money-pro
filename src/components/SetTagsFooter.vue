<template>
  <footer>
    <div>
      <Icon name="add"/>
      <span>添加类别</span>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
@Component
export default class SetTagsFooter extends Vue{
}
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  border-top: 1px solid rgb(235, 235, 235);

  span {
    font-size: 14px;
  }
}
</style>
