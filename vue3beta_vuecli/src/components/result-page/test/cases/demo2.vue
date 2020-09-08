<template>
  <div class="ui-example-child ui-example-child-result-page ui-example-child-result-page-2">
    <ui-result-page :buttons="buttons"></ui-result-page>
  </div>
</template>

<script>import {ResultPage, Toast} from '@csii/vx-mobile'

export default {
  name: 'result-page-demo',
  components: {
    [ResultPage.name]: ResultPage,
  },
  data() {
    return {
      buttons: [
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
      ],
    }
  },
}
</script>

<style lang="stylus">
.ui-result-page.customized
  img
    height 131px
</style>