<template>
  <div class="ui-example-child ui-example-child-result-page ui-example-child-result-page-1">
    <ui-result-page
      type="network"
      subtext="点击屏幕，重新加载">
    </ui-result-page>
  </div>
</template>

<script>import {ResultPage} from '@csii/vx-mobile'

export default {
  name: 'result-page-demo',
  /* DELETE */
  title: '网络异常',
  titleEnUS: 'Network anomaly',
  /* DELETE */
  components: {
    [ResultPage.name]: ResultPage,
  },
}
</script>

<style lang="stylus">
.ui-example-child-result-page-1
  background #FFF
</style>