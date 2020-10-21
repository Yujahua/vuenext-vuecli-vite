<template>
  <div class="ui-example-child ui-example-child-cell-item ui-example-child-cell-item-2">
    <ui-field>
      <ui-cell-item title="交通银行(尾号3089)" brief="展示摘要描述" />
      <ui-cell-item title="招商银行(尾号2342)" brief="展示摘要描述">
        <slot name="right"><ui-switch v-model="open" /></slot>
      </ui-cell-item>
      <ui-cell-item title="交通银行(尾号3089)" brief="展示摘要描述" addon="附加文案" arrow />
      <ui-cell-item title="交通银行" brief="展示摘要描述" addon="附加文案" arrow>
        <slot name="left"><span class="holder"></span></slot>
      </ui-cell-item>
      <ui-cell-item title="招商银行" brief="展示摘要描述" addon="禁用的项目" disabled arrow>
        <slot name="left"><span class="holder"></span></slot>
      </ui-cell-item>
      <ui-cell-item title="CSII VX MOBILE" brief="A mobile UI toolkit" arrow>
        <slot name="children"><p style="font-size:0.24rem;color:#858B9C;">
          面向金融场景的Vue移动端UI组件库，丰富、灵活、实用，快速搭建优质的金融类产品，让复杂的金融场景变简单。基于「合理、好用」设计价值观，从交互操作、视觉抽象、图形可视等角度共同解决问题。
        </p></slot>
      </ui-cell-item>
    </ui-field>
  </div>
</template>

<script>
import {ref} from 'vue'
import {Field, CellItem, Switch} from '@csii/vx-mobile'

export default {
  name: 'cell-item-demo',
  /* DELETE */
  title: '多行列表',
  titleEnUS: 'Content List',
  align: 'right',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [Switch.name]: Switch,
  },
  setup() {
    return {
      open: ref(false),
    }
  },
}

</script>

<style lang="stylus" scoped>
.holder
  display block
  width 88px
  height 88px
  border-radius 44px
  background-color #E6E6E6
</style>
