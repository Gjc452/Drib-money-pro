<template>
  <div class="setTagsWrapper">
    <SetTagsTop :type="addType" @update:type="setAddType"/>
    <main>
      <ul>
        <li v-for="tag in tagList()" :key="tag.name">
          <Icon @click.native="changeChoose(tag.icon)" name="icon-substract"/>
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
    <div class="shadeWrapper" v-if="choose">
      <AskDelete @click.native="choose = false"/>
      <div class="content">
        <div class="text">
          <h3>警告</h3>
          <span>删除类别会同时删除该类别下的所有记账</span>
        </div>
        <div class="choose">
          <button @click="choose = false">取消</button>
          <button @click="deleteCurrentTag">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import SetTagsFooter from '@/components/setTags/SetTagsFooter.vue';
import SetTagsTop from '@/components/setTags/SetTagsTop.vue';
import findIndex from '@/lib/findIndex';
import store from '@/store';
import AskDelete from '@/components/common/AskDelete.vue';

@Component({
  components: {AskDelete, SetTagsTop, SetTagsFooter}
})
export default class EditTags extends Vue {
  selectedTag = 'icon';
  choose = false;

  changeChoose(name: string) {
    this.selectedTag = name;
    if (this.recordList.length !== 0 && this.recordList.map(r => r.tag.icon).filter(i => i === this.selectedTag).length !== 0) {
      this.choose = !this.choose;
    } else {
      this.deleteCurrentTag();
    }
  }

  deleteCurrentTag() {
    const ids = this.recordList.map(r => r).filter(i => i.tag.icon === this.selectedTag).map(i => i.id);
    if (ids.indexOf(this.record.id) >= 0) {
      this.$store.commit('resetRecord');
    }
    ids.map(id => this.$store.commit('deleteRecord', id));
    const index = this.addType === '-' ? findIndex(this.tagListOut[0], this.selectedTag) : findIndex(this.tagListIn[0], this.selectedTag);
    this.$store.commit('deleteTagList', {type: this.addType, index});
    this.choose = false;
  }

  setAddType(value: string) {
    store.commit('setAddType', value);
  }

  tagList() {
    return this.addType === '-' ? this.tagListOut[0] : this.tagListIn[0];
  }

  deleteTagList() {
    return this.addType === '-' ? this.tagListOut[1] : this.tagListIn[1];
  }

  addTag(icon: string) {
    const index = this.addType === '-' ? findIndex(this.tagListOut[1], icon) : findIndex(this.tagListIn[1], icon);
    this.$store.commit('addTagList', {type: this.addType, index});
  }

  created() {
    store.commit('fetchTagList');
    store.commit('fetchRecordList');
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

  get recordList() {
    return this.$store.state.recordList as RecordItem[];
  }

  get record() {
    return this.$store.state.record as RecordItem;
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

.content {
  border-radius: 2px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 340px;
  padding: 10px 16px;
  transform: translateX(-50%) translateY(-50%);
  background: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;

  .text {
    padding-bottom: 30px;

    h3 {
      font-size: 16px;
      font-weight: bolder;
      padding-bottom: 5px;
    }

    span {
      font-size: 14px;
    }
  }

  .choose {
    margin-left: auto;

    button {
      background: transparent;
      padding: 5px;
      margin-left: 16px;
      font-size: 14px;
      color: rgb(10, 148, 135);
      border: none;
    }
  }
}
</style>
