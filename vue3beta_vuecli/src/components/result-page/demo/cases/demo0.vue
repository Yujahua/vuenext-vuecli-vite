<template>
  <div class="ui-example-child ui-example-child-result-page ui-example-child-result-page-0">
    <ui-result-page
      type="lost">
    </ui-result-page>
  </div>
</template>

<script>import {ResultPage} from '@csii/vx-mobile'

export default {
  name: 'result-page-demo',
  /* DELETE */
  title: '404',
  /* DELETE */
  components: {
    [ResultPage.name]: ResultPage,
  },
}
</script>

<style lang="stylus">
.ui-example-child-result-page-0
  background #FFF
</style>