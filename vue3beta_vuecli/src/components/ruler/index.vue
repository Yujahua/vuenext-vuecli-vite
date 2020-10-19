<template>
  <div
    class="ui-ruler"
    @touchstart="startDrag"
    @touchend="stopDrag"
  >
    <canvas
      class="ui-ruler-canvas"
      ref="canvas"
    ></canvas>
    <div
      class="ui-ruler-cursor"
      :class="[isStepTextBottom && 'ui-ruler-cursor-bottom']"
    ></div>
    <div class="ui-ruler-arrow"></div>
  </div>
</template>

<script>
import {reactive, toRefs, computed, getCurrentInstance, watch, onMounted, ref} from 'vue'
import Scroller from '../_util/scroller'
import {throttle, noop} from '../_util'

export default {
  name: 'ui-ruler',

  components: {},

  props: {
    value: {
      type: Number,
      default: 0,
    },
    scope: {
      type: Array,
      default: () => [0, 100],
    },
    step: {
      type: Number,
      default: 10,
    },
    unit: {
      type: Number,
      default: 1,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    stepTextPosition: {
      type: String,
      default: 'top',
      validator: val => !!~['top', 'bottom'].indexOf(val),
    },
    stepTextRender: {
      type: Function,
      default: noop,
    },
  },
  setup(props, {refs, emit}) {
    const state = reactive({
      clientHeight: 60,
      scroller: null,
      ratio: 2,

      isInitialed: false,
      isDragging: false,
      isScrolling: false,

      x: 0,
      scrollingX: 0,
      blank: 30, // unit blank
    })
    const that = getCurrentInstance()
    const unitCount = computed(() => {
      const {scope: [min, max], unit} = that
      return Math.ceil((max - min) / unit)
    })
    const canvasWidth = computed(() => refs.canvas.clientWidth * state.ratio)
    const realMin = computed(() => {
      const {scope, min} = that
      const [left, right] = scope
      if (min > right) {
        return left
      }
      return min > left ? min : left
    })
    const realMax = computed(() => {
      let {scope, max} = that
      const [left, right] = scope
      if (left > max) {
        return right
      }
      return max > right ? right : max
    })
    const blankLeft = computed(() => {
      const {scope, realMin, unit, blank} = that
      const [min] = scope
      return Math.ceil((realMin - min) / unit) * blank
    })
    const blankRight = computed(() => {
      const {scope, realMax, unit, blank} = that
      const [, max] = scope
      return Math.ceil((max - realMax) / unit) * blank
    })
    const isStepTextBottom = computed(() => props.stepTextPosition === 'bottom')
    const initX = () => {
      const {value, scope, realMin, realMax, unit, blank, unitCount, canvasWidth} = that
      const [min] = scope

      state.x = canvasWidth - Math.ceil((realMin - min) / unit) * blank

      if (value <= realMin) {
        return 0
      } else if (value >= realMax) {
        return unitCount * blank
      } else {
        return Math.ceil((value - realMin) / unit) * blank
      }
    }
    const matchStepText = step => {
      const match = props.stepTextRender(step)
      return match !== undefined && match !== null ? match : step
    }
    const onInput = value => {
      emit('input', value)
      emit('change', value)
    }
    const updateValue = () => {
      if (!state.isInitialed) {
        return
      }

      const {x, scope: [min], realMin, realMax, unit, blank, canvasWidth} = that

      if (x > canvasWidth) {
        onInput(realMin)
        return
      }

      const _x = x >= 0 ? Math.abs(x - canvasWidth) : Math.abs(x) + canvasWidth
      let value = min + Math.round(_x / blank) * unit

      value > realMax && (value = realMax)
      value < realMin && (value = realMin)
      onInput(value)
    }
    const drawLine = () => {
      const {ctx, x, scope, step, unit, ratio, blank, unitCount, isStepTextBottom} = that
      const {blankLeft, blankRight, canvasWidth} = that
      const [scopeLeft] = scope

      const _fontSize = 22
      const _y = 120 - (isStepTextBottom ? _fontSize + 40 : 0)
      const _stepUnit = Math.round(step / unit)

      ctx.lineWidth = 2
      ctx.font = `${_fontSize *
        ratio}px DIN Alternate, "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif`

      for (let i = 0; i <= unitCount; i++) {
        const _x = x + i * blank

        if (_x < 0 || _x > canvasWidth * 2) {
          continue
        }

        // over range use another color
        const outRange = _x < x + blankLeft || _x > x + 1 + unitCount * blank - blankRight
        if (outRange) {
          ctx.fillStyle = '#E2E4EA'
          ctx.strokeStyle = '#E2E4EA'
        } else {
          ctx.fillStyle = '#C5CAD5'
          ctx.strokeStyle = '#858B9C'
        }

        ctx.beginPath()
        ctx.moveTo(_x, _y)

        if (i % _stepUnit === 0) {
          // draw text
          const text = matchStepText(scopeLeft + unit * i)
          const textOffset = String(text).length * _fontSize / 2
          ctx.fillText(text, _x - textOffset, _fontSize * ratio + (isStepTextBottom ? 70 : 0))

          // draw line
          ctx.lineTo(_x, _y - 40)
        } else {
          ctx.lineTo(_x, _y - 20)
        }
        ctx.stroke()
      }

      // draw base line
      ctx.strokeStyle = '#E2E4EA'
      ctx.beginPath()
      ctx.moveTo(x, _y)
      ctx.lineTo(x + unitCount * blank, _y)
      ctx.stroke()

      updateValue()
    }
    const draw = left => {
      left = +left.toFixed(2)
      const {ctx, ratio, scrollingX, canvasWidth, clientHeight} = that

      state.scrollingX = left
      state.x += scrollingX - left

      // clear canvas
      const scale = ratio * ratio
      ctx.clearRect(0, 0, canvasWidth * scale, clientHeight * scale)

      drawLine()
    }
    const initCanvas = () => {
      const {ratio, ctx, canvasWidth, clientHeight, $refs} = that
      const {canvas} = $refs

      canvas.width = canvasWidth
      canvas.height = clientHeight * ratio

      const scale = 1 / ratio
      ctx.scale(scale, 1)
    }
    const initScroller = () => {
      const {blankLeft, blankRight, blank, unitCount, canvasWidth, clientHeight} = that

      const drawFn = throttle(draw, 10)
      const scroller = new Scroller(
        left => {
          state.isInitialed && drawFn(left)
        },
        {
          scrollingX: true,
          scrollingY: false,
          snapping: true,
          snappingVelocity: 1,
          animationDuration: 200,
          inRequestAnimationFrame: true,
          scrollingComplete: () => {
            state.isScrolling = false
          },
        },
      )

      // set real scroll width
      const innerWidth = unitCount * blank + canvasWidth - blankLeft - blankRight
      const x = initX()
      draw(x)
      scroller.setDimensions(canvasWidth, clientHeight, innerWidth, clientHeight)
      scroller.setSnapSize(blank, 0)
      scroller.scrollTo(x, 0, false)

      state.scroller = scroller
      state.isInitialed = true
    }
    watch(
      () => props.value,
      () => {
        if (state.isScrolling) {
          return
        }
        state.scrollingX = 0
        state.isScrolling = true
        const x = initX()
        draw(x)
        state.scroller.scrollTo(x, 0, true)
      },
    )
    let ctx = ref(null)
    onMounted(() => {
      const {$refs} = that
      // without watch ctx
      ctx.value = $refs.canvas.getContext('2d')

      initCanvas()
      state.x = canvasWidth.value
      initScroller()
    })
    const onDrag = event => {
      event.preventDefault()
      event.stopPropagation()
      if (!state.isDragging) {
        return
      }
      state.scroller.doTouchMove(event.touches, event.timeStamp, event.scale)
    }
    const stopDrag = event => {
      event.preventDefault()
      event.stopPropagation()
      state.isDragging = false

      state.scroller.doTouchEnd(event.timeStamp)

      window.removeEventListener('touchmove', onDrag)
    }
    const startDrag = event => {
      if (state.isDragging) {
        return
      }

      event.preventDefault()
      event.stopPropagation()
      state.scroller.doTouchStart(event.touches, event.timeStamp)

      state.isDragging = true
      state.isScrolling = true

      window.addEventListener('touchmove', onDrag)
    }
    return {
      ctx,
      ...toRefs(state),
      unitCount,
      canvasWidth,
      realMin,
      realMax,
      blankLeft,
      blankRight,
      isStepTextBottom,
      initX,
      matchStepText,
      onInput,
      updateValue,
      drawLine,
      draw,
      initCanvas,
      initScroller,
      onDrag,
      stopDrag,
      startDrag,
    }
  },
}

</script>

<style lang="stylus">
.ui-ruler
  position relative
  padding 36px 0 20px
  width 100%
  height 142px
  box-sizing border-box
  font-family font-family-number
  .ui-ruler-canvas
    width 100%
    height 60px
  .ui-ruler-cursor
    z-index 10
    position absolute
    top 26px
    left 50%
    width 2px
    height 70px
    transform translate(-50%)
    background-color #2F86F6
    box-shadow 0 2px 4px #2F86F6
    &-bottom
      height 40px
  .ui-ruler-arrow
    z-index 10
    position absolute
    bottom 25px
    left 50%
    border-bottom 10px solid #2F86F6
    border-left 10px solid transparent
    border-right 10px solid transparent
    transform translate(-50%)
</style>
