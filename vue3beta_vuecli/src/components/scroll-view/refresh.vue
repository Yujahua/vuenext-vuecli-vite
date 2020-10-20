<template>
  <div class="ui-scroll-view-refresh">
    <ui-activity-indicator-rolling
      :process="!isRefreshing ? process : undefined"
      :width="10"
      :color="rollerColor"
    ></ui-activity-indicator-rolling>
    <p class="refresh-tip">{{ refreshTip }}</p>
  </div>
</template>

<script>
import {computed, getCurrentInstance} from 'vue'
import Roller from '../activity-indicator/roller'

export default {
  name: 'ui-scroll-view-refresh',

  components: {
    [Roller.name]: Roller,
  },

  props: {
    scrollTop: {
      type: Number,
      default: 0,
    },
    isRefreshing: {
      type: Boolean,
      default: false,
    },
    isRefreshActive: {
      type: Boolean,
      default: false,
    },
    refreshText: {
      type: String,
      default: '下拉刷新',
    },
    refreshActiveText: {
      type: String,
      default: '释放刷新',
    },
    refreshingText: {
      type: String,
      default: '刷新中...',
    },
    rollerColor: {
      type: String,
      default: '#2F86F6',
    },
  },
  setup(props) {
    const that = getCurrentInstance()
    const process = computed(() => {
      /* istanbul ignore if */
      if (!that.$el || !props.scrollTop) {
        return +props.scrollTop
      }

      const refreshHeight = that.$el.clientHeight

      if (Math.abs(props.scrollTop) < refreshHeight / 2) {
        return 0
      }
      // first 1/3 is not included in progress
      return (Math.abs(props.scrollTop) - refreshHeight / 2) / (refreshHeight / 2)
    })
    const refreshTip = computed(() => {
      if (props.isRefreshing) {
        return props.refreshingText
      } else if (props.isRefreshActive) {
        return props.refreshActiveText
      } else {
        return props.refreshText
      }
    })
    return {
      process,
      refreshTip,
    }
  },
}

</script>

<style lang="stylus">
.ui-scroll-view-refresh
  display flex
  padding 50px 0
  justify-content center
  align-items center
  overflow hidden
  .ui-activity-indicator-rolling
    .ui-activity-indicator-svg
      width 32px !important
      height 32px !important
      transform rotateZ(-45deg)
  .refresh-tip
    margin-left 15px
    font-size 24px
    color #999
</style>
