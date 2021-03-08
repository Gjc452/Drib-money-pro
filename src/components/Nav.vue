<template>
  <nav>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="mingxi"/>
      明细
    </router-link>
    <router-link to="/chart" class="item" active-class="selected">
      <Icon name="tongji"/>
      图表
    </router-link>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="add"/>
      记账
    </router-link>
    <router-link to="/news" class="item" active-class="selected">
      <Icon name="iconset0456"/>
      社区
    </router-link>
    <router-link to="/user" class="item" active-class="selected">
      <Icon name="yonghu"/>
      我的
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'Nav',
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

nav {
  display: flex;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  flex-direction: row;
  font-size: 12px;

  > .item {
    padding: 2px 0;
    width: 33.333333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .icon {
      width: 32px;
      height: 32px;
    }
  }

  > .item.selected {
    color: $color-highlight;
  }
}
</style>
