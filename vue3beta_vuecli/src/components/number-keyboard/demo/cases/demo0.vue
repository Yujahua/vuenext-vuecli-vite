<template>
  <div class="ui-example-child ui-example-child-number-keyboard ui-example-child-number-keyboard-0">
    <ui-button @click="toggleKeyboard(0)">{{ isKeyBoardShow[0] ? '收起键盘' : '唤起键盘，有小数点' }}</ui-button>
    <ui-number-keyboard
      v-model="isKeyBoardShow[0]"
      @enter="onNumberEnter"
      @delete="onNumberDelete"
    ></ui-number-keyboard>

    <ui-button @click="toggleKeyboard(1)">{{ isKeyBoardShow[1] ? '收起键盘' : '唤起键盘，无小数点' }}</ui-button>
    <ui-number-keyboard
      v-model="isKeyBoardShow[1]"
      hide-dot
      @enter="onNumberEnter"
      @delete="onNumberDelete"
    ></ui-number-keyboard>

    <ui-button @click="toggleKeyboard(2)">{{ isKeyBoardShow[2] ? '收起键盘' : '唤起键盘，替换键值' }}</ui-button>
    <ui-number-keyboard
      v-model="isKeyBoardShow[2]"
      :text-render="keyFormatter"
      @enter="onNumberEnter"
      @delete="onNumberDelete"
    ></ui-number-keyboard>
    <div class="ui-example-display" v-show="isKeyBoardShow" v-text="number"></div>
  </div>
</template>

<script>
import {ref, reactive, set} from 'vue'
import {NumberKeyboard, Button} from '@csii/vx-mobile'

export default {
  name: 'number-keyboard-demo',
  /* DELETE */
  describe: '有确认键和小数点，一般用于价格或金额输入',
  describeEnUS: 'With confirmation key and decimal point, generally used for price or amount input',
  /* DELETE */
  components: {
    [Button.name]: Button,
    [NumberKeyboard.name]: NumberKeyboard,
  },
  setup() {
    let isKeyBoardShow = reactive([])
    const toggleKeyboard = index => {
      set(isKeyBoardShow, index, !isKeyBoardShow[index])
    }
    const keyFormatter = val => {
      if (val === '.') {
        return 'x'
      }
    }
    let number = ref('')
    const onNumberEnter = val => {
      number.value += val
    }
    const onNumberDelete = () => {
      if (number.value === '') {
        return
      }
      number.value = number.value.substr(0, number.value.length - 1)
    }
    return {
      isKeyBoardShow,
      toggleKeyboard,
      keyFormatter,
      number,
      onNumberEnter,
      onNumberDelete,
    }
  },
}

</script>

<style lang="stylus">
.ui-example-child-number-keyboard-0
  .ui-button
    margin-bottom 10px
  .ui-example-display
    position fixed
    top 30%
    left 50%
    z-index 9999
    transform translate(-50%, -50%)
    font-size 120px
    text-shadow 0 4px 20px #666
</style>
