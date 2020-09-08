<template>
  <div class="ui-example-child ui-example-child-amount">
    <ui-amount
      :value="1234"
      is-capital
    ></ui-amount>
	</div>
</template>

<script>import {Amount} from '@csii/vx-mobile'

export default {
  name: 'amount-demo',
  /* DELETE */
  title: '大写中文',
  titleEnUS: 'Capital Chinese',
  /* DELETE */
  components: {
    [Amount.name]: Amount,
  },
}
</script>

<style lang="stylus" scoped>
.ui-example-child-amount
  text-align center
  font-size 32px
  color #666
</style>