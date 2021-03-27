<template>
  <div class="i-shade">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
@Component
export default class Shade extends Vue{
}
</script>

<style lang="scss">
.i-shade{
  background: rgba(000,000,000,0.6);
  position: fixed;
  top:173px;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1500;
}
</style>
