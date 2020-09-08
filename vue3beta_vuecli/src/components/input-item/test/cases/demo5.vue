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
        :key="bankCardKey"
        clearable
      >
        <p
          v-if="isError"
          class="error"
          slot="error"
        >
          不支持当前银行<span class="error-action">查看支持银行</span>
        </p>
      </ui-input-item>
    </ui-field>
  </div>
</template>

<script>import {InputItem, Field} from '@csii/vx-mobile'

export default {
  name: 'input-item-demo',
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
  },
  data() {
    return {
      bankCardNo: '',
      bankCardKey: Date.now(),
      isError: false,
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
