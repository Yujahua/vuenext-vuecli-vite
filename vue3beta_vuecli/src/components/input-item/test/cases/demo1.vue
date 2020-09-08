<template>
  <div class="ui-example-child ui-example-child-input-item-1">
    <ui-field>
      <ui-input-item
        ref="name"
        title="真实姓名"
        placeholder="投保人姓名"
        is-title-latent
        clearable
      ></ui-input-item>
      <ui-input-item
        ref="id"
        title="身份证号"
        placeholder="投保人身份证号"
        is-title-latent
        clearable
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

<style lang="stylus">
.ui-example-child-input-item-1
  .ui-field
    padding-bottom 40px
</style>
