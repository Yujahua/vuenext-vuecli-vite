<template>
  <div class="ui-example-child ui-example-child-number-keyboard ui-example-child-number-keyboard-2">
    <ui-button @click="isKeyBoardShow = !isKeyBoardShow">{{ isKeyBoardShow ? '收起键盘' : '唤起键盘' }}</ui-button>
    <ui-number-keyboard
      v-model="isKeyBoardShow"
      ok-text="支付"
      disorder
      @enter="onNumberEnter"
      @delete="onNumberDelete"
    ></ui-number-keyboard>
    <div class="ui-example-display" v-show="isKeyBoardShow" v-text="number"></div>
  </div>
</template>

<script>
import {ref} from 'vue'
import {NumberKeyboard, Button} from '@csii/vx-mobile'

export default {
  name: 'number-keyboard-demo',
  /* DELETE */
  title: '数字键乱序',
  titleEnUS: 'Number keys out of order',
  /* DELETE */
  components: {
    [Button.name]: Button,
    [NumberKeyboard.name]: NumberKeyboard,
  },
  setup() {
    const isKeyBoardShow = ref(false)
    const number = ref('')
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
      number,
      onNumberEnter,
      onNumberDelete,
    }
  },
}

</script>

<style lang="stylus" scoped>
.ui-example-display
  position fixed
  top 30%
  left 50%
  z-index 9999
  transform translate(-50%, -50%)
  font-size 120px
  text-shadow 0 4px 20px #666
</style>
