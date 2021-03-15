<template>
  <Layout>
    <StatisticsHeader/>
    <main>
      <ol>
        <li>
          <h3 class="title">
            <div class="payTime">
              <span>03月15日</span>
              <span>星期一</span>
            </div>
            <div class="total">
              <span>收入:160</span>
              <span>支出:20</span>
            </div>
          </h3>
          <ul class="recordWrapper">
            <li class="record">
              <div>
                <Icon name="icon-juanzeng"/>
              </div>
              <span>彩票</span>
              <span>-60</span>
            </li>
            <li class="record">
              <div>
                <Icon name="icon-juanzeng"/>
              </div>
              <span>维修</span>
              <span>-100</span>
            </li>
            <li class="record">
              <div>
                <Icon name="icon-juanzeng"/>
              </div>
              <span>彩票</span>
              <span>-60</span>
            </li>
            <li class="record">
              <div>
                <Icon name="icon-juanzeng"/>
              </div>
              <span>维修</span>
              <span>-100</span>
            </li>
          </ul>
        </li>
        <li>
          <h3 class="title">
            <div class="payTime">
              <span>03月15日</span>
              <span>星期一</span>
            </div>
            <div class="total">
              <span>收入:160</span>
              <span>支出:20</span>
            </div>
          </h3>
          <ul class="recordWrapper">
            <li class="record">
              <div>
                <Icon name="icon-juanzeng"/>
              </div>
              <span>彩票</span>
              <span>-60</span>
            </li>
            <li class="record">
              <div>
                <Icon name="icon-juanzeng"/>
              </div>
              <span>维修</span>
              <span>-100</span>
            </li>
            <li class="record">
              <div>
                <Icon name="icon-juanzeng"/>
              </div>
              <span>彩票</span>
              <span>-60</span>
            </li>
            <li class="record">
              <div>
                <Icon name="icon-juanzeng"/>
              </div>
              <span>维修</span>
              <span>-100</span>
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

@Component({
  components: {StatisticsHeader}
})
export default class Statistics extends Vue {
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
          span:first-child {
            padding-right: 20px;
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
