<template>
  <div>
    <Top top-name="添加支出类别" name="完成"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Top from '@/components/Top.vue';

@Component({
  components: {Top}
})
export default class CustomTag extends Vue {
}
</script>

<style lang="scss" scoped>

</style>
