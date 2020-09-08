<template>
  <div class="ui-example-child ui-example-child-input-item-1">
    <ui-field>
      <ui-input-item
        ref="name"
        preview-type="text"
        value="张**"
        title="真实姓名"
        placeholder="投保人姓名"
        is-title-latent
      ></ui-input-item>
      <ui-input-item
        ref="id"
        type="bankCard"
        preview-type="text"
        value="6222 **** **** 1234"
        title="银行卡号"
        placeholder="投保人银行卡号"
        is-title-latent
        is-virtual-keyboard
        ></ui-input-item>
    </ui-field>
  </div>
</template>

<script>import {InputItem, Field} from '@csii/vx-mobile'

export default {
  name: 'input-item-demo',
  /* DELETE */
  title: '标题浮动输入框',
  titleEnUS: 'Floating title input',
  /* DELETE */
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
  },
}
</script>

<style lang="stylus">
.ui-example-child-input-item-1
  .ui-field
    padding-bottom 40px
</style>
