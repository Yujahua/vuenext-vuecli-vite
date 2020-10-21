<template>
  <div class="ui-picker-column" :style="{ height: `${style.indicatorHeight + 2 * style.maskerHeight}px` }">
    <div class="ui-picker-column-container">
      <div class="ui-picker-column-masker top" :style="{ height: `${style.maskerHeight}px` }"></div>
      <div class="ui-picker-column-masker bottom" :style="{ height: `${style.maskerHeight}px` }"></div>
      <div class="ui-picker-column-list">
        <template>
          <div
            v-for="(colunm, i) in columnValues"
            class="ui-picker-column-item"
            :key="i"
          >
            <ul class="column-list" :style="{ 'padding-top': `${style.maskerHeight}px` }">
              <template>
                <li
                  v-for="(item, j) in colunm"
                  class="column-item"
                  :class="{
                    'active': isColumnIndexActive(i, j),
                    'disabled': isColumnIndexInvalid(i, j)
                  }"
                  :style="{
                    'height': `${style.indicatorHeight}px`,
                    'line-height': `${style.indicatorHeight}px`
                  }"
                  :key="j"
                  v-text="item.text || item.label"
                  >
                </li>
              </template>
            </ul>
          </div>
        </template>
        <template v-if="cols">
          <div
            class="ui-picker-column-item"
            v-for="n in (cols - columnValues.length)"
            :key="n + columnValues.length - 1"
          >
            <ul class="column-list" :style="{ 'padding-top': `${style.maskerHeight}px` }"></ul>
          </div>
        </template>
      </div>
      <div class="ui-picker-column-hooks">
        <template v-if="cols">
          <div
            class="ui-picker-column-hook"
            v-for="n in cols"
            :key="n - 1"
            @touchstart="onColumnTouchStart($event, n - 1)"
            @mousedown="onColumnTouchStart($event, n - 1, true)"
            @touchmove="onColumnTouchMove($event, n - 1)"
            @mousemove="onColumnTouchMove($event, n - 1, true)"
            @touchend="onColumnTouchEnd($event, n - 1)"
            @mouseup="onColumnTouchEnd($event, n - 1, true)"
          ></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, toRefs, computed, getCurrentInstance, watch, set, nextTick} from 'vue'
import Scroller from '../_util/scroller'
import {render} from '../_util/render'
import {noop, getDpr, traverse, inArray, extend, warn} from '../_util'

const dpr = getDpr()
const API_LIST = [
  'getColumnValue',
  'getColumnValues',
  'getColumnIndex',
  'getColumnIndexs',
  'getColumnIndexByDefault',
  'setColumnValues',
  'refresh',
  'inheritPickerApi',
]

