<template>
  <div class="ui-example-child ui-example-child-progress">
    <ui-progress
      :value="0.8"
      :width="10"
      :size="100"
      color="url(#linear)"
      border-color="#FFF"
      linecap="butt"
    >
      <span class="progress-value">80%</span>
      <defs slot="defs">
        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stop-color="#FF5257"/>
          <stop offset="100%" stop-color="#FFC541D6"/>
        </linearGradient>
      </defs>
    </ui-progress>
    <ui-progress
      :value="0.8"
      :width="10"
      :size="100"
      :rotate="-90"
      color="#FF5257"
      transition
    >
      <span class="progress-value">
        <ui-amount
          :value="80"
          :precision="0"
          transition
        ></ui-amount>%
      </span>
    </ui-progress>
  </div>
</template>

<script>import {Amount, Progress} from '@csii/vx-mobile'

export default {
  name: 'progress-demo',
  components: {
    [Amount.name]: Amount,
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
