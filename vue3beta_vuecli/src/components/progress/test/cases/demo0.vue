<template>
  <div class="ui-example-child ui-example-child-progress">
    <ui-progress
      :size="100"
      :value="0.2"
      :width="5"
    >
      <span class="progress-value">20%</span>
    </ui-progress>
    <ui-progress
      :size="100"
      :value="0.5"
      :width="5"
    >
      <span class="progress-value">50%</span>
    </ui-progress>
    <ui-progress
      :size="100"
      :value="1"
      :width="5"
    >
      <span class="progress-value">100%</span>
    </ui-progress>
  </div>
</template>

<script>import {Progress} from '@csii/vx-mobile'

export default {
  name: 'progress-demo',
  components: {
    [Progress.name]: Progress,
  },
}
</script>

<style lang="stylus">
.ui-example-child-progress
  display flex
  justify-content center
  .ui-progress
    margin 0 10px
  .progress-value
    font-size 24px
    font-family DINPro-Medium
</style>
