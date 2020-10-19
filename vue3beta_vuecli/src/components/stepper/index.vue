<template>
  <div
    class="ui-stepper"
    :class="{'disabled': disabled}"
  >
    <div
      class="ui-stepper-button ui-stepper-button-reduce"
      :class="{'disabled': isMin}"
      @click="reduce"
    >
    </div>
    <div class="ui-stepper-number">
      <input type="tel"
        :size="contentLength"
        :value="currentNum"
        :readOnly="readOnly"
        @input="onInput"
        @blur="onChange">
    </div>
    <div
      class="ui-stepper-button ui-stepper-button-add"
      :class="{'disabled': isMax}"
      @click="add"
    >
    </div>
  </div>
</template>

<script>
import {ref, computed, watch, onMounted} from 'vue'
import {warn} from '../_util'
function getDecimalNum(num) {
  try {
    return num.toString().split('.')[1].length
  } catch (e) {
    return 0
  }
}

function accAdd(num1, num2) {
  let r1 = getDecimalNum(num1)
  let r2 = getDecimalNum(num2)
  let m = Math.pow(10, Math.max(r1, r2))
  return +((num1 * m + num2 * m) / m)
}

function subtr(num1, num2) {
  let r1 = getDecimalNum(num1)
  let r2 = getDecimalNum(num2)
  let m = Math.pow(10, Math.max(r1, r2))
  let n = r1 >= r2 ? r1 : r2
  return +((num1 * m - num2 * m) / m).toFixed(n)
}

export default {
  name: 'ui-stepper',

  components: {},

  props: {
    defaultValue: {
      type: [Number, String],
      default: 0,
    },
    value: {
      type: [Number, String],
      default: 0,
    },
    step: {
      type: [Number, String],
      default: 1,
    },
    min: {
      type: [Number, String],
      default: -Number.MAX_VALUE,
    },
    max: {
      type: [Number, String],
      default: Number.MAX_VALUE,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    isInteger: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const isMin = ref(false)
    const isMax = ref(false)
    const currentNum = ref(0)
    const contentLength = computed(() => {
      if (!props.value) {
        return 2
      }
      const length = props.value.toString().length
      return length > 2 ? length : 2
    })
    function formatNum(value) {
      // @elist
      value = String(value).replace(/[^0-9.-]/g, '')
      return value === '' ? 0 : props.isInteger ? Math.floor(value) : +value
    }
    function getCurrentNum(value) {
      return Math.max(Math.min(props.max, formatNum(value)), props.min)
    }
    function checkStatus() {
      isMin.value = subtr(currentNum.value, props.step) < props.min
      isMax.value = accAdd(currentNum.value, props.step) > props.max
    }
    watch(
      () => props.defaultValue,
      val => {
        currentNum.value = getCurrentNum(val)
      },
    )
    watch(
      () => props.value,
      val => {
        currentNum.value = getCurrentNum(val)
      },
    )
    watch(
      () => props.min,
      val => {
        if (currentNum.value < val) {
          currentNum.value = val
        }
        checkStatus()
      },
    )
    watch(
      () => props.max,
      val => {
        if (currentNum.value > val) {
          currentNum.value = val
        }
        checkStatus()
      },
    )
    watch(currentNum, (val, oldVal) => {
      checkStatus()

      if (val !== props.value) {
        emit('input', val)
        emit('change', val)
      }

      const diff = val - oldVal

      // judge the event of operation
      if (diff > 0) {
        emit('increase', diff)
      } else if (diff < 0) {
        emit('decrease', Math.abs(diff))
      }
    })
    function checkMinMax() {
      if (props.min > props.max) {
        warn('[ui-vue-stepper] minNum is larger than maxNum')
      }
      return props.max > props.min
    }
    onMounted(() => {
      // verify that the minimum value is less than the maximum value
      checkMinMax()
      currentNum.value = getCurrentNum(props.value || props.defaultValue)
      checkStatus()
    })
    function onChange() {
      currentNum.value = getCurrentNum(currentNum.value)
    }
    function reduce() {
      if (props.disabled || isMin.value) {
        return
      }
      currentNum.value = subtr(currentNum.value, props.step)
      onChange()
    }
    function add() {
      if (props.disabled || isMax.value) {
        return
      }
      currentNum.value = accAdd(currentNum.value, props.step)
      onChange()
    }
    function onInput(event) {
      const {value} = event.target
      const formatted = formatNum(value)
      if (+value !== formatted) {
        event.target.value = formatted
      }
      currentNum.value = formatted
    }

    return {
      isMin,
      isMax,
      currentNum,
      contentLength,
      reduce,
      add,
      onInput,
      onChange,
    }
  },
}

</script>

<style lang="stylus">
.ui-stepper
  color stepper-color
  -webkit-font-smoothing antialiased
  font-size stepper-font-size
  height stepper-height
  display flex
  &.disabled
    .ui-stepper-button
      &:before,
      &:after
        opacity stepper-disabled-opacity
    input
      opacity stepper-disabled-opacity

.ui-stepper-button
  position relative
  width stepper-width-button
  height stepper-height
  background-color stepper-fill
  border-radius stepper-radius-button
  &:after
    content ""
    position absolute
    width 24px
    height 2px
    top 50%
    left 50%
    background stepper-color
    transform translate(-50%, -50%)
  &.ui-stepper-button-add
    &:before
      content ""
      position absolute
      width 2px
      height 24px
      top 50%
      left 50%
      background stepper-color
      transform translate(-50%, -50%)
  &.disabled
    &:before,
    &:after
      opacity stepper-disabled-opacity

.ui-stepper-number
  margin 0 4px
  min-width stepper-width-input
  height stepper-height
  padding 0 4px
  text-align center
  border-radius stepper-radius-input
  background-color stepper-fill
  input
    width 100%
    height stepper-height
    border none
    outline none
    font-size stepper-input-font-size
    line-height stepper-height
    background-color transparent
    box-sizing border-box
    text-align center
    color stepper-color
</style>
