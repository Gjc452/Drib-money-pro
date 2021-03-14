<template>
  <div class="moneyWrapper">
    <Types :type="type" @update:value="changeType"/>
    <Tags :selectedTag.sync="selectedTag"/>
    <NumberPad v-if="Object.keys(selectedTag).length !== 0" :selected-tag="selectedTag" :type="type"
               :notes.sync="notes"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import NumberPad from '@/components/money/NumberPad.vue';
import Types from '@/components/money/Types.vue';
import Tags from '@/components/money/Tags.vue';
import store from '@/store';

@Component({
  components: {Tags, Types, NumberPad}
})
export default class Money extends Vue {
  selectedTag = {};
  notes = '';

  get type() {
    return store.state.type;
  }

  changeType(value: string) {
    store.commit('setType', value);
    store.commit('setAddType', value);
    this.selectedTag = {};
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
