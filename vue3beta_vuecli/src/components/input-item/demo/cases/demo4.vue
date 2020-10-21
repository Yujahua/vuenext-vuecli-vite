<template>
  <div class="ui-example-child ui-example-child-input-item-4">
    <ui-field>
      <ui-input-item
        ref="input9"
        title="清空按钮"
        placeholder="normal text"
        clearable
      ></ui-input-item>

      <ui-input-item
        ref="input10"
        title="金融键盘"
        placeholder="financial number keyboard"
        is-virtual-keyboard
        clearable
        @focus="onFakeInputFocus"
        @blur="onFakeInputBlur"
      ></ui-input-item>

      <ui-input-item
        ref="input11"
        title="自定义键盘"
        placeholder="custom number keyboard"
        is-virtual-keyboard
        virtual-keyboard-vm="myNumberKeyBoard"
        clearable
      ></ui-input-item>
      <ui-number-keyboard type="simple" ref="myNumberKeyBoard"></ui-number-keyboard>

      <ui-input-item
        ref="input11"
        placeholder="left/right slots"
      >
        <slot name="left"><ui-icon name="bank-zs" svg></ui-icon></slot>
        <slot name="right"><ui-icon name="info" @click.enter="onClick"></ui-icon></slot>
      </ui-input-item>
    </ui-field>
  </div>
</template>

<script>
import {getCurrentInstance} from 'vue'
import {InputItem, NumberKeyboard, Field, Icon, Toast} from '@csii/vx-mobile'
import '@examples/assets/images/bank-zs.svg'

export default {
  name: 'input-item-demo',
  /* DELETE */
  title: '表单控件',
  titleEnUS: 'Input with controls',
  message: '请在移动设备中扫码预览',
  messageEnUS: 'Please scan QR code and preview on mobile device',
  /* DELETE */
  components: {
    [InputItem.name]: InputItem,
    [NumberKeyboard.name]: NumberKeyboard,
    [Field.name]: Field,
    [Icon.name]: Icon,
  },
  setup() {
    const onClick = () => {
      Toast({
        content: 'some information',
        icon: 'warn',
      })
    }
    const onFakeInputFocus = () => {}
    const that = getCurrentInstance()
    const onFakeInputBlur = () => {
      that.scrollInputBack && that.scrollInputBack()
    }
    return {
      onClick,
      onFakeInputFocus,
      onFakeInputBlur,
    }
  },
}

</script>

<style lang="stylus">
.ui-example-child-input-item-2
  .ui-number-keyboard .ui-popup-box
    max-width 720px
</style>
