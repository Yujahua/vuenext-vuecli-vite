<template>
  <div class="ui-example-child ui-example-child-amount">
    <ui-amount
      :value="1234"
      has-separator
    ></ui-amount>
	</div>
</template>

<script>import {Amount} from '@csii/vx-mobile'

export default {
  name: 'amount-demo',
  /* DELETE */
  title: '千位分隔符',
  titleEnUS: 'Thousands Separator',
  /* DELETE */
  components: {
    [Amount.name]: Amount,
  },
}
</script>

<style lang="stylus" scoped>
.ui-example-child-amount
  text-align center
  color #666
</style>