<template>
  <div class="ui-example-child ui-example-child-input-item-3">
    <ui-field title="转出金额(元)">
      <div
        class="field-operator"
        slot="action"
        @click="onClick"
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
        <div class="input-operator" slot="right" @click="takeAll">全部取出</div>
      </ui-input-item>
    </ui-field>
  </div>
</template>

<script>import {ref, computed} from '@vue/composition-api'
import {InputItem, Field, Icon, Toast} from '@csii/vx-mobile'

export default {
  name: 'input-item-demo',
  /* DELETE */
  title: '大尺寸金融表单',
  titleEnUS: 'Large size financial input-item',
  /* DELETE */
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [Icon.name]: Icon,
  },
  setup() {
    const value = ref('')
    const size = computed(() => (value.value.length > 10 ? 'small' : 'large'))
    const takeAll = () => {
      value.value = '300000'
    }
    const onClick = () => {
      Toast({
        content: 'some information',
        icon: 'warn',
      })
    }
    return {
      value,
      size,
      takeAll,
      onClick,
    }
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