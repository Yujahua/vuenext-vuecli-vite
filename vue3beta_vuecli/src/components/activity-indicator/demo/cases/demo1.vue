<template>
  <div class="ui-example-child ui-example-child-ui-activity-indicator ui-example-child-ui-activity-indicator-1">
    <ui-activity-indicator
      type="spinner"
      :size="30"
      :text-size="20"
    >加载中...</ui-activity-indicator>
    <div class="activity-indicator-container">
      <ui-activity-indicator
        class="ui-activity-indicator-css"
        type="spinner"
        :size="30"
        :text-size="20"
        color="light"
      >加载中...</ui-activity-indicator>
    </div>
	</div>
</template>

<script>
// import {ActivityIndicator} from '@csii/vx-mobile'
import {ActivityIndicator} from '../../../index'

export default {
  name: 'activity-indicator-demo',
  /* DELETE */
  title: 'Spinner',
  /* DELETE */
  components: {
    [ActivityIndicator.name]: ActivityIndicator,
  },
}

</script>

<style lang="stylus">
.ui-example-child-ui-activity-indicator-1
  display flex
  flex-direction column
  align-items center
  .ui-activity-indicator
    margin-bottom 30px
  .activity-indicator-container
    margin-bottom 30px
    padding 15px 20px
    background rgba(0, 0, 0, .7)
    border-radius 4px
    .ui-activity-indicator-css
      margin-bottom 0
      .ui-activity-indicator-svg
        width 40px !important
        height 40px !important
      .ui-activity-indicator-text
        font-size 28px !important
</style>