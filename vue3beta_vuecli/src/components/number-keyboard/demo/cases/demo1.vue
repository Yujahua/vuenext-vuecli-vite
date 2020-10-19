<template>
  <div class="ui-example-child ui-example-child-number-keyboard ui-example-child-number-keyboard-1">
    <ui-button @click="isKeyBoardShow = !isKeyBoardShow">{{ isKeyBoardShow ? '收起键盘' : '唤起键盘' }}</ui-button>
    <ui-number-keyboard
      v-model="isKeyBoardShow"
      type="simple"
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
  title: '简单类型',
  titleEnUS: 'Simple type',
  describe: '无确认键和小数点，一般用于密码或验证码输入',
  describeEnUS: 'No confirmation key and decimal point, generally used for password or verification code input',
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
