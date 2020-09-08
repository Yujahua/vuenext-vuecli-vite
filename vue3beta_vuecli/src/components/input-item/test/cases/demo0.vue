<template>
  <div class="ui-example-child ui-example-child-input-item-0">
    <ui-field>
      <ui-input-item
        ref="input0"
        title="普通文本"
        placeholder="普通文本"
        is-amount
        :maxlength="5"
      ></ui-input-item>
      <ui-input-item
        ref="input1"
        title="禁用表单"
        value="禁用表单"
        disabled
      ></ui-input-item>
      <ui-input-item
        ref="input12"
        title="只读表单"
        value="只读表单"
        readonly
      ></ui-input-item>
      <ui-input-item
        ref="input13"
        title="高亮表单"
        placeholder="高亮表单"
        is-highlight
      ></ui-input-item>
      <ui-input-item
        ref="input3"
        title="文本居中"
        placeholder="文本居中"
        align="center"
      ></ui-input-item>
      <ui-input-item
        ref="input4"
        title="文本居右"
        placeholder="文本居右"
        align="right"
      ></ui-input-item>
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
}
</script>