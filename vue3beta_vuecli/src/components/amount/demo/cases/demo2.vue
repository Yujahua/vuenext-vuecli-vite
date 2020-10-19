<template>
  <div class="ui-example-child ui-example-child-amount">
    <ui-amount
      :value="val"
      :duration="800"
      transition
    ></ui-amount>
	</div>
</template>

<script>
import {ref, onMounted} from 'vue'
import {Amount} from '@csii/vx-mobile'

export default {
  name: 'amount-demo',
  /* DELETE */
  title: '变化动效',
  titleEnUS: 'Transition',
  /* DELETE */
  components: {
    [Amount.name]: Amount,
  },
  setup() {
    const val = ref(1000)
    onMounted(() => {
      setTimeout(() => {
        val.value = 1500
        setTimeout(() => {
          val.value = 500
        }, 2000)
      }, 2000)
    })
    return {
      val,
    }
  },
}

</script>

<style lang="stylus" scoped>
.ui-example-child-amount
  text-align center
  color #666
</style>