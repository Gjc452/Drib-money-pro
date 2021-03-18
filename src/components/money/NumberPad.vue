<template>
  <div class="numberPadWrapper">
    <label class="notes">
      <span class="iconWrapper"><Icon name="icon-notepad"/></span>
      <span class="name">备注:</span>
      <input type="text" :value="notes" @input="onChange" placeholder="点击写备注...">
      <span class="output">{{ input }}</span>
    </label>
    <div class="numberPad" @click="onClickButton" ref="numberPad">
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button v-if="selectedDate === now">
        <Icon class="calendar" name="icon-rili"/>
        <span>今天</span>
      </button>
      <button v-else @click="openDate">
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
        <Icon class="delete" name="icon-backspace"/>
        <span>除</span>
      </button>
      <button v-if="counting" class="ok">=</button>
      <button v-else class="ok">完成</button>
    </div>
    <yd-datetime v-show="false" type="date" ref="datetime" v-model="selectedDate" slot="right"></yd-datetime>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import getLastIndex from '@/lib/getLastIndex';
import addBits from '@/lib/addBits';
import {Component, Prop, Watch} from 'vue-property-decorator';
import dayjs from 'dayjs';

@Component
export default class NumberPad extends Vue {
  @Prop(String) readonly notes!: string;
  @Prop(String) readonly createAt!: string;
  @Prop(String) readonly amount!: string;
  counting = false;
  input = this.amount;
  now = dayjs().format('YYYY-MM-DD');
  selectedDate = this.createAt;

  @Watch('selectedDate')
  update() {
    this.$emit('update:createAt', this.selectedDate);
  }

  onChange(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    this.$emit('update:notes', input.value);
  }

  openDate() {
    this.$refs.datetime.open();
  }

  countingToggle(index: number) {
    this.counting = index > 0 && index < this.input.length - 1;
  }

  onClickButton(e: MouseEvent) {
    let text, t = e.target as HTMLButtonElement;
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
    const index = [getLastIndex(/[+-]/gi, this.input), getLastIndex(/[.]/gi, this.input)];
    if ('0123456789'.indexOf(text) >= 0) {
      if (this.input.length >= 10) {return;}
      if (this.input === '0') {
        this.input = text;
      } else if (text === '0' && index[0] === this.input.length - 2 && this.input.slice(-1) === '0') {
        return;
      } else if (index[0] !== this.input.length - 1 && index[1] === this.input.length - 3) {
        return;
      } else {
        this.input += text;
      }
    } else if (text === '.') {
      if (this.input.length >= 10) {return;}
      if (this.input.indexOf(text) >= 0 && index[0] < 0) {
        return;
      } else {
        const num = this.input.split('.').length - 1;
        if (num < 2) {
          this.input += text;
        }
      }
    } else if ('+-'.indexOf(text) >= 0) {
      if (index[0] >= 0) {
        if (index[0] === this.input.length - 1) {
          this.input = (this.input.slice(0, -1) + text);
        } else {
          this.input = this.cutAmount(addBits(this.input));
          this.counting = false;
          this.input += text;
        }
        return;
      } else {
        this.input += text;
      }
    } else if (text === '=') {
      this.input = this.cutAmount(addBits(this.input));
    } else if (text === '删除') {
      this.remove();
    } else if (text === '完成') {
      if (index[0] === this.input.length - 1 || this.input.slice(-1) === '.') {
        this.input = this.input.slice(0, -1);
      } else {
        this.$emit('submit', this.input);
      }
    } else if (text === '今天') {
      this.openDate();
    }
    this.countingToggle(index[0]);
    this.$emit('update:amount', this.input);
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
    if (this.input.length === 1) {
      this.input = '0';
    } else {
      this.input = this.input.slice(0, -1);
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
