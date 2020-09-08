<template>
  <div class="ui-example-child ui-example-child-input-item-3">
    <ui-field title="转出金额(元)">
      <div
        class="field-operator"
        slot="action"
      >
        <ui-icon name="info"></ui-icon>
      </div>
      <ui-input-item
        type="money"
        v-model="value"
        brief="理财提示文案，字符超出10个自动变小"
        placeholder="最多30万元"
        :size="size"
        is-amount
        is-highlight
      >
        <div class="input-operator" slot="right">全部取出</div>
      </ui-input-item>
    </ui-field>
  </div>
</template>

<script>import {InputItem, Field, Icon} from '@csii/vx-mobile'

export default {
  name: 'input-item-demo',
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [Icon.name]: Icon,
  },
  data() {
    return {
      value: '',
    }
  },
  computed: {
    size() {
      return this.value.length > 10 ? 'small' : 'large'
    },
  },
}
</script>

<style lang="stylus">
.ui-example-child-input-item-3
  .ui-field
    padding-bottom 20px
    .ui-field-title
      .value
        display flex
        align-items center
        justify-content flex-end
        .field-operator
          display flex
          align-items center
    .ui-field-item-content::before
      background-color #C5CAD5
    .input-operator
      font-size 28px
      color #5878B4
</style>