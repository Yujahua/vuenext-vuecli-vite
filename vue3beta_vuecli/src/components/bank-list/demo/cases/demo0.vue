<template>
  <div class="md-example-child md-example-child-bank-list">
    <ui-bank-list
      :options="options"></ui-bank-list>
	</div>
</template>

<script>import {reactive} from '@vue/composition-api'
import {BankList} from '@csii/vx-mobile'

export default {
  name: 'bank-list-demo',
  title: '基本/Basic',
  describe: '银行列表',
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
