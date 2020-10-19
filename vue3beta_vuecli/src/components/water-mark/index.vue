<template>
  <div class="ui-water-mark">
    <div class="water-mark-container">
      <slot></slot>
    </div>
    <div v-if="!!slots.watermark || content" class="water-mark-list" ref="mark">
      <div
        class="water-mark-list-wrapper"
        :style="{
           opacity,
           transform: `rotate(${rotate}deg)`
         }"
      >
        <template v-if="content">
          <canvas ref="canvas" class="water-mark-canvas"></canvas>
        </template>
        <template v-else-if="!!slots.watermark">
          <ul
            v-for="i in (repeatY ? repetition : 1)"
            class="water-mark-line"
            :style="{
            marginBottom: spacing,
          }"
            :key="`line-${i}`"
          >
            <li
              v-for="j in (repeatX ? repetition : 1)"
              class="water-mark-item"
              :style="i % 2 === 0 ? {
              marginLeft: repeatX ? spacing : 0,
            } : {
              marginRight: repeatX ? spacing : 0,
            }"
              :key="`item-${j}`"
            >
              <slot name="watermark" :coord="{row: i, col: j}"></slot>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, onMounted, toRefs} from 'vue'
import {getDpr} from '../_util'

const fontSize = 14
const color = '#858B9C'
function initCanvas(ctx, ratio, canvas, mark) {
  const {clientWidth, clientHeight} = mark.value

  const ctxWidth = ref((canvas.value.width = clientWidth * ratio.value))
  const ctxHeight = ref((canvas.value.height = clientHeight * ratio.value))
  ctx.value.scale(1 / ratio, 1 / ratio)
  return {ctxWidth, ctxHeight}
}
function computedSpacing(spacing, ratio) {
  const realSpacing = ref(null)
  if (typeof spacing === 'number') {
    realSpacing.value = spacing
    return realSpacing
  }
  const [, amount = 20, unit = 'vw'] = /([0-9]+)([A-Za-z]+)/.exec(spacing)

  if (unit === 'px') {
    realSpacing.value = amount
  } else if (unit === 'vh') {
    const height = window.screen.height
    realSpacing.value = amount * height / 100
  } else if (unit === 'vw') {
    const width = window.screen.width
    realSpacing.value = amount * width / 100
  }

  realSpacing.value *= ratio.value
  return realSpacing
}

function draw(arg) {
  const {content, ctx, realSpacing, ratio, ctxWidth, ctxHeight} = arg
  const _fontSize = fontSize * ratio.value
  const contentLength = content.value.length * _fontSize
  const xCount = Math.ceil(ctxWidth.value * ratio.value / (contentLength + realSpacing.value))
  const yCount = Math.ceil(ctxHeight.value * ratio.value / (_fontSize + realSpacing.value))

  ctx.value.font = `${_fontSize}px DIN Alternate, "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif`
  ctx.value.fillStyle = color

  let ctxX = 0
  let ctxY = 0
  for (let y = 0; y < yCount; y++) {
    ctxX = 0
    for (let x = 0; x < xCount; x++) {
      ctx.value.fillText(content.value, ctxX, ctxY)
      ctxX += contentLength
    }
    ctxY += _fontSize + realSpacing.value
  }
}
export default {
  name: 'ui-water-mark',

  props: {
    content: {
      type: String,
      default: '',
    },
    spacing: {
      type: [String, Number],
      default: '20vw',
    },
    repeatX: {
      type: Boolean,
      default: true,
    },
    repeatY: {
      type: Boolean,
      default: true,
    },
    rotate: {
      type: [String, Number],
      default: -30,
    },
    opacity: {
      type: [String, Number],
      default: 0.1,
    },
  },
  setup(props) {
    const repetition = ref(process.env.NODE_ENV === 'test' ? 2 : 50)
    const canvas = ref(null)
    const mark = ref(null)
    const ratio = ref(Math.max(getDpr(), 2))
    const ctx = ref(null)
    onMounted(() => {
      const {content} = toRefs(props)
      if (content.value) {
        ctx.value = canvas.value.getContext('2d')

        const {ctxWidth, ctxHeight} = initCanvas(ctx, ratio, canvas, mark)
        const realSpacing = computedSpacing(props.spacing, ratio)
        draw({content, ctx, realSpacing, ratio, ctxWidth, ctxHeight})
      }
    })
    return {
      repetition,
      canvas,
      mark,
    }
  },
}

</script>

<style lang="stylus">
.ui-water-mark {
  position: relative;
  overflow: hidden;
}

.water-mark-container {
  position: relative;
  z-index: 2;
}

.water-mark-list {
  clearfix();
  absolute-pos();
  position: absolute;
  filter: grayscale(100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;

  .water-mark-canvas {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate3d(-50%, -50%, 0);
  }
}

.water-mark-line {
  position: relative;
  left: 50%;
  float: left;
  width: 10000%;
  display: flex;
  justify-content: center;
  transform: translateX(-50%);
}

.water-mark-item {
  float: left;
  font-size: font-body-large;
  color: color-text-caption;
}
</style>
