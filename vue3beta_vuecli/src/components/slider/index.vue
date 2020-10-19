<template>
  <div class="ui-slider" :class="{'is-disabled': disabled}">
    <template v-if="range">
      <div class="ui-slider-bar" :style="barStyle"></div>
      <div class="ui-slider-handle is-lower"
        :data-hint="format(values[0])"
        :class="{
          'is-active': isDragging && !isDragingUpper
        }"
        :style="{'left': lowerHandlePosition + '%'}">
        <span
          @mousedown="startLowerDrag"
          @touchstart="startLowerDrag"
        ></span>
      </div>
      <div class="ui-slider-handle is-higher"
        :data-hint="format(values[1])"
        :class="{
          'is-active': isDragging && isDragingUpper
        }"
        :style="{'left': upperHandlePosition + '%'}">
        <span
          @mousedown="startUpperDrag"
          @touchstart="startUpperDrag"
        ></span>
      </div>
    </template>
    <template v-else>
      <div class="ui-slider-bar" :style="barStyle"></div>
      <div class="ui-slider-handle"
        :data-hint="format(values[0])"
        :class="{
          'is-active': isDragging
        }"
        :style="{'left': lowerHandlePosition + '%'}">
        <span
          @mousedown="startLowerDrag"
          @touchstart="startLowerDrag"
        ></span>
      </div>
    </template>
  </div>
</template>

