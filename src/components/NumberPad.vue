<template>
  <div class="numberPadWrapper">
    <label class="notes">
      <span class="iconWrapper"><Icon name="notepad"/></span>
      <span class="name">备注:</span>
      <input type="text" :value="notes" @input="onChange" placeholder="点击写备注...">
      <span class="output">0.00</span>
    </label>
    <div class="numberPad">
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>
        <Icon class="calendar" name="rili"/>
        <span>今天</span>
      </button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button>
        <Icon class="delete" name="backspace"/>
      </button>
      <button class="ok">完成</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  @Prop() readonly notes!: string;

  onChange(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    this.$emit('update:notes', input.value);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPadWrapper {
  background: rgb(242, 243, 245);

  .notes {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid rgb(217, 217, 217);

    .iconWrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 6px 0 8px;

      .icon {
        width: 18px;
        height: 18px;
      }
    }

    .name {
      font-size: 14px;
    }

    input {
      border: none;
      background: transparent;
      height: 40px;
      flex-grow: 1;
      padding: 0 6px;
    }

    .output {
      font-size: 20px;
      font-weight: lighter;
      margin-left: auto;
      padding-right: 8px;
    }
  }

  .numberPad {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    button {
      width: 25%;
      height: 45px;
      border: none;
      background: transparent;
      border-bottom: 1px solid rgb(217, 217, 217);
      border-right: 1px solid rgb(217, 217, 217);
      display: flex;
      justify-content: center;
      align-items: center;

      .calendar {
        width: 19px;
        height: 19px;
      }

      span {
        padding-left: 4px;
        font-size: 14px;
      }

      .delete {
        width: 24px;
        height: 24px;
      }

      &.ok {
        background: $color-highlight;
      }


      &:nth-child(4), &:nth-child(8), &:nth-child(12), &:nth-child(16) {
        border-right: none;
      }
    }
  }
}

</style>
