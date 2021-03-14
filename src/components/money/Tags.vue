<template>
  <div class="tagsWrapper">
    <ul class="tags">
      <li @click="setSelectedTag({icon:tag.icon,name:tag.name})" v-for="tag in tagList()" :key="tag.name">
        <div :class="{selected: selectedTag.icon === tag.icon}">
          <Icon :name="tag.icon"/>
        </div>
        <span>{{ tag.name }}</span>
      </li>
      <router-link to="/money/setTags">
        <div>
          <Icon name="icon-shezhi"/>
        </div>
        <span>设置</span>
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import store from '@/store';

@Component
export default class Tags extends Vue {
  @Prop(Object) readonly selectedTag!: TagList;

  setSelectedTag({icon, name}: TagList) {
    this.$emit('update:selectedTag', {icon, name});
  }

  created() {
    store.commit('fetchTagList');
  }

  get tagListIn() {
    return store.state.tagListIn;
  }

  get tagListOut() {
    return store.state.tagListOut;
  }

  get type() {
    return store.state.type;
  }

  tagList() {
    if (this.type === '-') {
      return this.tagListOut[0];
    } else {
      return this.tagListIn[0];
    }
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

  li, a {
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
