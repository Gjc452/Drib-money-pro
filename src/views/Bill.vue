<template>
  <div class="wrapper">
    <header>
      <div class="top">
        <div class="year" @click="open">
          <span>{{ datetime.slice(0, 4) }}年</span>
          <Icon name="icon-xiala"/>
        </div>
        <span>账单</span>
        <div @click="back" class="back">返回</div>
      </div>
      <div class="surplus">
        <span>结余</span>
        <div>{{ recordList.map(r => r.surplus).reduce((a, b) => a + b, 0).toFixed(2) }}</div>
      </div>
      <div class="sortMoney">
        <div>
          <span>收入</span>
          <span>{{ recordList.map(r => r.income).reduce((a, b) => a + b, 0).toFixed(2) }}</span>
        </div>
        <div>
          <span>支出</span>
          <span>{{ recordList.map(r => r.outlay).reduce((a, b) => a + b, 0).toFixed(2) }}</span>
        </div>
      </div>
    </header>
    <main>
      <ol v-if="recordList.length!==0">
        <li>
          <span>月份</span>
          <span>收入</span>
          <span>支出</span>
          <span>结余</span>
        </li>
        <li v-for="r in recordList" :key="r.month">
          <span>{{ r.month }}</span>
          <span>{{ r.income }}</span>
          <span>{{ r.outlay }}</span>
          <span>{{ r.surplus }}</span>
        </li>
      </ol>
      <NoList v-else/>
    </main>
    <yd-datetime v-show="false" type="month" ref="datetime" v-model="datetime" slot="right"></yd-datetime>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import dayjs from 'dayjs';
import NoList from '@/components/common/NoList.vue';

@Component({
  components: {NoList}
})
export default class Bill extends Vue {
  datetime = dayjs().format('YYYY-MM');

  open() {
    this.$refs.datetime.open();
  }

  back() {
    this.$router.back();
  }

  created() {
    this.$store.commit('fetchRecordList');
  }

  get recordList() {
    const year = this.datetime.slice(0, 4);
    const recordList = (this.$store.state.recordList as RecordItem[])
        .filter(r => dayjs(r.createAt).format('YYYY') === year).sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
    if (recordList.length === 0) {return [];}
    const newList = [{
      month: dayjs(recordList[0].createAt).format('M月'),
      income: recordList[0].type === '+' ? parseFloat(recordList[0].amount) : 0,
      outlay: recordList[0].type === '-' ? parseFloat(recordList[0].amount) : 0,
      surplus: 0
    }];
    for (let i = parseInt(newList[0].month.slice(0, 2)); i > 0; i--) {
      const month = dayjs(`${year}-${i}`).format('M');
      const index = newList.map(n => n.month.replace('月', '')).indexOf(month);
      if (index < 0) {
        newList.push({
          month: month + '月',
          income: 0,
          outlay: 0,
          surplus: 0,
        });
      }
      const n = newList.map(n => n.month).indexOf(month + '月');
      const filterList = recordList.slice(1).filter(l => dayjs(l.createAt).format('M') === month);
      for (let j = 0; j < filterList.length; j++) {
        if (filterList[j].type === '-') {
          newList[n].outlay += parseFloat(filterList[j].amount);
        } else {
          newList[n].income += parseFloat(filterList[j].amount);
        }
      }
    }
    newList.map(n => n.surplus = n.income - n.outlay);
    return newList;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.wrapper {
  height: 100vh;
  background: rgb(250, 250, 250);
}

header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: $color-highlight;
  padding: 12px;

  .top {
    font-size: 14px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > span {
      font-size: 16px;
    }

    .year {
      display: flex;
      justify-content: center;
      align-items: center;

      .icon {
        margin-left: 4px;
        width: 14px;
        height: 14px;
      }
    }

    .back {
      text-align: right;
      width: 65px;
    }
  }

  .surplus {
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    span {
      font-size: 10px;
      color: gray;
      padding-bottom: 5px;
    }

    div {
      font-size: 20px;
    }
  }

  .sortMoney {
    padding-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-around;

    div {
      display: flex;
      align-items: center;

      span:nth-child(1) {
        font-size: 10px;
        color: gray;
        padding-right: 5px;
      }
    }
  }
}

main {
  font-weight: 300;

  ol {
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    font-size: 14px;

    li:nth-child(1) {
      padding: 2px 12px;
      font-size: 10px;
    }

    li:nth-child(n+2) {
      position: relative;
      @extend %border-top
    }

    li {
      display: flex;
      padding: 12px 12px;

      span:nth-child(1) {
        padding-right: 10px;
        width: 13%;
      }

      span:nth-child(n+2) {
        display: flex;
        justify-content: center;
        width: 29%;
      }
    }
  }
}
</style>
