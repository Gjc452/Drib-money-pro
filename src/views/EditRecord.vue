<template>
  <div class="wrapper">
    <header v-if="currentRecord">
      <div class="iconWrapper">
        <div @click="back">
          <Icon name="icon-icon"/>
        </div>
      </div>
      <div class="tagWrapper">
        <div>
          <Icon :name="currentRecord.tag.icon"/>
        </div>
        <span class="category">{{ currentRecord.tag.name }}</span>
      </div>
      <span>分享</span>
    </header>
    <main v-if="currentRecord">
      <div>
        <span>类型</span>
        <span>{{ currentRecord.type === '-' ? '支出' : '收入' }}</span>
      </div>
      <div>
        <span>金额</span>
        <span>{{ currentRecord.amount }}</span>
      </div>
      <div>
        <span>日期</span>
        <span>{{ recordTime.currentTime }}</span>
        <span>{{ recordTime.week }}</span>
      </div>
      <div>
        <span>备注</span>
        <span>{{ currentRecord.notes }}</span>
      </div>
    </main>
    <footer>
      <button @click="editCurrentRecord">编辑</button>
      <button @click="changeChoose">删除</button>
    </footer>
    <div class="shadeWrapper" v-if="choose">
      <AskDelete @click.native="changeChoose"/>
      <div class="content">
        <div class="text">
          <h3>确认删除</h3>
          <span>删除后数据不可恢复！</span>
        </div>
        <div class="choose">
          <button @click="changeChoose">取消</button>
          <button @click="deleteCurrentRecord">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import getDay from '@/lib/getDay';
import AskDelete from '@/components/common/AskDelete.vue';

dayjs.extend(isoWeek);
@Component({
  components: {AskDelete}
})
export default class EditRecord extends Vue {
  id = -1;
  choose = false;

  changeChoose() {
    this.choose = !this.choose;
  }

  created() {
    this.id = parseInt(this.$route.params.id);
    this.$store.commit('fetchRecordList');
    this.recordList.map(r => r.id).indexOf(this.id) < 0 ? this.$router.replace('/404') : '';
  }

  deleteCurrentRecord() {
    this.$store.commit('deleteRecord', this.id);
    this.$router.back();
  }

  editCurrentRecord() {
    this.$store.commit('setRecord', {
      id: this.currentRecord.id,
      tag: this.currentRecord.tag,
      notes: this.currentRecord.notes,
      type: this.currentRecord.type,
      amount: this.currentRecord.amount,
      createAt: this.currentRecord.createAt
    });
    this.$router.replace('/money');
  }

  back() {
    this.$router.back();
  }

  get recordTime() {
    const time = dayjs(this.currentRecord.createAt);
    const currentTime = time.format('YYYY年MM月DD日');
    const week = getDay(time.isoWeekday());
    return {currentTime, week};
  }

  get currentRecord() {
    return this.recordList.filter(r => r.id === this.id)[0];
  }

  get recordList() {
    return this.$store.state.recordList as RecordItem[];
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;

  header {
    background: $color-highlight;
    display: flex;
    justify-content: space-between;
    padding: 8px 12px;

    .tagWrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      div {
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
        border-radius: 50%;
        padding: 10px;
        margin-bottom: 8px;

        .icon {
          width: 24px;
          height: 24px;
        }
      }
    }

    span {
      font-size: 14px;
    }

    > span {
      padding-top: 5px;
      visibility: hidden;
    }

    > .iconWrapper, {
      div {
        padding: 5px 6px 0;
        width: 100%;
      }
    }
  }

  main {
    flex-grow: 1;

    div {
      padding: 12px 0;
      margin-left: 16px;
      border-bottom: 1px solid $gray;
      font-size: 14px;

      span:nth-child(1) {
        padding-right: 16px;
        color: $gray;
      }

      span:nth-child(3) {
        padding-left: 8px;
      }
    }
  }

  footer {
    display: flex;
    justify-content: center;
    border-top: 1px solid $gray;
    position: relative;

    button {
      font-size: 14px;
      width: 50%;
      background: transparent;
      border: none;
      padding: 15px;
    }

    button:nth-child(1)::after {
      content: '';
      display: block;
      height: 16px;
      border: 1px solid $gray;
      right: 50%;
      top: 50%;
      transform: translateX(1px) translateY(-8px);
      position: absolute;
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
