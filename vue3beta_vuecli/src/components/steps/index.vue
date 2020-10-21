<template>
  <div
    class="ui-steps"
    :class="{
      'ui-steps-vertical': direction == 'vertical',
      'ui-steps-horizontal': direction == 'horizontal',
      'vertical-adaptive': direction == 'vertical' && verticalAdaptive,
      'no-current': currentLength % 1 !== 0
    }"
  >
    <template>
      <div class="step-wrapper"
        v-for="(step, index) of steps"
        :class="[getStepStatusClass(index)]"
        :key="`steps-${index}`"
      >
        <!-- Customize uniformly -->
        <div v-if="$slots.icon" class="icon-wrapper" >
          <slot name="icon" :index="index" :current-index="currentLength"></slot>
        </div>
        <!-- Customize by status-->
        <div v-else class="icon-wrapper">
          <template v-if="index < currentLength">
            <slot
              v-if="$slots.reached || $slots.reached"
              name="reached"
              :index="index"
            ></slot>
            <div v-else class="step-node-default">
              <div class="step-node-default-icon" style="width: 6px;height: 6px;border-radius: 50%;"></div>
            </div>
          </template>
          <template v-else-if="index === currentLength">
            <slot
              v-if="$slots.current || $slots.current"
              name="current"
              :index="index"
            ></slot>
            <ui-icon v-else name="success"></ui-icon>
          </template>
          <template v-else>
            <slot
              v-if="$slots.unreached || $slots.unreached"
              name="unreached"
              :index="index"
            ></slot>
            <div v-else class="step-node-default">
              <div class="step-node-default-icon" style="width: 6px;height: 6px;border-radius: 50%;"></div>
            </div>
          </template>
        </div>
        <div class="text-wrapper">
          <slot
            v-if="$slots.content"
            name="content"
            :index="index"
            :step="step"
          ></slot>
          <template v-else>
            <div class="name">
              {{step.name}}
            </div>
            <div class="desc" v-if="step.text">
              {{step.text}}
            </div>
          </template>
        </div>
      </div>
      <div class="bar"
        :class="[direction === 'horizontal' ? 'horizontal-bar' : 'vertical-bar']"
        :style="getStepSizeForStyle(index)"
        :key="`bar-${index}`"
      >
        <i
          class="bar-inner"
          v-if="progress[index]"
          :style="barInnerStyle(index)"
        ></i>
      </div>
    </template>
  </div>
</template>

<script>
import {
  toRefs,
  computed,
  getCurrentInstance,
  reactive,
  watch,
  set,
  onMounted,
  onUpdated,
  nextTick,
} from 'vue'
import Icon from '../icon'
import {toArray} from '../_util'

export default {
  name: 'ui-steps',

  components: {
    [Icon.name]: Icon,
  },

  props: {
    steps: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
    current: {
      type: Number,
      default: 0,
      validator(val) {
        return val >= 0
      },
    },
    direction: {
      type: String,
      default: 'horizontal',
    },
    transition: {
      type: Boolean,
      default: false,
    },
    verticalAdaptive: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const state = reactive({
      initialed: false,
      progress: [],
      stepsSize: [],
      currentLength: 0,
      duration: 0.3,
      timer: null,
    })
    const that = getCurrentInstance()
    const barInnerStyle = computed(() => {
      return index => {
        const {progress} = that
        const transform =
          that.direction === 'horizontal'
            ? `(${(progress[index]['len'] - 1) * 100}%, 0, 0)`
            : `(0, ${(progress[index]['len'] - 1) * 100}%, 0)`
        return {
          transform: `translate3d${transform}`,
          transition: `all ${progress[index]['time']}s linear`,
        }
      }
    })
    const formatValue = val => {
      if (val < 0) {
        return 0
      } else if (val > props.steps.length - 1) {
        return props.steps.length - 1
      } else {
        return val
      }
    }
    const sliceProgress = current => {
      return props.steps.slice(0, props.steps.length - 1).map((step, index) => {
        const offset = current - index
        const progress = state.progress[index]
        const isNewProgress = progress === undefined
        let len, time
        if (offset <= 0) {
          len = 0
        } else if (offset >= 1) {
          len = 1
        } else {
          len = offset
        }
        time = (isNewProgress ? len : Math.abs(progress.len - len)) * state.duration
        return {
          len,
          time,
        }
      })
    }
    const doTransition = (progress, isAdd, step) => {
      let currentLength = isAdd ? 0 : state.currentLength
      const walk = index => {
        if ((index < progress.length) & (index > -1) && progress[index]) {
          if (isAdd) {
            currentLength += progress[index].len
          } else {
            currentLength -= state.progress[index].len - progress[index].len
          }

          setTimeout(() => {
            index += isAdd ? 1 : -1
            step(currentLength)
            walk(index)
          }, progress[index].time * 1000)
        }
        set(state.progress, index, progress[index])
      }
      walk(isAdd ? 0 : progress.length - 1)
    }
    const initStepSize = () => {
      if (props.direction !== 'vertical' || props.verticalAdaptive) {
        return
      }
      const iconWrappers = that.$el.querySelectorAll('.icon-wrapper')
      const textWrappers = that.$el.querySelectorAll('.text-wrapper')
      const stepsSize = toArray(textWrappers).map((wrapper, index) => {
        let stepHeight = wrapper.clientHeight
        const iconHeight = iconWrappers[index].clientHeight
        if (index === textWrappers.length - 1) {
          // The last step needs to subtract floated height
          stepHeight -= iconHeight
        } else {
          // Add spacing between steps to prevent distance too close
          stepHeight += 40
        }
        return stepHeight > 0 ? stepHeight : 0
      })

      if (stepsSize.toString() !== state.stepsSize.toString()) {
        state.stepsSize = stepsSize
      }
    }
    const getStepSizeForStyle = index => {
      const size = props.direction === 'vertical' && !props.verticalAdaptive ? state.stepsSize[index] : 0
      return size
        ? {
            height: `${size}px`,
          }
        : null
    }
    const getStepStatusClass = index => {
      const currentLength = state.currentLength

      let status = []

      if (index < currentLength) {
        status.push('reached')
      }

      if (index === Math.floor(currentLength)) {
        status.push('current')
      }

      return status.join(' ')
    }
    watch(
      () => props.current,
      (val, oldVal) => {
        const currentStep = formatValue(val)
        const newProgress = sliceProgress(currentStep)
        if (props.transition) {
          const isAdd = currentStep >= oldVal
          state.timer && clearTimeout(state.timer)
          state.timer = setTimeout(() => {
            doTransition(newProgress, isAdd, len => {
              if ((isAdd && len > state.currentLength) || (!isAdd && len < state.currentLength)) {
                state.currentLength = len
              }
            })
          }, 100)
        } else {
          state.progress = newProgress
          state.currentLength = currentStep
        }
      },
    )
    // created
    const currentStep = formatValue(props.current)
    state.currentLength = currentStep
    state.progress = sliceProgress(currentStep)
    onMounted(() => {
      initStepSize()
    })
    onUpdated(() => {
      nextTick(() => {
        initStepSize()
      })
    })
    return {
      ...toRefs(state),
      barInnerStyle,
      formatValue,
      sliceProgress,
      doTransition,
      initStepSize,
      getStepSizeForStyle,
      getStepStatusClass,
    }
  },
}

