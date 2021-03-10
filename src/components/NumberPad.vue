<template>
  <div class="numberPadWrapper">
    <label class="notes">
      <span class="iconWrapper"><Icon name="notepad"/></span>
      <span class="name">备注:</span>
      <input type="text" :value="notes" @input="onChange" placeholder="点击写备注...">
      <span class="output">{{ amount }}</span>
    </label>
    <div class="numberPad" @click="onClickButton" ref="numberPad">
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button v-if="selectedDate === now">
        <Icon class="calendar" name="rili"/>
        <span>今天</span>
      </button>
      <button v-else @click="isVisible =true">
        {{ this.selectedDate.replace(/[-]/g, '/') }}
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
      <button class="remove">
        <span>删</span>
        <Icon class="delete" name="backspace"/>
        <span>除</span>
      </button>
      <button v-if="counting" class="ok">=</button>
      <button v-else class="ok">完成</button>
    </div>
    <DatePicker :selected-date.sync="selectedDate" :is-visible.sync="isVisible"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import getLastIndex from '@/lib/getLastIndex';
import addBits from '@/lib/addBits';
import {Component, Prop} from 'vue-property-decorator';
import DatePicker from '@/components/DatePicker.vue';
import dayjs from 'dayjs';

@Component({
  components: {DatePicker}
})
export default class NumberPad extends Vue {
  @Prop() readonly notes!: string;
  isVisible = false;
  counting = false;
  amount = '0';
  now = dayjs().format('YYYY-MM-DD');
  selectedDate = this.now;

  onChange(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    this.$emit('update:notes', input.value);
  }

  amountLastIndex() {
    return [getLastIndex(/[+-]/gi, this.amount), getLastIndex(/[.]/gi, this.amount)];
  }

  countingToggle(index: number) {
    this.counting = index > 0 && index < this.amount.length - 1;
  }

  onClickButton(e: MouseEvent) {
    let text;
    let t = e.target as HTMLButtonElement;
    while (!t.matches('button')) {
      if (t === this.$refs.numberPad) {
        t = null;
        break;
      }
      t = t.parentNode;
    }
    if (t) {text = t.textContent;}
    if (text) {
      this.count(text);
    }
  }

  count(text: string) {
    const index = this.amountLastIndex();
    if ('0123456789'.indexOf(text) >= 0) {
      if (this.amount.length >= 10) {return;}
      if (this.amount === '0') {
        this.amount = text;
      } else if (text === '0' && index[0] === this.amount.length - 2) {
        return;
      } else if (index[0] !== this.amount.length - 1 && index[1] === this.amount.length - 3) {
        return;
      } else {
        this.amount += text;
      }
    } else if (text === '.') {
      if (this.amount.length >= 10) {return;}
      if (this.amount.indexOf(text) >= 0 && index[0] < 0) {
        return;
      } else {
        const num = this.amount.split('.').length - 1;
        if (num < 2) {
          this.amount += text;
        }
      }
    } else if ('+-'.indexOf(text) >= 0) {
      if (index[0] >= 0) {
        if (index[0] === this.amount.length - 1) {
          this.amount = (this.amount.slice(0, -1) + text);
        } else {
          this.amount = this.cutAmount(addBits(this.amount));
          this.counting = false;
          this.amount += text;
        }
        return;
      } else {
        this.amount += text;
      }
    } else if (text === '=') {
      this.amount = this.cutAmount(addBits(this.amount));
    } else if (text === '删除') {
      this.remove();
    } else if (text === '完成') {
      if (index[0] === this.amount.length - 1 || this.amount.slice(-1) === '.') {
        this.amount = this.amount.slice(0, -1);
      } else {
        return;
      }
    } else if (text === '今天') {
      this.isVisible = true;
    }
    this.countingToggle(index[0]);
  }

  cutAmount(value: string) {
    if (value.indexOf('.') >= 0) {
      const n = parseFloat(value).toFixed(2);
      if (n.slice(-1) === '0') {
        return n.slice(0, -1);
      } else {
        return n;
      }
    } else {
      return value.toString();
    }
  }

  remove() {
    if (this.amount.length === 1) {
      this.amount = '0';
    } else {
      this.amount = this.amount.slice(0, -1);
    }
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
      min-width: 20px;
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

      &.remove {
        span {
          visibility: hidden;
        }
      }

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
