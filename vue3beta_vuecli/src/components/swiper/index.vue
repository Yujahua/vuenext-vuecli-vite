<template>
  <div
    class="ui-swiper"
    :class="{'ui-swiper-vertical': isVertical, 'ui-swiper-fade': !isSlide, 'disabled': !isInitial}"
    @mousedown="onDragStart"
    @mousemove="onDragMove"
    @mouseup="onDragEnd"
    @mouseleave="onDragEnd"
    @touchstart="onDragStart"
    @touchmove="onDragMove"
    @touchend="onDragEnd"
    @touchcancel="onDragEnd"
  >
    <div class="ui-swiper-box">
      <div class="ui-swiper-container">
        <slot></slot>
      </div>
    </div>
    <div class="ui-swiper-indicators" :class="{'disabled': !hasDots}" v-if="oItemCount > 1 && hasDots">
      <template>
        <div
          v-for="index in oItemCount"
          class="ui-swiper-indicator"
          :key="index"
          :class="{ 'ui-swiper-indicator-active': index - 1 === realIndex }"
          ></div>
      </template>
    </div>
  </div>
</template>

<script>
import {reactive, onMounted, toRefs, computed, getCurrentInstance, onUnmounted} from 'vue'
import Scroller from '../_util/scroller'
import {render} from '../_util/render'
import {warn, debounce} from '../_util'

// scale of sliding distance & touch duration that triggers page turning
const PAGING_SCALE = 0.5
const PAGING_DURATION = 300

