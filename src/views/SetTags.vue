<template>
  <div class="setTagsWrapper">
    <SetTagsTop :type="addType" @update:type="setAddType"/>
    <main>
      <ul>
        <li v-for="tag in tagList()" :key="tag.name">
          <Icon @click.native="deleteTag(tag.icon)" name="icon-substract"/>
          <div>
            <Icon :name="tag.icon"/>
          </div>
          <span>{{ tag.name }}</span>
          <span v-if="tag.custom" class="custom">自定义</span>
          <Icon name="icon-menu"/>
        </li>
      </ul>
      <div v-if="deleteTagList().length!==0">更多类别</div>
      <ul>
        <li v-for="tag in deleteTagList()" :key="tag.name">
          <Icon @click.native="addTag(tag.icon)" name="icon-addTag"/>
          <div>
            <Icon :name="tag.icon"/>
          </div>
          <span>{{ tag.name }}</span>
          <Icon name="icon-menu"/>
        </li>
      </ul>
    </main>
    <SetTagsFooter/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import SetTagsFooter from '@/components/setTags/SetTagsFooter.vue';
import SetTagsTop from '@/components/setTags/SetTagsTop.vue';
import findIndex from '@/lib/findIndex';
import store from '@/store';

@Component({
  components: {SetTagsTop, SetTagsFooter}
})
export default class EditTags extends Vue {

  setAddType(value: string) {
    store.commit('setAddType', value);
  }

  tagList() {
    if (this.addType === '-') {
      return this.tagListOut[0];
    } else {
      return this.tagListIn[0];
    }
  }

  deleteTagList() {
    if (this.addType === '-') {
      return this.tagListOut[1];
    } else {
      return this.tagListIn[1];
    }
  }

  deleteTag(icon: string) {
    const index = this.addType === '-' ? findIndex(this.tagListOut[0], icon) : findIndex(this.tagListIn[0], icon);
    this.$store.commit('deleteTagList', {type: this.addType, index});
  }

  addTag(icon: string) {
    const index = this.addType === '-' ? findIndex(this.tagListOut[1], icon) : findIndex(this.tagListIn[1], icon);
    this.$store.commit('addTagList', {type: this.addType, index});
  }

  created() {
    store.commit('fetchTagList');
  }

  get addType() {
    return store.state.addType;
  }

  get tagListIn() {
    return store.state.tagListIn;
  }

  get tagListOut() {
    return store.state.tagListOut;
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

        .custom {
          padding-left: 10px;
          color: rgb(185, 185, 185)
        }

        > .icon:last-child {
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
