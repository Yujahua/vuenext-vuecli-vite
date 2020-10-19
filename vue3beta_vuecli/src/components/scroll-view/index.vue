<template>
  <div
    class="ui-scroll-view"
    @touchstart="onScrollerTouchStart"
    @touchmove="onScrollerTouchMove"
    @touchend="onScrollerTouchEnd"
    @touchcancel="onScrollerTouchEnd"
    @mousedown="onScrollerMouseDown"
    @mousemove="onScrollerMouseMove"
    @mouseup="onScrollerMouseUp"
    @mouseleave="onScrollerMouseUp"
  >
    <div class="scroll-view-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div
      class="scroll-view-container"
      :class="{
        'horizon': scrollingX && !scrollingY
      }"
    >
      <div
        v-if="hasRefresher"
        class="scroll-view-refresh"
        :class="{
          'refreshing': isRefreshing,
          'refresh-active': isRefreshActive,
        }"
      >
        <slot
          name="refresh"
          :scroll-top="scrollY"
          :is-refreshing="isRefreshing"
          :is-refresh-active="isRefreshActive"
        ></slot>
      </div>
      <slot></slot>
      <div
        v-if="hasMore"
        :class="{active: isEndReachingStart || isEndReaching}"
        class="scroll-view-more"
      >
        <slot name="more" :is-end-reaching="isEndReachingStart || isEndReaching"></slot>
      </div>
    </div>
    <div class="scroll-view-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  computed,
  onMounted,
  getCurrentInstance,
  ref,
  nextTick,
  onUnmounted,
} from 'vue'
import {debounce} from '../_util'
import Scroller from '../_util/scroller'
import {render} from '../_util/render'