export default {
  name: 'ui-picker-column',

  props: {
    data: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
    cols: {
      type: Number,
      default: 1,
    },
    defaultValue: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
    defaultIndex: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
    invalidIndex: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
    lineHeight: {
      type: Number,
      default: 45,
    },
    keepIndex: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const state = reactive({
      columnValues: [],
      scrollers: [],
      scrollDirect: 1,
      scrollPosition: 0,
      activedIndexs: [],
      isInitialed: false,
      isScrollInitialed: false,
      isScrolling: false,
      isMouseDown: false,
    })
    const that = getCurrentInstance()
    const hooks = computed(() => {
      const _hooks = that.$el.querySelectorAll('.ui-picker-column-hook')
      /* istanbul ignore if */
      if (!_hooks) {
        return []
      }
      return Array.isArray(_hooks) ? _hooks : Array.prototype.slice.call(_hooks)
    })
    const style = computed(() => {
      return {
        maskerHeight: (props.lineHeight * 2 + 10) * dpr,
        indicatorHeight: props.lineHeight * dpr,
      }
    })
    watch(
      () => props.data,
      val => {
        state.columnValues = extend([], val)
      },
      {deep: true},
    )
    // created
    state.columnValues = extend([], props.data)

    const scrollInZoon = (scroller, top) => {
      const MaxTop = scroller.getScrollMax().top

      if (top < 0) {
        return 0
      } else if (top > MaxTop) {
        return MaxTop
      } else {
        return top
      }
    }
    const getColumnIndexByOffset = top => Math.round(top / style.value.indicatorHeight)
    const isColumnIndexInvalid = (columnIndex, itemIndex) => {
      const invalidIndex = props.invalidIndex[columnIndex]
      return inArray(invalidIndex, itemIndex)
    }
    const hasValidIndex = columnIndex => {
      for (const key of props.data[columnIndex].keys()) {
        if (!isColumnIndexInvalid(columnIndex, key)) {
          return true
        }
      }
      /* istanbul ignore next */
      warn(`hasValidIndex: has no valid items in column index ${columnIndex}`)
      return false
    }
    const findValidIndex = (columnIndex, count) => {
      // Has no valid items
      if (!hasValidIndex(columnIndex)) {
        return count
      }
      let tempCount = count
      while (isColumnIndexInvalid(columnIndex, tempCount)) {
        tempCount += state.scrollDirect
      }
      /**
       * No valid item in this direction,
       * find valid item in another direction
       */
      if (tempCount < 0 || tempCount > props.data[columnIndex].length - 1) {
        state.scrollDirect = -state.scrollDirect
        return findValidIndex(columnIndex, count)
      }
      return tempCount
    }
    const getColumnOffsetByIndex = index => index * style.value.indicatorHeight
    const scrollToValidIndex = (scroller, columnIndex, itemIndex) => {
      const count = findValidIndex(columnIndex, itemIndex)
      const offsetTop = getColumnOffsetByIndex(count)
      scroller.scrollTo(0, scrollInZoon(scroller, offsetTop), true)
    }
    const getColumnValues = () => {
      const data = state.columnValues
      const activeIndexs = state.activedIndexs
      let activeValues = []
      data.forEach((item, index) => {
        activeValues[index] = item[activeIndexs[index]]
      })

      return activeValues
    }
    const getColumnValue = (index = 0) => {
      const activeValues = getColumnValues()
      return activeValues[index]
    }
    const onColumnScrollEnd = index => {
      const scroller = state.scrollers[index]
      const top = scroller.getValues().top
      const scrollTop = scrollInZoon(scroller, top)
      const activeItemIndex = getColumnIndexByOffset(scrollTop)
      const isInvalid = isColumnIndexInvalid(index, activeItemIndex)

      if (isInvalid || activeItemIndex === state.activedIndexs[index]) {
        isInvalid && scrollToValidIndex(scroller, index, activeItemIndex)
        return false
      }

      /* istanbul ignore next */
      set(state.activedIndexs, index, activeItemIndex)
      /* istanbul ignore next */
      emit('change', index, activeItemIndex, getColumnValue(index))
    }
    const scrollToIndex = (scroller, columnIndex, itemIndex) => {
      const offsetTop = getColumnOffsetByIndex(itemIndex)
      scroller.scrollTo(0, offsetTop)
    }
    const resetScrollingPosition = columnIndex => {
      const scroller = state.scrollers[columnIndex]
      const columnValue = state.columnValues[columnIndex] || []
      let oldColumnActiveIndex = state.activedIndexs[columnIndex] || 0

      if (!scroller || !oldColumnActiveIndex) {
        return
      }

      if (oldColumnActiveIndex > columnValue.length - 1) {
        oldColumnActiveIndex = columnValue.length - 1
      }

      scrollToIndex(scroller, columnIndex, oldColumnActiveIndex)
      set(state.activedIndexs, columnIndex, oldColumnActiveIndex)
    }
    const initSingleColumnScroller = (container, index) => {
      const columns = that.$el.querySelectorAll('.column-list')
      const content = columns[index]

      /* istanbul ignore if */
      if (index === undefined || !columns || !container || !content) {
        return
      }

      const rect = container.getBoundingClientRect()
      const scroller = new Scroller(
        (left, top) => {
          render(content, left, top)
        },
        {
          scrollingX: false,
          snapping: true,
          snappingVelocity: 1,
          animationDuration: 350,
          scrollingComplete: () => {
            onColumnScrollEnd(index)
          },
        },
      )

      // set scroller size
      scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop)
      scroller.setDimensions(
        container.clientWidth,
        container.clientHeight,
        content.offsetWidth,
        content.offsetHeight + style.value.maskerHeight,
      )
      scroller.setSnapSize(0, style.value.indicatorHeight)

      // save scroller instance
      set(state.scrollers, index, scroller)

      // reset scrolling position
      resetScrollingPosition(index)
    }
    const getColumnIndexDefault = (data, defaultIndex = [], defaultValue = [], fn = noop) => {
      /* istanbul ignore if */
      if (!data) {
        return
      }

      traverse(data, (item, level, indexs) => {
        const columnIndex = indexs[0]
        const itemIndex = indexs[1]
        let itemDefaultIndex = defaultIndex[columnIndex]
        const itemDefaultValue = defaultValue[columnIndex]

        /*
         * given a default itemIndex when both defaultIndex & defaultValue are undefined
         * avoid activieIndexs failing to initialize
         */
        if (itemDefaultIndex === undefined && itemDefaultValue === undefined) {
          itemDefaultIndex = 0
        }

        // get initial itemIndex of each columnIndex by defaultIndex or defaultValue
        if (
          (itemDefaultIndex !== undefined && itemIndex === itemDefaultIndex) ||
          (itemDefaultValue !== undefined &&
            (item.text === itemDefaultValue || item.label === itemDefaultValue || item.value === itemDefaultValue))
        ) {
          fn(columnIndex, itemIndex)
          return 2
        }
      })
    }
    const initColumnIndex = () => {
      const data = state.columnValues
      const scrollers = state.scrollers
      const defaultValue = props.defaultValue
      const defaultIndex = props.defaultIndex

      getColumnIndexDefault(data, defaultIndex, defaultValue, (columnIndex, itemIndex) => {
        const scroller = scrollers[columnIndex]

        /* istanbul ignore if */
        if (!scroller) {
          warn(`initialColumnIndex: scroller of column ${columnIndex} is undefined`)
          return 1
        }

        /**
         * If the initial selection item is invalid,
         * then a valid item is automatically selected
         */
        if (isColumnIndexInvalid(columnIndex, itemIndex)) {
          scrollToValidIndex(scroller, columnIndex, itemIndex)
        } else {
          scrollToIndex(scroller, columnIndex, itemIndex)
          set(state.activedIndexs, columnIndex, itemIndex)
        }
      })
    }
    const initColumnsScroller = (startIndex = 0) => {
      for (let i = startIndex, len = hooks.value.length; i < len; i++) {
        const container = hooks.value[i]
        container && initSingleColumnScroller(container, i)
      }

      // initial index only refresh all columns
      if (!startIndex) {
        initColumnIndex()
        if (!state.isInitialed) {
          state.isInitialed = true
          setTimeout(() => {
            emit('initialed')
          }, 0)
        }
      }

      state.isScrollInitialed = true
    }
    const isColumnIndexActive = (columnIndex, itemIndex) => {
      const activeIndex = state.activedIndexs[columnIndex]
      return activeIndex === itemIndex
    }
    const onColumnTouchStart = (event, index, isMouse) => {
      event.preventDefault()

      const scroller = state.scrollers[index]
      const touches = isMouse ? [{pageX: event.pageX, pageY: event.pageY}] : event.touches

      /* istanbul ignore if */
      if (!scroller) {
        warn(`touchstart: scroller of column ${index} is undefined`)
        return
      }

      state.scrollPosition = isMouse ? event.pageY : event.touches[0].pageY

      scroller.doTouchStart(touches, event.timeStamp)
      isMouse && (state.isMouseDown = true)
    }
    const onColumnTouchMove = (event, index, isMouse) => {
      const scroller = state.scrollers[index]
      const touches = isMouse ? [{pageX: event.pageX, pageY: event.pageY}] : event.touches

      /* istanbul ignore if */
      if (!scroller || (isMouse && !state.isMouseDown)) {
        return
      }

      const diff = state.scrollPosition - (isMouse ? event.pageY : event.touches[0].pageY)
      state.scrollDirect = diff ? diff / Math.abs(diff) : 1

      scroller.doTouchMove(touches, event.timeStamp)
      isMouse && (state.isMouseDown = true)
    }
    const onColumnTouchEnd = (event, index, isMouse) => {
      const scroller = state.scrollers[index]

      /* istanbul ignore if */
      if (!scroller || (isMouse && !state.isMouseDown)) {
        return
      }

      scroller.doTouchEnd(event.timeStamp)
      isMouse && (state.isMouseDown = false)
    }
    const inheritPickerApi = (instance, blacklist = []) => {
      traverse(API_LIST, api => {
        /* istanbul ignore if */
        if (!instance) {
          return 2
        } else if (~blacklist.indexOf(api)) {
          return 1
        }

        const fn = that[api]

        /* istanbul ignore else */
        if (fn) {
          instance[api] = fn
        } else {
          warn(`inheritPickerApi: Api method [${api}] is undefined`)
        }
      })
    }
    const getColumnIndex = (index = 0) => {
      return state.activedIndexs[index]
    }
    const getColumnIndexs = () => {
      return state.activedIndexs
    }
    const getColumnIndexByDefault = (data, defaultIndex = [], defaultValue = [], fn = noop) => {
      /* istanbul ignore next */
      getColumnIndexDefault(data, defaultIndex, defaultValue, fn)
    }
    const setColumnValues = (index, values, callback = noop) => {
      /* istanbul ignore if */
      if (index === undefined || values === undefined) {
        return
      }

      // reset active index
      if (!props.keepIndex) {
        set(state.activedIndexs, index, 0)
      }

      set(state.columnValues, index, values)
      nextTick(() => {
        // this.initSingleColumnScroller(index)
        callback(that)
      })
    }
    const refresh = (callback, startIndex = 0) => {
      // const _callback = () => {
      //   this.initColumnsScroller(startIndex)
      //   callback && callback(this)
      // }
      // if (microTask) {
      //   this.$nextTick(_callback)
      // } else {
      //   setTimeout(_callback, 0)
      // }
      nextTick(() => {
        initColumnsScroller(startIndex)
        callback && callback()
      })
    }
    return {
      ...toRefs(state),
      hooks,
      style,
      initColumnsScroller,
      initSingleColumnScroller,
      onColumnScrollEnd,
      scrollInZoon,
      getColumnIndexByOffset,
      isColumnIndexInvalid,
      scrollToValidIndex,
      findValidIndex,
      hasValidIndex,
      getColumnValue,
      getColumnValues,
      resetScrollingPosition,
      scrollToIndex,
      initColumnIndex,
      getColumnIndexDefault,
      isColumnIndexActive,
      onColumnTouchStart,
      onColumnTouchMove,
      onColumnTouchEnd,
      inheritPickerApi,
      getColumnIndex,
      getColumnIndexs,
      getColumnIndexByDefault,
      setColumnValues,
      refresh,
    }
  },
}

