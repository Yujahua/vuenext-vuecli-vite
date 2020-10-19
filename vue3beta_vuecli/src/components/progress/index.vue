<template>
  <ui-activity-indicator-rolling
    class="ui-progress"
    :process="formatValue"
    :size="size"
    :width="width"
    :color="color"
    :border-color="borderColor"
    :fill="fill"
    :linecap="linecap"
    :rotate="rotate"
  >
    <slot></slot>
    <template slot="defs">
      <slot name="defs"></slot>
    </template>
  </ui-activity-indicator-rolling>
</template>

<script>
import {ref, watch, onMounted} from 'vue'
import Roller from '../activity-indicator/roller'
import {noop, inBrowser} from '../_util'
import Animate from '../_util/animate'

export default {
  name: 'ui-progress',

  components: {
    [Roller.name]: Roller,
  },

  props: {
    size: {
      type: Number,
      default: 70,
    },
    width: {
      type: Number,
    },
    color: {
      type: String,
      default: '#2F86F6',
    },
    borderColor: {
      type: String,
      default: 'rgba(0, 0, 0, .1)',
    },
    fill: {
      type: String,
      default: 'transparent',
    },
    linecap: {
      // butt | round
      type: String,
      default: 'round',
    },
    rotate: {
      type: Number,
      default: 0,
    },
    value: {
      // progress control 0-1
      type: Number,
      default: 0,
    },
    transition: {
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
    const doAnimateDisplay = (fromValue = 0, toValue = 0) => {
      /* istanbul ignore next  */
      const step = percent => {
        formatValue.value = fromValue + (toValue - fromValue) * percent
      }

      const verify = id => id
      /* istanbul ignore next  */
      Animate.start(step, verify, noop, props.duration)
    }
    watch(
      () => props.value,
      (val, oldVal) => {
        /* istanbul ignore if  */
        if ((!inBrowser && !isMounted.value) || !props.transition) {
          formatValue.value = val
          return
        }
        doAnimateDisplay(oldVal, val)
      },
      {immediate: true},
    )
    onMounted(() => {
      isMounted.value = true
    })
    return {
      formatValue,
      isMounted,
      doAnimateDisplay,
    }
  },
}

</script>
