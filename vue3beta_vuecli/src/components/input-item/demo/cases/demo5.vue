<template>
  <div class="ui-example-child ui-example-child-input-item-5">
    <ui-field>
      <ui-input-item
        type="phone"
        title="手机号码"
        value="1999999999999"
        error="手机号码无效"
        clearable
      ></ui-input-item>
      <ui-input-item
        type="bankCard"
        title="储蓄卡号"
        v-model="bankCardNo"
        clearable
        @blur="checkBankCard"
      >
      <slot name="error">
        <p
          v-if="isError"
          class="error"
        >
          不支持当前银行<span class="error-action" @click="bankCardTip">查看支持银行</span>
        </p>
      </slot>
      </ui-input-item>
    </ui-field>
  </div>
</template>

<script>
import {ref} from 'vue'
import {InputItem, Field, Dialog} from '@csii/vx-mobile'

export default {
  name: 'input-item-demo',
  /* DELETE */
  title: '错误提示',
  titleEnUS: 'Input with error message',
  /* DELETE */
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
  },
  setup() {
    const bankCardNo = ref('')
    const isError = ref(false)
    const checkBankCard = () => {
      if (bankCardNo.value && bankCardNo.value.substr(0, 4) !== '6222') {
        isError.value = true
      } else {
        isError.value = false
      }
    }
    const bankCardTip = () => {
      Dialog.alert({
        content: '以6222开头',
      })
    }
    return {
      bankCardNo,
      isError,
      checkBankCard,
      bankCardTip,
    }
  },
}

</script>

<style lang="stylus">
.ui-example-child-input-item-5
  .error
    float left
    width 100%
    .error-action
      float right
      color #5878B4
</style>
