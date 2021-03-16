<template>
  <Layout>
    <StatisticsHeader :time="time"/>
    <main>
      <ol>
        <li v-for="group in groupList" :key="group.title">
          <h3 class="title">
            <div class="payTime">
              <span>{{ group.title }}</span>
              <span>{{ group.day }}</span>
            </div>
            <div class="total">
              <span v-if="group.income !== 0">收入:{{ group.income }}</span>
              <span v-if="group.outlay !== 0">支出:{{ group.outlay }}</span>
            </div>
          </h3>
          <ul class="recordWrapper">
            <li class="record" v-for="(item,index) in group.items" :key="index">
              <div>
                <Icon :name="item.icon"/>
              </div>
              <span>{{ item.notes }}</span>
              <span>{{ item.amount }}</span>
            </li>
          </ul>
        </li>
      </ol>
    </main>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import StatisticsHeader from '@/components/Statistics/StatisticsHeader.vue';
import dayjs from 'dayjs';
import getDay from '@/lib/getDay';

@Component({
  components: {StatisticsHeader}
})
export default class Statistics extends Vue {
  time = dayjs();

  mounted() {
    return;
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupList() {
    const {recordList} = this;
    if (recordList.length === 0) {return [];}
    const newList = (JSON.parse(JSON.stringify(recordList)) as RecordItem[]).filter(r => dayjs(r.createAt).format('YYYY-MM') === dayjs(this.time).format('YYYY-MM')).sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
    if (newList.length === 0) {return [];}
    type Result = { title: string; day: string; income?: number; outlay?: number; items: RecordItem[] }[]
    const result: Result = [{
      title: dayjs(newList[0].createAt).format('YYYY-MM-DD'),
      day: getDay(dayjs(newList[0].createAt).day()),
      income: 0,
      outlay: 0,
      items: [newList[0]]
    }];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createAt).format('YYYY-MM-DD'),
          day: getDay(dayjs(current.createAt).day()),
          items: [current]
        });
      }
    }
    result.map(group => group.outlay = group.items.filter(item => item.type === '-').reduce((sum, item) => sum + parseFloat(item.amount), 0));
    result.map(group => group.income = group.items.filter(item => item.type === '+').reduce((sum, item) => sum + parseFloat(item.amount), 0));
    return result;
  }

  beforeCreate() {
    this.$store.commit('fetchRecordList');
  }
}
</script>

<style lang="scss" scoped>
$gray: rgb(150, 150, 150);
main {
  ol {
    > li {
      .title {
        display: flex;
        color: $gray;
        font-size: 11px;
        justify-content: space-between;
        padding: 6px 12px;
        border-bottom: 1px solid;

        .payTime {
          span:first-child {
            padding-right: 10px;
          }
        }

        .total {
          span:last-child{
            padding-left: 20px;
          }
        }
      }

      .recordWrapper {
        .record {
          padding: 8px 12px;
          display: flex;
          align-items: center;
          justify-content: flex-start;

          div {
            display: flex;
            padding: 7px;
            background: rgb(245, 245, 245);
            border-radius: 50%;
            margin-right: 22px;

            .icon {
              width: 20px;
              height: 20px;
            }
          }

          span {
            font-size: 14px;
          }

          span:last-child {
            margin-left: auto;
          }
        }
      }
    }
  }
}
</style>
