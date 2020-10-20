<template>
  <span class="ui-amount" :class="{numerical: !isCapital}">
    <template v-if="!isCapital">{{doFormat(doPrecision(formatValue,legalPrecision, isRoundUp),hasSeparator, separator) }}</template>
    <template v-else> {{ doCapital(doPrecision(formatValue,4, isRoundUp)) }} </template>
  </span>
</template>

<script>
import {ref, watch, computed, onMounted} from 'vue'
import {noop, inBrowser} from '../_util'
import Animate from '../_util/animate'
import {formatValueByGapStep} from '../_util/formate-value'
import numberCapital from './number-capital'
function doAnimateDisplay(fromValue = 0, toValue = 0, formatValue, duration) {
  /* istanbul ignore next  */
  const step = percent => {
    if (percent === 1) {
      formatValue.value = toValue
      return
    }
    formatValue.value = fromValue + (toValue - fromValue) * percent
  }

  /* istanbul ignore next  */
  const verify = id => id
  Animate.start(step, verify, noop, duration)
}
export default {
  name: 'ui-amount',

  props: {
    value: {
      type: Number,
      default: 0,
    },
    precision: {
      type: Number,
      default: 2,
    },
    isRoundUp: {
      type: Boolean,
      default: true,
    },
    hasSeparator: {
      type: Boolean,
      default: false,
    },
    separator: {
      type: String,
      default: ',',
    },
    isAnimated: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: Boolean,
      default: false,
    },
    isCapital: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 1000,
    },
  },

  setup(props) {
    const formatValue = ref(0)
    const isMounted = ref(false)
    onMounted(() => {
      isMounted.value = true
    })
    watch(
      () => props.value,
      (val, oldVal) => {
        /* istanbul ignore if  */
        if (!inBrowser && !isMounted.value) {
          formatValue.value = val
          return
        }
        if (props.isAnimated || props.transition) {
          doAnimateDisplay(oldVal, val, formatValue, props.duration)
        } else {
          formatValue.value = val
        }
      },
      {immediate: true},
    )
    const legalPrecision = computed(() => {
      return props.precision > 0 ? props.precision : 0
    })
    const doFormat = function(value, hasSeparator, separator) {
      if (!hasSeparator) {
        return value
      }
      const numberParts = value.split('.')
      const integerValue = numberParts[0]
      const decimalValue = numberParts[1] || ''
      const formateValue = formatValueByGapStep(3, integerValue, separator, 'right', 0, 1)
      return decimalValue ? `${formateValue.value}.${decimalValue}` : `${formateValue.value}`
    }
    const doCapital = function(value) {
      return numberCapital(value)
    }
    const doPrecision = function(value, precision, isRoundUp) {
      const exponentialForm = Number(`${value}e${precision}`)
      const rounded = isRoundUp ? Math.round(exponentialForm) : Math.floor(exponentialForm)
      return Number(`${rounded}e-${precision}`).toFixed(precision)
    }

    return {
      formatValue,
      legalPrecision,
      doPrecision,
      doFormat,
      doCapital,
    }
  },
}

</script>

<style lang="stylus">
.ui-amount
  &.numerical
    font-family font-family-number
</style>