export default {
  name: 'ui-swiper',

  // components: {
  // },

  props: {
    autoplay: {
      type: Number,
      default: 3000,
      validator: function(value) {
        if (value === 0) {
          return true
        }
        return value >= 500
      },
    },
    transition: {
      type: String,
      default: 'slide',
      validator: function(value) {
        return ['slide', 'slideY', 'fade'].indexOf(value) > -1
      },
    },
    transitionDuration: {
      type: Number,
      default: 250,
    },
    defaultIndex: {
      // display index
      type: Number,
      default: 0,
      validator: function(value) {
        return value > -1
      },
    },
    hasDots: {
      type: Boolean,
      default: true,
    },
    isPrevent: {
      type: Boolean,
      default: true,
    },
    isLoop: {
      type: Boolean,
      default: true,
    },
    dragable: {
      type: Boolean,
      default: true,
    },
    useNativeDriver: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, {emit}) {
    let resizeTimeout,
      rootEl = getCurrentInstance()
    let state = reactive({
      ready: false,
      dragging: false,
      userScrolling: null,
      isInitial: false,
      index: 0, // real index (swiper perspective)
      fromIndex: 0, // display index (user perspective)
      toIndex: 0, // display index
      firstIndex: 0, // display index
      lastIndex: 0, // display index
      oItemCount: 0, // original item count
      rItemCount: 0, // real item count
      dimension: 0,
      dragState: {},
      touchAngle: 45,
      timer: null,
      noDrag: false,
      scroller: null,
      isStoped: false,
      $swiper: null,
      transitionEndHandler: null,
      isSlide: '',
      isVertical: '',
      isLastItem: '',
      isFirstItem: '',
      realIndex: '',
    })

    state.isSlide = computed(() => props.transition.toLowerCase().indexOf('slide') > -1)
    state.isVertical = computed(() => props.transition === 'slideY')
    state.isLastItem = computed(() => state.index === state.rItemCount - 1)
    state.isFirstItem = computed(() => state.index === 0)
    const getDimension = () => {
      state.dimension = state.isVertical ? rootEl.$el.clientHeight : rootEl.$el.clientWidth
    }
    const initState = children => {
      state.oItemCount = children.length
      state.rItemCount = children.length
      state.noDrag = children.length === 1 || !props.dragable
      state.index = props.defaultIndex >= 0 && props.defaultIndex < children.length ? parseInt(props.defaultIndex) : 0
      state.firstIndex = 0
      state.lastIndex = children.length - 1
      state.fromIndex = state.index === state.firstIndex ? state.lastIndex : state.index + 1
      state.toIndex = state.index
    }
    const backupItem = children => {
      const firstNode = children[0].$el.cloneNode(true)
      const lastNode = children[children.length - 1].$el.cloneNode(true)

      if (children.length > 1 && props.isLoop) {
        const firstNodeCopy = state.$swiper.querySelector('.ui-swiper-item-first-copy')
        const lastNodeCopy = state.$swiper.querySelector('.ui-swiper-item-last-copy')
        firstNodeCopy && state.$swiper.removeChild(firstNodeCopy)
        lastNodeCopy && state.$swiper.removeChild(lastNodeCopy)

        firstNode.className += ' ui-swiper-item-first-copy'
        lastNode.className += ' ui-swiper-item-last-copy'
        if (state.isVertical) {
          firstNode.style.height = `${state.dimension}px`
          lastNode.style.height = `${state.dimension}px`
        } else {
          firstNode.style.width = `${state.dimension}px`
          lastNode.style.width = `${state.dimension}px`
        }
        state.$swiper.appendChild(firstNode)
        state.$swiper.insertBefore(lastNode, state.$swiper.childNodes[0])

        state.firstIndex++
        state.lastIndex++
        state.index++

        state.rItemCount += 2
      }
    }
    const initScroller = () => {
      const scroller = new Scroller(
        (left, top) => {
          render(state.$swiper, left, top, 1, props.useNativeDriver)
        },
        {
          scrollingY: state.isVertical,
          scrollingX: !state.isVertical,
          snapping: false,
          bouncing: false,
          animationDuration: props.transitionDuration,
          // paging: true,
          scrollingComplete: () => {
            state.transitionEndHandler && state.transitionEndHandler()
          },
        },
      )

      const container = state.$swiperBox
      const contentWidth = state.isVertical ? container.clientWidth : container.clientWidth * state.rItemCount
      const contentHeight = state.isVertical ? container.clientHeight * state.rItemCount : container.clientHeight
      scroller.setPosition(container.clientLeft, container.clientTop)
      scroller.setDimensions(container.clientWidth, container.clientHeight, contentWidth, contentHeight)

      state.scroller = scroller
    }
    const translate = (element, offset, animate = true) => {
      if (!element) {
        warn('[ui-swiper] no element for translate')
        return
      }
      const x = state.isVertical ? 0 : -offset
      const y = state.isVertical ? -offset : 0
      state.scroller.scrollTo(x, y, animate)
    }
    const opacity = (animate = true, opacity) => {
      if (typeof opacity !== 'undefined') {
        let toIndex = 0
        let fromIndex = state.toIndex
        const itemCount = state.rItemCount

        if (opacity > 0) {
          if (fromIndex > 0) {
            toIndex = fromIndex - 1
          } else if (fromIndex === 0) {
            toIndex = itemCount - 1
          }
        } else {
          if (fromIndex < itemCount - 1) {
            toIndex = fromIndex + 1
          } else if (fromIndex === itemCount - 1) {
            toIndex = 0
          }
        }
        const from = rootEl.$children[fromIndex].$el
        const to = rootEl.$children[toIndex].$el
        from.style.opacity = 1 - Math.abs(opacity)
        from.style.transition = animate ? 'opacity 300ms ease' : ''
        to.style.opacity = Math.abs(opacity)
        return
      }

      const from = rootEl.$children[state.fromIndex].$el
      const to = rootEl.$children[state.toIndex].$el
      from.style.opacity = 0
      from.style.transition = animate ? 'opacity 500ms ease' : ''
      to.style.opacity = 1
      if (animate) {
        setTimeout(() => {
          emit('after-change', state.fromIndex, state.toIndex)
        }, 500)
      }
    }
    const reInitItems = () => {
      const children = rootEl.$children

      if (!children || !children.length) {
        return
      }

      getDimension()

      initState(children)

      if (state.isSlide) {
        backupItem(children)
        initScroller()
        translate(state.$swiper, -state.dimension * state.index, false)
      } else {
        opacity(false)
      }
      state.isInitial = true
    }
    // MARK: private methods
    const resize = () => {
      // 防止屏幕翻转时，容器的尺寸更改不及时导致异常
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
      resizeTimeout = setTimeout(() => {
        reInitItems()
      }, 300)
    }
    const clearTimer = () => {
      if (state.timer) {
        clearInterval(state.timer)
        state.timer = null
      }
    }
    const stop = () => {
      clearTimer()
      state.isStoped = true
    }
    const doOnTouchStart = event => {
      if (state.noDrag) {
        return
      }
      stop()
      const element = rootEl.$el
      let dragState = state.dragState
      const point = event.changedTouches ? event.changedTouches[0] : event
      dragState.startTime = new Date()
      dragState.startLeft = point.pageX
      dragState.startTop = point.pageY
      dragState.itemWidth = process.env.NODE_ENV !== 'test' ? element.offsetWidth : 100
      dragState.itemHeight = process.env.NODE_ENV !== 'test' ? element.offsetHeight : 100
    }
    const onDragStart = e => {
      /**
       * Consume unfinished transition handler first
       * Otherwise the offset calculation will be abnormal
       */
      state.transitionEndHandler && state.transitionEndHandler()

      if (props.isPrevent) {
        e.preventDefault()
      }
      state.dragging = true
      state.userScrolling = null
      doOnTouchStart(e)
    }
    const isScroll = (dragState, diffX, diffY) => {
      const vertical = state.isVertical
      const {currentLeft, currentTop, startLeft, startTop} = dragState
      if (state.userScrolling === null) {
        if ((!vertical && currentTop === startTop) || (vertical && currentLeft === startLeft)) {
          return false
        } else {
          if (diffX * diffX + diffY * diffY >= 25) {
            const _touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI
            return !vertical ? _touchAngle > state.touchAngle : 90 - _touchAngle > state.touchAngle
          } else {
            return false
          }
        }
      }
      return state.userScrolling
    }
    const doOnTouchMove = event => {
      if (state.noDrag) {
        return
      }
      let dragState = state.dragState
      const point = event.changedTouches ? event.changedTouches[0] : event
      dragState.currentLeft = point.pageX
      dragState.currentTop = point.pageY
      let offsetLeft = dragState.currentLeft - dragState.startLeft
      let offsetTop = dragState.currentTop - dragState.startTop
      state.userScrolling = isScroll(dragState, Math.abs(offsetLeft), Math.abs(offsetTop))
      if (state.userScrolling) {
        return
      }
      if (event.cancelable) {
        event.preventDefault()
      }
      let _offsetLeft = Math.min(Math.max(-dragState.itemWidth + 1, offsetLeft), dragState.itemWidth - 1)
      let _offsetTop = Math.min(Math.max(-dragState.itemHeight + 1, offsetTop), dragState.itemHeight - 1)
      const offset = state.isVertical
        ? _offsetTop - dragState.itemHeight * state.index
        : _offsetLeft - dragState.itemWidth * state.index

      if (state.isSlide) {
        translate(state.$swiper, offset, false)
      } else {
        opacity(false, offsetLeft / dragState.itemWidth)
      }
    }
    const onDragMove = e => {
      if (props.isPrevent) {
        e.preventDefault()
      }
      if (!state.dragging) {
        return
      }
      doOnTouchMove(e)
    }
    const calcDisplayIndex = index => {
      if (props.isLoop && state.isSlide && state.oItemCount > 0) {
        return index - 1 < 0 ? state.oItemCount - 1 : index - 1 > state.oItemCount - 1 ? 0 : index - 1
      }
      return index
    }
    const doTransition = (towards, options) => {
      if (state.oItemCount === 0) {
        return
      }
      if (!options && state.oItemCount < 2) {
        return
      }

      const index = state.index
      const itemCount = state.rItemCount
      const oldIndex = state.index

      if (!towards) {
        return
      }
      if (options && options.index !== undefined) {
        state.index = options.index
      } else if (towards === 'prev') {
        if (index > 0) {
          state.index = index - 1
        } else if (!state.isSlide && index === 0) {
          state.index = itemCount - 1
        } else if (props.isLoop && index === 0) {
          state.index = itemCount - 1
        }
      } else if (towards === 'next') {
        if (index < itemCount - 1) {
          state.index = index + 1
        } else if (!state.isSlide && index === itemCount - 1) {
          state.index = 0
        } else if (props.isLoop && index === itemCount - 1) {
          state.index = 1
        }
      }

      if (props.isLoop && state.isSlide) {
        state.fromIndex = calcDisplayIndex(oldIndex)
        state.toIndex = calcDisplayIndex(state.index)
      } else {
        state.fromIndex = state.toIndex
        state.toIndex = state.index
      }
      emit('before-change', state.fromIndex, state.toIndex)
      if (!state.isSlide) {
        opacity()
        return
      }

      setTimeout(() => {
        const isFirstItem = state.isFirstItem && props.isLoop
        const isLastItem = state.isLastItem && props.isLoop

        state.transitionEndHandler = () => {
          // Recover first and last page
          if (isLastItem) {
            const x = state.isVertical ? 0 : state.firstIndex * state.dimension
            const y = state.isVertical ? state.firstIndex * state.dimension : 0
            state.scroller.scrollTo(x, y, false)
          }
          if (isFirstItem) {
            const x = state.isVertical ? 0 : state.lastIndex * state.dimension
            const y = state.isVertical ? state.lastIndex * state.dimension : 0
            state.scroller.scrollTo(x, y, false)
          }

          emit('after-change', state.fromIndex, state.toIndex)
          state.transitionEndHandler = null
        }
        translate(state.$swiper, -state.dimension * state.index)

        // Recover first and last indicator
        if (isFirstItem) {
          state.index = state.lastIndex
        } else if (isLastItem) {
          state.index = state.firstIndex
        }
      }, 10)
    }
    // MARK: public methods
    const next = () => {
      doTransition('next')
    }
    const startPlay = () => {
      if (props.autoplay > 0 && state.oItemCount > 1) {
        clearTimer()
        state.timer = setInterval(() => {
          if (!props.isLoop && state.index >= state.rItemCount - 1) {
            return clearTimer()
          }
          if (!state.dragging) {
            next()
          }
        }, props.autoplay)
      }
    }
    const play = (autoplay = 3000) => {
      clearTimer()
      if (autoplay < 500) {
        return
      }
      autoplay = autoplay || props.autoplay
      startPlay()
      state.isStoped = false
    }
    const doOnTouchEnd = () => {
      if (state.noDrag) {
        return
      }
      let dragState = state.dragState
      let towards = null
      // let offset

      const dragDuration = new Date() - dragState.startTime
      const offsetLeft = dragState.currentLeft - dragState.startLeft
      const offsetTop = dragState.currentTop - dragState.startTop
      const itemWidth = dragState.itemWidth
      const itemHeight = dragState.itemHeight
      const index = state.index
      const itemCount = state.rItemCount
      const isFastDrag = dragDuration < PAGING_DURATION

      if (isFastDrag && dragState.currentLeft === undefined) {
        play(props.autoplay)
        return
      }

      if (state.isVertical) {
        if (Math.abs(offsetTop) > itemHeight * PAGING_SCALE || isFastDrag) {
          towards = offsetTop < 0 ? 'next' : 'prev'
        } else {
          translate(state.$swiper, -state.dimension * index, true)
        }
      } else {
        if (Math.abs(offsetLeft) > itemWidth * PAGING_SCALE || isFastDrag) {
          towards = offsetLeft < 0 ? 'next' : 'prev'
        } else {
          if (state.isSlide) {
            translate(state.$swiper, -state.dimension * index, true)
          } else {
            opacity(true, 0)
          }
        }
      }
      if (!props.isLoop) {
        if ((index === 0 && towards === 'prev') || (index === itemCount - 1 && towards === 'next')) {
          towards = null
        }
      }
      doTransition(towards)
      state.dragState = {}
      play(props.autoplay)
    }
    const onDragEnd = e => {
      if (props.isPrevent) {
        e.preventDefault()
      }
      if (state.userScrolling) {
        state.dragging = false
        state.dragState = {}
        return
      }
      if (!state.dragging) {
        return
      }
      doOnTouchEnd(e)
      state.dragging = false
    }
    const swiperItemCreated = () => {
      if (!state.ready) {
        return
      }
      rootEl.$nextTick(() => {
        clearTimer()
        reInitItems()
        if (props.autoplay > 0 && !state.isStoped) {
          startPlay()
        }
      })
    }

    const prev = () => {
      doTransition('prev')
    }
    const calcuRealIndex = index => {
      if (index < 0) {
        index = 0
      } else if (state.oItemCount > 0 && index > state.oItemCount - 1) {
        index = state.oItemCount - 1
      }

      if (props.isLoop && state.isSlide) {
        return index + 1
      }
      return index
    }
    const goto = displayIndex => {
      if (isNaN(displayIndex)) {
        return
      }
      displayIndex = parseInt(displayIndex)

      const realIndex = calcuRealIndex(displayIndex)
      const towards = realIndex > state.index ? 'next' : 'pre'

      doTransition(towards, {
        index: realIndex,
      })

      // restart timer
      play(props.autoplay)
    }
    const getIndex = () => calcDisplayIndex(state.index)
    state.realIndex = computed(() => getIndex())
    const swiperItemDestroyed = debounce(function() {
      if (!state.ready) {
        return
      }
      rootEl.$nextTick(() => {
        clearTimer()
        reInitItems()
        if (props.autoplay > 0 && !state.isStoped) {
          startPlay()
        }
      })
    }, 50)
    onMounted(() => {
      // vue3.0中没有this 统一获取当前dom元素
      state.ready = true
      state.$swiper = rootEl.$el.querySelector('.ui-swiper-container')
      state.$swiperBox = rootEl.$el.querySelector('.ui-swiper-box')
      rootEl.$nextTick(() => {
        reInitItems()
        startPlay()
        window.addEventListener('resize', resize)
      })
    })
    onUnmounted(() => {
      state.ready = false
      clearTimer()
      window.removeEventListener('resize', resize)
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
    })
    return {
      ...toRefs(state),
      getDimension,
      initState,
      backupItem,
      initScroller,
      translate,
      opacity,
      reInitItems,
      resize,
      stop,
      play,
      goto,
      prev,
      next,
      doOnTouchStart,
      onDragStart,
      onDragMove,
      onDragEnd,
      swiperItemCreated,
      swiperItemDestroyed,
    }
  },
}

</script>

<style lang="stylus">
.ui-swiper-box
  overflow hidden
  will-change tranform
.ui-swiper, .ui-swiper-box
  width 100%
  height 100%
  position relative
  &.disabled
    visibility hidden
  &.ui-swiper-fade
    .ui-swiper-item
      position absolute
      opacity 0
      top 0
      left 0
  &.ui-swiper-vertical
    .ui-swiper-container
      width 100%
      height auto
      box-orient vertical
      flex-direction column
    .ui-swiper-indicators
      flex-direction column
      right 20px
      left auto
      bottom auto
      top 50%
      transform translate(0, -50%)
      &.disabled
        visibility hidden
      .ui-swiper-indicator
        width 4px
        height 16px
        margin 2.5px 0

.ui-swiper-container
  height 100%
  width auto
  position relative
  display flex
  box-sizing content-box

.ui-swiper-indicators
    position absolute
    bottom 20px
    left 50%
    display flex
    transform translateX(-50%)

.ui-swiper-indicator
  width 16px
  height 4px
  display inline-block
  background #ddd
  margin 0 3px
  &.ui-swiper-indicator-active
    background swiper-indicator-fill
</style>
