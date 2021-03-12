<template>
  <div class="moneyWrapper">
    <Types :type="type" @update:value="changeType"/>
    <Tags :tagList="tagList" :selectedTag.sync="selectedTag"/>
    <NumberPad v-if="selectedTag >= 0" :notes.sync="notes"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import NumberPad from '@/components/NumberPad.vue';
import Types from '@/components/Types.vue';
import Tags from '@/components/Tags.vue';

@Component({
  components: {Tags, Types, NumberPad}
})
export default class Money extends Vue {
  tagList = this.tagListOut;
  selectedTag = -1;
  notes = '';

  get type() {
    return this.$store.state.type;
  }

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

  changeType(value: string) {
    this.$store.commit('setType', value);
    this.selectedTag = -1;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.moneyWrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;

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
