<template>
  <div class="md-example-child md-example-child-bank-list">
    <ui-bank-list
      :options="options"></ui-bank-list>
	</div>
</template>

<script>
import {reactive} from 'vue'
import {BankList} from '@csii/vx-mobile'

export default {
  name: 'bank-list-demo',
  /* DELETE */
  title: '基本/Basic',
  describe: '银行列表',
  /* DELETE */
  components: {
    [BankList.name]: BankList,
  },
  setup() {
    const options = reactive([
      {
        content: '内容',
        fontSize: 16,
        color: '#000',
      },
    ])
    return {
      options,
    }
  },
}

</script>

<style lang="stylus" scoped>
</style>
