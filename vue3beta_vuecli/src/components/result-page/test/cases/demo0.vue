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
  components: {
    [ResultPage.name]: ResultPage,
  },
}
</script>

<style lang="stylus">
.ui-result-page.customized
  img
    height 131px
</style>