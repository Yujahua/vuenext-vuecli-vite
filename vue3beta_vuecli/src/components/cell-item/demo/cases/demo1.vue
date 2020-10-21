<template>
  <div class="ui-example-child ui-example-child-cell-item ui-example-child-cell-item-1">
    <ui-field>
      <ui-cell-item title="余额" addon="可用8000.34" arrow />
      <ui-cell-item title="余额" addon="可用8000.34" />
      <ui-cell-item title="使用余额">
        <solt name="right"><ui-switch v-model="open" /></solt>
      </ui-cell-item>
      <ui-cell-item title="使用余额" disabled>
        <solt name="right"><ui-switch :value="true" disabled/></solt>
      </ui-cell-item>
      <ui-cell-item title="余额" addon="可用8000.34" arrow no-border>
        <solt class="holder" name="left"></solt>
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
  title: '单行列表',
  titleEnUS: 'Simple List',
  align: 'left',
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
  width 48px
  height 48px
  background-color #E6E6E6
</style>
