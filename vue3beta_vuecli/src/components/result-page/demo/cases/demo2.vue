<template>
  <div class="ui-example-child ui-example-child-result-page ui-example-child-result-page-2">
    <ui-result-page :buttons="buttons"></ui-result-page>
  </div>
</template>

<script>
import {ResultPage, Toast} from '@csii/vx-mobile'
import {reactive} from 'vue'

export default {
  name: 'result-page-demo',
  /* DELETE */
  title: '按钮',
  titleEnUS: 'With button',
  /* DELETE */
  components: {
    [ResultPage.name]: ResultPage,
  },
  setup() {
    const buttons = reactive([
      {
        text: '普通按钮',
        handler() {
          Toast.succeed('普通操作')
        },
      },
      {
        text: '高亮按钮',
        type: 'primary',
        handler() {
          Toast.succeed('不普通操作')
        },
      },
    ])
    return {
      buttons,
    }
  },
}

</script>

<style lang="stylus">
.ui-example-child-result-page-2
  background #FFF
</style>