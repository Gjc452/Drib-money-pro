<template>
  <div ref="div" class="moneyWrapper">
    <Types :type="type" :id="id" @update:value="changeType"/>
    <Tags :selectedTag.sync="selectedTag"/>
    <NumberPad v-if="selectedTag.icon !== 'icon'" :selected-tag.sync="selectedTag"
               :notes.sync="notes" :create-at.sync="createAt" :amount.sync="amount"
               @submit="saveRecord"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import NumberPad from '@/components/money/NumberPad.vue';
import Types from '@/components/money/Types.vue';
import Tags from '@/components/money/Tags.vue';
import store from '@/store';
import resetHeight from '@/lib/resetHeight';

@Component({
  components: {Tags, Types, NumberPad}
})
export default class Money extends Vue {
  selectedTag = this.record.tag;
  notes = this.record.notes;
  amount = this.record.amount;
  createAt = this.record.createAt;
  id = this.record.id;

  mounted() {
    this.$store.commit('fetchRecordList');
    resetHeight(this.$refs.div as HTMLDivElement);
    window.onresize = () => {
      const width = document.body.clientWidth;
      if (width < 500) {
        const div = this.$refs.div as HTMLDivElement;
        div.style.height = window.innerHeight + 'px';
      }
    };
  }

  saveRecord() {
    this.$store.commit('saveRecord');
    this.$router.replace('/statistics');
  }

  updated() {
    store.commit('setRecord', {
      id: this.record.id,
      tag: this.selectedTag,
      notes: this.notes,
      type: this.type,
      amount: this.amount,
      createAt: this.createAt
    });
  }

  get type() {
    return store.state.type;
  }

  get record() {
    return store.state.record;
  }

  changeType(value: string) {
    store.commit('setType', value);
    store.commit('setAddType', value);
    this.selectedTag = {icon: 'icon', name: 'name'};
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
