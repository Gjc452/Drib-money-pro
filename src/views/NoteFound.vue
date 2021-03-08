<template>
  <div>
    <div>
      对不起，你要找的页面不见了
    </div>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
@Component
export default class NoteFound extends Vue{
}
</script>

<style lang="scss" scoped>

</style>
