<template>
  <div class="setTagsWrapper">
    <SetTagsTop/>
    <main>
      <ul>
        <li v-for="tag in tagList" :key="tag.id">
          <Icon name="substract"/>
          <div>
            <Icon :name="tag.icon"/>
          </div>
          <span>{{ tag.name }}</span>
          <Icon name="menu"/>
        </li>
      </ul>
      <div>更多类别</div>
      <ul>
        <li>
          <Icon name="addTag"/>
          <div>
            <Icon name="haizi"/>
          </div>
          <span>孩子</span>
          <Icon name="menu"/>
        </li>
      </ul>
    </main>
    <SetTagsFooter/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import SetTagsTop from '@/components/SetTagsTop.vue';
import SetTagsFooter from '@/components/SetTagsFooter.vue';

@Component({
  components: {SetTagsFooter, SetTagsTop}
})
export default class EditTags extends Vue {
  tagList = this.tagListOut;

  get tagListIn() {
    return this.$store.state.tagListIn;
  }

  get tagListOut() {
    return this.$store.state.tagListOut;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.setTagsWrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;

  main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    overflow: auto;

    ul {
      li {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-bottom: 1px solid rgb(235, 235, 235);
        padding: 6px 0;

        > .icon {
          width: 20px;
          height: 20px;
          margin-right: 16px;
        }

        div {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 28px;
          height: 28px;
          background: rgb(245, 245, 245);
          border-radius: 50%;
          margin-right: 10px;

          .icon {
            width: 18px;
            height: 18px;
          }
        }

        span {
          font-size: 12px;
        }

        .icon:nth-child(4) {
          margin-left: auto;
          color: rgb(231, 231, 231);
        }
      }

      li:nth-last-child(1) {
        border: none;
      }
    }

    > div {
      font-size: 14px;
      color: rgb(108, 108, 108);
      padding: 16px 0 6px;
    }
  }


}
</style>
