<template>
  <div ref="div" class="contentWrapper">
    <div>
      <div>
        <Icon name="icon-shigong"/>
      </div>
      <div>页面施工中</div>
    </div>
    <router-link to="/statistics">返回首页</router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import resetHeight from '@/lib/resetHeight';

@Component
export default class Fitting extends Vue {
  mounted() {
    resetHeight(this.$refs.div);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.contentWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    flex-grow: 1;
    top: 40%;
    color: $gray;

    .icon {
      width: 50px;
      height: 50px;
    }
  }

  a {
    position: relative;
    text-align: center;
    width: 100%;
    padding: 20px;
    background: $gray;
    color: white;
    z-index: 1;
  }
}
</style>
