<template>
  <nav>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="icon-mingxi"/>
      明细
    </router-link>
    <router-link to="/money" class="item" active-class="selected">
      <div class="addWrapper">
        <div class="iconWrapper">
          <Icon name="icon-add"/>
        </div>
      </div>
      <Icon/>
      记账
    </router-link>
    <router-link to="/chart" class="item" active-class="selected">
      <Icon name="icon-tongji"/>
      图表
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
  position: relative;
  display: flex;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  flex-direction: row;
  font-size: 12px;

  > .item {
    padding: 4px 0;
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    > .icon {
      width: 28px;
      height: 28px;
    }
  }

  > .item.selected {
    color: $color-highlight;
  }
}

.addWrapper {
  position: absolute;
  top: -22px;
  padding: 5px;
  background: white;
  border-left: 1px solid rgb(227, 227, 227);
  border-top: 1px solid rgb(227, 227, 227);
  border-radius: 50% 50%;
  transform: rotate(45deg);

  .iconWrapper {
    transform: rotate(-45deg);
    background: $color-highlight;
    padding: 10px;
    border-radius: 50%;

    .icon {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
