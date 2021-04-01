<template>
  <div ref="div" class="layoutWrapper">
    <div class="content" :class="classPrefix&&`${classPrefix}-content`">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import resetHeight from '@/lib/resetHeight';

@Component
export default class Layout extends Vue {
  @Prop() readonly classPrefix!: string;

  mounted() {
    resetHeight(this.$refs.div);
  }
}
</script>

<style lang="scss" scoped>
.layoutWrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .content {
    flex-grow: 1;
    overflow: auto;
  }
}
</style>
