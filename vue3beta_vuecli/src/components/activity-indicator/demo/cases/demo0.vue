<template>
  <div class="ui-example-child ui-example-child-ui-activity-indicator ui-example-child-ui-activity-indicator-0">
    <ui-activity-indicator
      :size="20"
      :text-size="16"
    >加载中...</ui-activity-indicator>
    <ui-activity-indicator
      :size="20"
      :text-size="16"
      vertical
    >vertical loading</ui-activity-indicator>
    <ui-activity-indicator
      class="ui-activity-indicator-css"
    >loading...</ui-activity-indicator>
	</div>
</template>

<script>
// import {ActivityIndicator} from '@csii/vx-mobile'
import {ActivityIndicator} from '../../../index'

export default {
  name: 'activity-indicator-demo',
  /* DELETE */
  title: 'Roller',
  /* DELETE */
  components: {
    [ActivityIndicator.name]: ActivityIndicator,
  },
}

</script>

<style lang="stylus">
.ui-example-child-ui-activity-indicator-0
  display flex
  flex-direction column
  align-items center
  .ui-activity-indicator
    margin-bottom 30px
    &.ui-activity-indicator-css
      .ui-activity-indicator-svg
        width 60px !important
        height 60px !important
      .ui-activity-indicator-text
        font-size 32px
</style>