<template>
  <div class="moneyWrapper">
    <ul class="types">
      <li @click="selectType('-')" :class="type ==='-' && 'selected'">支出</li>
      <li @click="selectType('+')" :class="type === '+' && 'selected'">收入</li>
      <span @click="back">取消</span>
    </ul>
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
    <NumberPad v-if="selectedTag >= 0"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import NumberPad from '@/components/NumberPad.vue';

@Component({
  components: {NumberPad}
})
export default class Money extends Vue {
  type = '-';
  tagList = this.tagListOut;
  selectedTag = -1;

  get tagListIn() {
    return this.$store.state.tagListIn;
  }

  get tagListOut() {
    return this.$store.state.tagListOut;
  }

  updated() {
    if (this.type === '-') {
      this.tagList = this.tagListOut;
    } else {
      this.tagList = this.tagListIn;
    }
  }

  selectType(type: '-' | '+') {
    if (type !== '-' && type !== '+') {throw new Error('type is unknow');}
    if (this.type === type) {return;}
    this.type = type;
    this.selectedTag = -1;
  }

  setSelectedTag(id: number) {
    this.selectedTag = id;
  }

  back() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.moneyWrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .types {
    background: $color-highlight;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    li {
      padding: 15px 18px;
      font-weight: bolder;
      position: relative;

      &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 100%;
        background: #333;
      }
    }

    span {
      cursor: pointer;
      font-size: 14px;
      position: absolute;
      right: 10px;
    }
  }

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
}
</style>