</script>

<style lang="stylus">
.ui-picker-column
  position relative
  width 100%
  padding 0 picker-padding-h
  padding-bottom constant(safe-area-inset-bottom)
  background color-bg-inverse
  box-sizing border-box
  transform translate3d(0, 0, 0)

.ui-picker-column-container
  height 100%

.ui-picker-column-masker
  position absolute !important
  z-index 2
  left picker-padding-h
  right picker-padding-h
  transform translate3d(0, 0, 0)
  &.top
    top 0
    // background -webkit-gradient(linear,left bottom,left top,from(hsla(0, 0%,100%,.2)),to(hsla(0,0%,100%,1)))
    hairline(bottom, picker-border-color, 0, 3px)
    // border-bottom solid 1px picker-border-color
  &.bottom
    bottom 0
    // bottom constant(safe-area-inset-bottom)
    // background -webkit-gradient(linear,left top,left bottom,from(hsla(0, 0%,100%,.2)),to(hsla(0,0%,100%,1)))
    hairline(top, picker-border-color, 0, 3px)
    // border-top solid 1px picker-border-color

.ui-picker-column-hooks
  display flex
  position absolute
  z-index 3
  absolute-pos()
  padding 0 picker-padding-h

.ui-picker-column-hook
  display flex
  flex 1
  height 100%

.ui-picker-column-list
  display flex
  height 100%
  padding 0 picker-padding-h

.ui-picker-column-item
  position relative
  display flex
  flex 1
  clearfix()
  overflow hidden
  .column-list
    position absolute
    top 0
    left 0
    width 100%
    transform-origin left top
    box-sizing border-box
    transform translate3d(0, 0, 0)
    .column-item
      float left
      width 100%
      padding 0 h-gap-md
      box-sizing border-box
      color picker-color
      font-size picker-font-size
      text-align center
      word-ellipsis()
      &.active
        color picker-color-active
        font-weight picker-font-weight-active
      &.disabled
        opacity picker-disabled-opacity
</style>