</script>

<style lang="stylus">
.ui-steps
  display flex
  justify-content space-around
  font-size 28px

  &.ui-steps-horizontal
    align-items center
    padding 40px 100px 100px
    .step-wrapper
      margin 0 4px
      justify-content center
      align-items center
      flex-direction column
      &.reached
        .text-wrapper .name
          color steps-text-color
      &.current
        .text-wrapper .name
          color steps-color-active
    .text-wrapper
      top 100%
      padding-top steps-text-gap-horizontal
      text-align center
      .name
        color steps-desc-color
      .desc
        margin-top 10px
        color steps-desc-color
    &.no-current
      .reached:last-of-type
        display none !important

  &.ui-steps-vertical
    align-items flex-start
    padding 40px
    flex-direction column
    &.vertical-adaptive
      justify-content normal
      padding 40px 40px 8px
      .bar.vertical-bar
        flex 1
    .step-wrapper
      width 100%
      margin 4px 0
      align-items stretch
      .icon-wrapper
        position relative
        .step-node-default
          min-width steps-icon-size
          min-height steps-icon-size
      .text-wrapper
        left steps-icon-size
        padding-left steps-text-gap-vertical
        .name, .desc
          white-space normal
        .name
          color steps-text-color
        .desc
          margin-top 18px
          color steps-desc-color

  .icon-wrapper
    display flex
    justify-content center
    align-items center
    color steps-color

    >div
      display flex
      justify-content center
      align-items center
    &:nth-child(2)
      display none

    .step-node-default-icon
      background steps-color

  .step-wrapper
    display flex
    position relative
    min-width steps-icon-size
    min-height steps-icon-size
    .icon-wrapper
      min-width steps-icon-size
      min-height steps-icon-size
      .ui-icon
        width steps-icon-size
        height steps-icon-size
        font-size steps-icon-size
        line-height steps-icon-size
    .text-wrapper
      position absolute
      .name, .desc
        white-space nowrap
      .name
        line-height steps-text-font-size
        font-size steps-text-font-size
      .desc
        line-height steps-text-font-size
        font-size steps-desc-font-size
    &.reached, &.current
      .icon-wrapper
        color steps-color-active
        .step-node-default-icon
          background steps-color-active

  .bar
    position relative
    background-color steps-color
    overflow hidden
    .bar-inner
      z-index 10
      position absolute
      top 0
      left 0
      display block
      content ''
      transition all linear 1s
    &.horizontal-bar
      flex 1
      height steps-border-size
      .bar-inner
        width 100%
        height steps-border-size
        background-color steps-color-active
    &.vertical-bar
      left 16px
      width steps-border-size
      transform translateX(-50%)
      .bar-inner
        width steps-border-size
        height 100%
        background-color steps-color-active
    &:last-of-type
      &.horizontal-bar
        display none
      &.vertical-bar
        visibility hidden
</style>
