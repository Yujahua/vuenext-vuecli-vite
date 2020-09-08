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
      ></ui-input-item>
      <ui-input-item
        ref="input11"
        placeholder="left/right slots"
      >
        <ui-icon name="bank-zs" slot="left" svg></ui-icon>
        <ui-icon name="info" slot="right"></ui-icon>
      </ui-input-item>
    </ui-field>
  </div>
</template>

<script>import {InputItem, Field, Icon} from '@csii/vx-mobile'
import '@examples/assets/images/bank-zs.svg'

export default {
  name: 'input-item-demo',
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [Icon.name]: Icon,
  },
}
</script>

<style lang="stylus">
.ui-example-child-input-item-2
  .ui-number-keyboard .ui-popup-box
    max-width 720px
</style>