<script>
import {reactive, toRefs, watch, getCurrentInstance, computed} from 'vue'
export default {
  name: 'ui-slider',

  props: {
    value: {
      type: [Array, Number],
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    range: {
      type: Boolean,
      default: false,
    },
    format: {
      type: Function,
      default(val) {
        return val
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const state = reactive({
      isDragging: false,
      isDragingUpper: false,
      values: [props.min, props.max],
      startDragMousePos: 0,
      startVal: 0,
    })
    const that = getCurrentInstance()
    const updateValue = newVal => {
      let newValues = []

      if (Array.isArray(newVal)) {
        newValues = [newVal[0], newVal[1]]
      } else {
        newValues[0] = newVal
      }

      if (typeof newValues[0] !== 'number') {
        newValues[0] = state.values[0]
      } else {
        newValues[0] = Math.round((newValues[0] - props.min) / props.step) * props.step + props.min
      }

      if (typeof newValues[1] !== 'number') {
        newValues[1] = state.values[1]
      } else {
        newValues[1] = Math.round((newValues[1] - props.min) / props.step) * props.step + props.min
      }

      // value boundary adjust
      if (newValues[0] < props.min) {
        newValues[0] = props.min
      }
      if (newValues[1] > props.max) {
        newValues[1] = props.max
      }
      if (newValues[0] > newValues[1]) {
        if (newValues[0] === state.values[0]) {
          newValues[1] = newValues[0]
        } else {
          newValues[0] = newValues[1]
        }
      }

      if (state.values[0] === newValues[0] && state.values[1] === newValues[1]) {
        return
      }

      state.values = newValues

      if (props.range) {
        emit('input', state.values)
      } else {
        emit('input', state.values[0])
      }
    }
    watch(
      () => props.value,
      val => {
        if (
          (Array.isArray(val) && (val[0] !== state.values[0] || val[1] !== state.values[1])) ||
          val !== state.values[0]
        ) {
          updateValue(val)
        }
      },
      {immediate: true},
    )
    const onDrag = e => {
      if (props.disabled) {
        return
      }
      if (e.cancelable) {
        e.preventDefault()
      }
      e.stopPropagation()
      if (!state.isDragging) {
        return
      }
      e = e.changedTouches ? e.changedTouches[0] : e
      window.requestAnimationFrame(() => {
        let diff = (e.pageX - state.startDragMousePos) / that.$el.offsetWidth * (props.max - props.min)
        let nextVal = state.startVal + diff
        if (state.isDragging) {
          if (state.isDragingUpper) {
            updateValue([null, nextVal])
          } else {
            updateValue([nextVal, null])
          }
        }
      })
    }
    const onUp = e => {
      if (e.cancelable) {
        e.preventDefault()
      }
      e.stopPropagation()
      state.isDragging = false
      state.isDragingUpper = false
      window.removeEventListener('mousemove', onDrag)
      window.removeEventListener('touchmove', onDrag)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)
    }
    const stopDrag = () => {
      state.isDragging = false
      state.isDragingUpper = false
      window.removeEventListener('mousemove', onDrag)
      window.removeEventListener('touchmove', onDrag)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)
    }
    watch(
      () => props.disabled,
      newVal => {
        if (!newVal) {
          stopDrag()
        }
      },
    )
    const lowerHandlePosition = computed(() => (state.values[0] - props.min) / (props.max - props.min) * 100)
    const upperHandlePosition = computed(() => (state.values[1] - props.min) / (props.max - props.min) * 100)
    const barStyle = computed(() => {
      const {range, values, min, max, lowerHandlePosition} = that
      if (range) {
        return {
          width: (values[1] - values[0]) / (max - min) * 100 + '%',
          left: lowerHandlePosition + '%',
        }
      } else {
        return {
          width: (values[0] - min) / (max - min) * 100 + '%',
        }
      }
    })
    const startLowerDrag = e => {
      if (props.disabled) {
        return
      }
      if (e.cancelable) {
        e.preventDefault()
      }
      e.stopPropagation()
      e = e.changedTouches ? e.changedTouches[0] : e
      state.startDragMousePos = e.pageX
      state.startVal = state.values[0]
      state.isDragingUpper = false
      state.isDragging = true
      window.addEventListener('mousemove', onDrag)
      window.addEventListener('touchmove', onDrag)
      window.addEventListener('mouseup', onUp)
      window.addEventListener('touchend', onUp)
    }
    const startUpperDrag = e => {
      if (props.disabled) {
        return
      }
      if (e.cancelable) {
        e.preventDefault()
      }
      e.stopPropagation()
      e = e.changedTouches ? e.changedTouches[0] : e
      state.startDragMousePos = e.pageX
      state.startVal = state.values[1]
      state.isDragingUpper = true
      state.isDragging = true
      window.addEventListener('mousemove', onDrag)
      window.addEventListener('touchmove', onDrag)
      window.addEventListener('mouseup', onUp)
      window.addEventListener('touchend', onUp)
    }
    return {
      ...toRefs(state),
      updateValue,
      stopDrag,
      onDrag,
      onUp,
      lowerHandlePosition,
      upperHandlePosition,
      barStyle,
      startLowerDrag,
      startUpperDrag,
    }
  },
}

</script>

<style lang="stylus">
.ui-slider
  position relative
  width 100%
  height 60px
  &::before
    content ''
    position absolute
    top 28px
    left 0
    right 0
    height 4px
    border-radius 2px
    background-color slider-bg-base
  &.is-disabled
    .ui-slider-bar
      opacity 0.35
    .ui-slider-handle span
      cursor: not-allowed

.ui-slider-bar
  position absolute
  left 0
  top 28px
  height 4px
  background-color slider-bg-tap
  border-radius 2px
  z-index 5

.ui-slider-handle
  position absolute
  top 10px
  left 0
  margin-left -20px
  z-index 15
  overflow visible
  &::after
    content attr(data-hint)
    color tip-color
    position absolute
    pointer-events none
    opacity 0
    visibility hidden
    z-index 15
    font-size font-minor-normal
    line-height 1.25
    padding 8px 16px
    border-radius radius-normal
    background-color tip-fill
    white-space nowrap
    left 50%
    bottom 100%
    margin-bottom 20px
    transform translateX(-50%)

  &:hover::after,
  &:active::after
    opacity 1
    visibility visible

  &.is-higher
    z-index 20
  &.is-active span
    transform scale(1.3)
  span
    display block
    cursor pointer
    width 40px
    height 40px
    background-color slider-handle-bg
    border-radius 50%
    box-shadow 0 1px 2px rgba(0, 0, 0, 0.2)
    transition transform 200ms
</style>
