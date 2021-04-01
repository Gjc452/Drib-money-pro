<template>
  <div ref="div" class="addWrapper">
    <div class="topWrapper">
      <Top :top-name="addType === '-' ? '添加支出类别' : '添加收入类别'" name="完成" :value="input" :selected-tag="selectedTag"/>
    </div>
    <div class="selectedTag">
      <div class="iconWrapper  selected">
        <Icon :name="this.selectedTag"/>
      </div>
      <label>
        <input v-model="input" maxlength="4" type="text" placeholder="输入类别名称（不超过四个汉字）">
      </label>
    </div>
    <div class="main">
      <div class="tagWrapper" v-for="(tags,index) in tagList" :key="index">
        <span>{{ tags.title }}</span>
        <ul>
          <li @click="selected(tag)" v-for="(tag,index) in tags.icons" :key="index">
            <div class="iconWrapper" :class="selectedTag === tag && 'selected'">
              <Icon :name="tag"/>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Top from '@/components/common/Top.vue';
import store from '@/store';
import resetHeight from '@/lib/resetHeight';

@Component({
  components: {Top}
})
export default class CustomTag extends Vue {
  selectedTag = 'icon-youlechang';
  input = '';

  selected(tag: string) {
    this.selectedTag = tag;
  }

  beforeDestroy() {
    document.activeElement.blur();
  }

  mounted() {
    resetHeight(this.$refs.div as HTMLDivElement);
  }

  get addType() {
    return store.state.addType;
  }

  get tagList() {
    return store.state.tags;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.iconWrapper {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 50%;
  background: rgb(245, 245, 245);

  &.selected {
    background: $color-highlight;
  }

  .icon {
    width: 20px;
    height: 20px;
  }
}

.addWrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .topWrapper {
    background: $color-highlight;
    padding: 0 14px;
  }

  .selectedTag {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 14px;
    position: relative;
    @extend %border-bottom;

    label {
      flex-grow: 1;
      padding-left: 15px;

      input {
        border: none;
        width: 100%;
        padding-bottom: 3px;
        border-bottom: 1px solid black;

        &::placeholder {
          color: rgb(185, 185, 185);
        }
      }
    }
  }

  .main {
    flex-grow: 1;
    overflow: auto;
    padding: 0 5px;

    .tagWrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-top: 20px;

      span {
        text-align: center;
      }

      ul {
        padding-top: 5px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        li {
          width: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 0;
        }
      }
    }
  }
}
</style>
