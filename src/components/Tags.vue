<template>
  <div class="tagsWrapper">
    <ul class="tags">
      <li @click="setSelectedTag(tag.id)" v-for="tag in tagList" :key="tag.id">
        <div :class="{selected: selectedTag === tag.id}">
          <Icon :name="tag.icon"/>
        </div>
        <span>{{ tag.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
  @Prop(Array) readonly tagList!: [];
  @Prop(Number) readonly selectedTag!: number;

  setSelectedTag(id: number) {
    this.$emit('update:selectedTag', id);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tagsWrapper {
  flex-grow: 1;
  overflow: auto;
}

.tags {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 12px 0;
    width: 25%;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      border-radius: 50%;
      background: rgb(245, 245, 245);

      &.selected {
        background: $color-highlight;
      }

      .icon {
        width: 26px;
        height: 26px;
      }
    }

    span {
      padding-top: 6px;
      font-size: 12px;
    }
  }
}
</style>
