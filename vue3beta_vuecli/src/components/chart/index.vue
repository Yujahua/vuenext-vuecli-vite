<template>
  <svg class="ui-chart" :viewBox="`0 0 ${width} ${height}`">
    <defs>
      <linearGradient
        v-for="color in colors"
        :key="color"
        :id="`path-fill-gradient-${color}`" x1="0" x2="0" y1="0" y2="1">
        <stop :style="`stop-color: ${color}`" offset="0%" stop-opacity="0.4"></stop>
        <stop :style="`stop-color: ${color}`" offset="50%" stop-opacity="0.3"></stop>
        <stop :style="`stop-color: ${color}`" offset="100%" stop-opacity="0.1"></stop>
      </linearGradient>
    </defs>
    <g class="ui-chart-graph" :transform="`translate(${offset.left}, ${offset.top})`">
      <g class="ui-chart-axis-y">
        <g
          v-for="(item, index) in yaxis"
          :key="index"
          :transform="`translate(0, ${item.offset})`"
        >
          <line x1="0" :x2="innerWidth" y1="0" y2="0"></line>
          <text v-text="item.label" x="0" y="0" dx="-0.5em" dy="0.32em"></text>
        </g>
      </g>
      <g class="ui-chart-axis-x" :transform="`translate(0, ${innerHeight})`">
        <g
          v-for="(item, index) in xaxis"
          :key="index"
          :transform="`translate(${item.offset}, 0)`"
        >
          <line x1="0" x2="0" y1="0" y2="6"></line>
          <text v-text="item.label" x="0" y="0" dy="2em"></text>
        </g>
      </g>
      <g class="ui-chart-paths">
        <template v-for="(path, index) in paths">
          <path
            class="ui-chart-path"
            :key="`line-${index}`"
            :style="path.style"
            :d="path.value"
          ></path>
          <path
            v-if="path.area"
            :key="`area-${index}`"
            class="ui-chart-path-area"
            :style="path.area.style"
            :d="path.area.value"
          ></path>
        </template>
      </g>
    </g>
  </svg>
</template>

<script>
import {ref, computed, onMounted, onBeforeUnmount} from 'vue'
export default {
  name: 'ui-chart',

  props: {
    labels: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
    datasets: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
    size: {
      type: Array,
      default: () => [480, 320],
    },
    max: {
      type: Number,
      default() {
        let max = Math.max.apply(
          Math,
          this.datasets.map(data => {
            return Math.max.apply(Math, data.values)
          }),
        )
        let multiple = 1
        while (max > 10) {
          multiple *= 10
          max /= 10
        }
        max = Math.ceil(max) * multiple

        return max
      },
    },
    min: {
      type: Number,
      default() {
        let min = Math.min.apply(
          Math,
          this.datasets.map(data => {
            return Math.min.apply(Math, data.values)
          }),
        )
        let multiple = 1
        while (min > 10) {
          multiple *= 10
          min = min / 10
        }
        min = Math.floor(min) * multiple

        return min
      },
    },
    lines: {
      type: Number,
      default: 5,
    },
    step: {
      type: Number,
      default() {
        return (this.max - this.min) / this.lines
      },
    },
    shift: {
      type: Number,
      default: 0.6,
    },
    format: {
      type: Function,
      default: val => val,
    },
  },
  setup(props) {
    const unit = ref(16)
    const offset = computed(() => {
      return {
        top: 0.2 * unit.value,
        bottom: 0.5 * unit.value,
        left: props.shift * unit.value,
        right: 0.2 * unit.value,
      }
    })
    const width = computed(() => {
      if (typeof props.size[0] === 'string' && props.size[0].indexOf('rem') !== -1) {
        return parseFloat(props.size[0]) * unit.value
      } else {
        return parseFloat(props.size[0])
      }
    })
    const height = computed(() => {
      if (typeof props.size[1] === 'string' && props.size[1].indexOf('rem') !== -1) {
        return parseFloat(props.size[1]) * unit.value
      } else {
        return parseFloat(props.size[1])
      }
    })
    const innerWidth = computed(() => width.value - offset.value.left - offset.value.right)
    const innerHeight = computed(() => height.value - offset.value.top - offset.value.bottom)
    const xaxis = computed(() => {
      const deltaX = innerWidth.value / (props.labels.length - 1)
      const items = props.labels.map((label, index) => {
        return {
          offset: index * deltaX,
          label: label,
        }
      })
      return items
    })
    const yaxis = computed(() => {
      const items = []
      const deltaY = innerHeight.value / props.lines

      for (let i = 0; i < props.lines; i++) {
        items.push({
          offset: i * deltaY,
          label: props.format(props.max - i * props.step),
        })
      }

      items.push({
        offset: innerHeight.value,
        label: props.format(props.min),
      })

      return items
    })
    const lower = computed(() => props.max - (props.lines - 1) * props.step)
    const paths = computed(() => {
      return props.datasets.map(data => {
        const deltaX = innerWidth.value / (data.values.length - 1)
        const deltaY = innerHeight.value / props.lines
        const points = data.values.map((value, index) => {
          if (value < lower.value) {
            return {
              x: index * deltaX,
              y: innerHeight.value - (1 - (lower.value - value) / (lower.value - props.min)) * deltaY,
            }
          } else {
            return {
              x: index * deltaX,
              y: (1 - (value - lower.value) / (props.max - lower.value)) * (innerHeight.value - deltaY),
            }
          }
        })

        const ret = {
          style: {
            fill: 'none',
            stroke: data.color || '#fa8919',
            strokeWidth: data.width || 1,
          },
        }

        if (data.theme === 'heat') {
          ret.style.stroke = `url(#path-fill-gradient-${data.color})`
        } else if (data.theme === 'region') {
          ret.area = {
            value:
              `M0,${innerHeight.value} ` +
              points.map(point => `L${point.x},${point.y}`).join(' ') +
              ` L${points[points.length - 1].x},${innerHeight.value}`,
            style: {
              fill: `url(#path-fill-gradient-${data.color})`,
              stroke: 'none',
            },
          }
        }

        ret.value = `M0,${points.shift().y} ` + points.map(point => `L${point.x},${point.y}`).join(' ')

        return ret
      })
    })

    const colors = computed(() => {
      const uniqueColors = []
      props.datasets.map(data => {
        if (data.color && uniqueColors.indexOf(data.color) === -1) {
          uniqueColors.push(data.color)
        }
      })
      return uniqueColors
    })
    const resize = () => {
      unit.value = parseFloat(
        window.getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue('font-size'),
      )
    }
    onMounted(() => {
      if (document.readyState !== 'loading') {
        resize()
      }
      document.addEventListener('DOMContentLoaded', resize)
      window.addEventListener('resize', resize)
    })
    onBeforeUnmount(() => {
      document.removeEventListener('DOMContentLoaded', resize)
      window.removeEventListener('resize', resize)
    })
    return {
      unit,
      offset,
      width,
      height,
      innerWidth,
      innerHeight,
      xaxis,
      yaxis,
      lower,
      paths,
      colors,
    }
  },
}

</script>

<style lang="stylus">
.ui-chart
  line
    stroke chart-line-color
    stroke-width 0.5
    stroke-linecap square
  path
    stroke chart-path-color
    stroke-width 1
    stroke-linecap butt

.ui-chart-axis-y
  text
    fill chart-text-color
    font-size chart-value-size
    text-anchor end

.ui-chart-axis-x
  text
    fill chart-text-color
    font-size chart-label-size
    text-anchor middle
</style>
