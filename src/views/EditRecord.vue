<template>
  <div class="wrapper">
    <header>
      <Icon name="icon-icon"/>
      <span class="category">服饰</span>
      <span>分享</span>
    </header>
    <main>
      <div>
        <span>类型</span>
        <span>支出</span>
      </div>
      <div>
        <span>金额</span>
        <span>888</span>
      </div>
      <div>
        <span>日期</span>
        <span>2021年03月30日 星期二</span>
      </div>
      <div>
        <span>备注</span>
        <span>衣服</span>
      </div>
    </main>
    <footer>
      <button>编辑</button>
      <button>删除</button>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
@Component
export default class EditRecord extends Vue{
  id = -1
  created(){
    this.id = parseInt(this.$route.params.id)
    this.$store.commit('fetchRecordList')
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.wrapper{
  display: flex;
  flex-direction: column;
  height: 100vh;
  header{
    background: $color-highlight ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 12px;
    span{
      font-size: 14px;
    }
  }
  main{
    flex-grow: 1;
    div{
      padding: 12px 0;
      margin-left: 15px;
      border-bottom: 1px solid $gray;
      font-size: 14px;
      span:nth-child(1){
        padding-right: 15px;
      }
    }
  }
  footer{
    display: flex;
    justify-content: center;
    border-top: 1px solid $gray;
    position: relative;
    button{
      font-size: 14px;
      width: 50%;
      background: transparent;
      border: none;
      padding: 15px;
    }
    button:nth-child(1)::after{
      content: '';
      display: block;
      height: 16px;
      border: 1px solid $gray;
      right: 50%;
      top:50%;
      transform: translateX(1px) translateY(-8px);
      position: absolute;
    }
  }
}
</style>
