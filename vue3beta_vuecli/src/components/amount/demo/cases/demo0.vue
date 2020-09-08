<template>
  <div class="ui-example-child ui-example-child-amount">
    <p>
      <span class="describe">Original</span>
      <ui-amount :value="1234.125" :precision="3"></ui-amount>
    </p>
    <p>
      <span class="describe">Round</span>
      <ui-amount :value="1234.125"></ui-amount>
    </p>
    <p>
      <span class="describe">Floor</span>
      <ui-amount :value="1234.123" :is-round-up="false"></ui-amount>
    </p>
	</div>
</template>

<script>import {Amount} from '@csii/vx-mobile'

export default {
  name: 'amount-demo',
  components: {
    [Amount.name]: Amount,
  },
}
</script>

<style lang="stylus" scoped>
.ui-example-child-amount
  text-align center
  color #666
  p
    font-size 50px
    span.describe
      font-size 18px
</style>