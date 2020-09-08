<template>
  <div class="ui-example-child ui-example-child-cell-item ui-example-child-cell-item-1">
    <ui-field>
      <ui-cell-item title="滴水贷" addon="可用8000.34" arrow />
      <ui-cell-item title="滴水贷" addon="可用8000.34" />
      <ui-cell-item title="信用付">
        <ui-switch slot="right" v-model="open" />
      </ui-cell-item>
      <ui-cell-item title="信用付" disabled>
        <ui-switch slot="right" :value="true" disabled/>
      </ui-cell-item>
      <ui-cell-item title="滴水贷" addon="可用8000.34" arrow>
        <div class="holder" slot="left"></div>
      </ui-cell-item>
      <ui-cell-item title="信用付" addon="可用8000.34" arrow>
        <div class="holder" slot="left"></div>
      </ui-cell-item>
    </ui-field>
  </div>
</template>

<script>import {Field, CellItem, Switch} from '@csii/vx-mobile'

export default {
  name: 'cell-item-demo',
  components: {
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [Switch.name]: Switch,
  },
  data() {
    return {
      open: false,
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
