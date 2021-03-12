<template>
  <footer>
    <router-link to="/money/setTags/customTag">
      <Icon name="icon-add"/>
      <span>添加类别</span>
    </router-link>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class SetTagsFooter extends Vue {
}
</script>

<style lang="scss" scoped>
footer {

  border-top: 1px solid rgb(235, 235, 235);

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    width: 100%;
    height: 100%;

    span {
      font-size: 14px;
    }
  }
}
</style>