export default {
  name: 'ui-scroll-view',
  props: {
    scrollingX: {
      type: Boolean,
      default: true,
    },
    scrollingY: {
      type: Boolean,
      default: true,
    },
    bouncing: {
      type: Boolean,
      default: true,
    },
    autoReflow: {
      type: Boolean,
      default: false,
    },
    manualInit: {
      type: Boolean,
      default: false,
    },
    endReachedThreshold: {
      type: Number,
      default: 0,
    },
    immediateCheckEndReaching: {
      type: Boolean,
      default: false,
    },
    touchAngle: {
      type: Number,
      default: 45,
    },
    isPrevent: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, {slots, emit}) {
    const state = reactive({
      container: null,
      content: null,
      refresher: null,
      more: null,
      scroller: null,
      refreshOffsetY: 0,
      isInitialed: false,
      isMouseDown: false,
      isRefreshing: false,
      isRefreshActive: false,
      isEndReachingStart: false,
      isEndReaching: false,
      scrollX: null,
      scrollY: null,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      containerW: 0,
      containerH: 0,
      contentW: 0,
      contentH: 0,
      reflowTimer: null,
      endReachedHandler: null,
    })
    const moreOffsetY = ref(null)
    const that = getCurrentInstance()
    const hasRefresher = computed(() => !!slots.refresh)
    const hasMore = computed(() => !!slots.more)
    const checkScrollerEnd = () => {
      if (!state.scroller) {
        return
      }
      const containerHeight = state.scroller._clientHeight
      const content = state.scroller._contentHeight
      const top = state.scroller._scrollTop
      const getMoreOffsetY = moreOffsetY.value
      const moreThreshold = props.endReachedThreshold
      const endOffset = content - containerHeight - (top + getMoreOffsetY + moreThreshold)
      if (top >= 0 && !state.isEndReaching && endOffset <= 0 && state.endReachedHandler) {
        // First prepare for "load more" state
        state.isEndReachingStart = true
        // Second enter "load more" state
        // & trigger endReached event only once after the rebounding animation
        state.endReachedHandler()
      }
    }
    const onScroll = (left, top) => {
      left = +left.toFixed(2)
      top = +top.toFixed(2)
      if (state.scrollX === left && state.scrollY === top) {
        return
      }
      state.scrollX = left
      state.scrollY = top
      checkScrollerEnd()
      emit('scroll', {scrollLeft: left, scrollTop: top})
    }
    const reflowScroller = (force = false) => {
      const container = state.container
      const content = state.content
      /* istanbul ignore if */
      if (!state.scroller || !container || !content) {
        return
      }
      nextTick(() => {
        const containerW = container.clientWidth
        const containerH = container.clientHeight
        const contentW = content.offsetWidth
        const contentH = content.offsetHeight

        if (
          force ||
          state.containerW !== containerW ||
          state.containerH !== containerH ||
          state.contentW !== contentW ||
          state.contentH !== contentH
        ) {
          state.scroller.setDimensions(
            container.clientWidth,
            container.clientHeight,
            content.offsetWidth,
            content.offsetHeight,
          )
          state.containerW = containerW
          state.containerH = containerH
          state.contentW = contentW
          state.contentH = contentH
        }
      })
    }
    const initAutoReflow = () => {
      state.reflowTimer = setInterval(() => {
        reflowScroller()
      }, 100)
    }
    const initScroller = () => {
      /* istanbul ignore if */
      if (state.isInitialed) {
        return
      }
      state.container = that.$el
      state.refresher = that.$el.querySelector('.scroll-view-refresh')
      state.more = that.$el.querySelector('.scroll-view-more')
      state.content = that.$el.querySelector('.scroll-view-container')
      state.refreshOffsetY = state.refresher ? state.refresher.clientHeight : 0
      moreOffsetY.value = state.more ? state.more.clientHeight : 0
      const container = state.container
      const content = state.content
      const rect = container.getBoundingClientRect()
      const scroller = new Scroller(
        (left, top) => {
          render(content, left, top)
          if (state.isInitialed) {
            onScroll(left, top)
          }
        },
        {
          scrollingX: props.scrollingX,
          scrollingY: props.scrollingY,
          bouncing: props.bouncing,
          zooming: false,
          animationDuration: 200,
          speedMultiplier: 1.2,
          inRequestAnimationFrame: true,
        },
      )
      scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop)
      if (hasRefresher.value) {
        scroller.activatePullToRefresh(
          state.refreshOffsetY,
          () => {
            state.isRefreshActive = true
            state.isRefreshing = false
          },
          () => {
            state.isRefreshActive = false
            state.isRefreshing = false
            emit('refreshActive')
          },
          () => {
            state.isRefreshActive = false
            state.isRefreshing = true
            emit('refreshing')
          },
        )
      }
      state.scroller = scroller
      reflowScroller(true)
      props.autoReflow && initAutoReflow()
      state.endReachedHandler = debounce(() => {
        state.isEndReaching = true
        emit('endReached')
        emit('end-reached')
      }, 50)

      setTimeout(() => {
        state.isInitialed = true
      }, 50)

      if (props.immediateCheckEndReaching) {
        nextTick(checkScrollerEnd)
      }
    }
    onMounted(() => {
      if (!props.manualInit) {
        initScroller()
      }
    })
    onUnmounted(() => {
      state.reflowTimer && clearInterval(state.reflowTimer)
    })
    const getScrollerAngle = () => {
      const diffX = state.currentX - state.startX
      const diffY = state.currentY - state.startY
      const angle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI
      return props.scrollingX ? 90 - angle : angle
    }
    const onScrollerTouchStart = event => {
      // event.target.tagName && event.target.tagName.match(/input|textarea|select/i)
      /* istanbul ignore if */
      if (!state.scroller) {
        return
      }
      state.startX = event.targetTouches[0].pageX
      state.startY = event.targetTouches[0].pageY
      state.scroller.doTouchStart(event.touches, event.timeStamp)
    }
    const onScrollerTouchMove = event => {
      /* istanbul ignore if */
      if (!state.scroller) {
        return
      }
      let hadPrevent = false

      if (props.isPrevent && event.cancelable) {
        event.preventDefault()

        hadPrevent = true
      }

      state.currentX = event.targetTouches[0].pageX
      state.currentY = event.targetTouches[0].pageY

      if (!props.scrollingX || !props.scrollingY) {
        const currentTouchAngle = getScrollerAngle()
        if (currentTouchAngle < props.touchAngle) {
          return
        }
      }

      if (!hadPrevent && event.cancelable) {
        event.preventDefault()
      }

      state.scroller.doTouchMove(event.touches, event.timeStamp, event.scale)

      const boundaryDistance = 15
      const scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop

      const pX = state.currentX - scrollLeft
      const pY = state.currentY - scrollTop
      if (
        pX > document.documentElement.clientWidth - boundaryDistance ||
        pY > document.documentElement.clientHeight - boundaryDistance ||
        pX < boundaryDistance ||
        pY < boundaryDistance
      ) {
        state.scroller.doTouchEnd(event.timeStamp)
      }
    }
    const onScrollerTouchEnd = event => {
      /* istanbul ignore if */
      if (!state.scroller) {
        return
      }
      state.scroller.doTouchEnd(event.timeStamp)
    }
    const onScrollerMouseDown = event => {
      /* istanbul ignore if */
      if (!state.scroller) {
        return
      }
      state.startX = event.pageX
      state.startY = event.pageY
      state.scroller.doTouchStart(
        [
          {
            pageX: event.pageX,
            pageY: event.pageY,
          },
        ],
        event.timeStamp,
      )
      state.isMouseDown = true
    }
    const onScrollerMouseMove = event => {
      /* istanbul ignore if */
      if (!state.scroller || !state.isMouseDown) {
        return
      }

      state.currentX = event.pageX
      state.currentY = event.pageY
      if (!props.scrollingX || !props.scrollingY) {
        const currentTouchAngle = getScrollerAngle()
        if (currentTouchAngle < props.touchAngle) {
          return
        }
      }
      state.scroller.doTouchMove(
        [
          {
            pageX: event.pageX,
            pageY: event.pageY,
          },
        ],
        event.timeStamp,
      )
      state.isMouseDown = true
    }
    const onScrollerMouseUp = event => {
      /* istanbul ignore if */
      if (!state.scroller || !state.isMouseDown) {
        return
      }
      state.scroller.doTouchEnd(event.timeStamp)
      state.isMouseDown = false
    }
    const init = () => {
      nextTick(() => {
        initScroller()
      })
    }
    const scrollTo = (left, top, animate = false) => {
      /* istanbul ignore if */
      if (!state.scroller) {
        return
      }
      state.scroller.scrollTo(left, top, animate)
    }
    const triggerRefresh = () => {
      /* istanbul ignore if */
      if (!state.scroller) {
        return
      }
      state.scroller.triggerPullToRefresh()
    }
    const finishRefresh = () => {
      /* istanbul ignore if */
      if (!state.scroller) {
        return
      }
      state.scroller.finishPullToRefresh()
      reflowScroller()
    }
    const finishLoadMore = () => {
      /* istanbul ignore if */
      if (!state.scroller) {
        return
      }
      state.isEndReachingStart = false
      state.isEndReaching = false
      reflowScroller()
    }
    return {
      ...toRefs(state),
      hasRefresher,
      hasMore,
      checkScrollerEnd,
      onScroll,
      initScroller,
      reflowScroller,
      initAutoReflow,
      getScrollerAngle,
      onScrollerTouchStart,
      onScrollerTouchMove,
      onScrollerTouchEnd,
      onScrollerMouseDown,
      onScrollerMouseMove,
      onScrollerMouseUp,
      init,
      scrollTo,
      triggerRefresh,
      finishRefresh,
      finishLoadMore,
    }
  },
}

</script>

<style lang="stylus">
.ui-scroll-view
  position relative
  display block
  height 100%
  overflow hidden
  user-select none
  .scroll-view-header, .scroll-view-footer
    position absolute
    left 0
    right 0
    z-index 2
  .scroll-view-header
    top 0
  .scroll-view-footer
    bottom 0
  .scroll-view-container
    clearfix()
    position relative
    z-index 1
    // display inline-block
    .scroll-view-refresh
      clearfix()
      position absolute
      left 0
      right 0
      transform translate3d(0, -100%, 0)
    .scroll-view-more
      visibility hidden
      &.active
        visibility visible
    &.horizon
      display inline-block
</style>
