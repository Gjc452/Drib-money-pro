<template>
  <div class="gray"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class AskDelete extends Vue {
}
</script>

<style lang="scss" scoped>
.gray {
  background: rgba(000, 000, 000, 0.6);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 500;
}


</style>
