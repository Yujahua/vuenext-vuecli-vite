<template>
  <div class="ui-activity-indicator-rolling-success">
    <ui-activity-indicator-rolling
      :width="strokeWidth"
      :radius="radius"
      fill="#FFF6F1"
      border-color="transparent"
    >
      <template v-if="isSuccess">
        <g name="circle" slot="circle">
          <circle
            class="success"
            :cx="viewBoxSize/2"
            :cy="viewBoxSize/2"
            fill="#FFF6F1"
            stroke="none"
            :r="radius"
          ></circle>
        </g>
      </template>
      <svg
        v-if="isSuccess"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        class="right"
        :style="{transform: `translate(-50%, -50%) scale(${size/70})`}"
      >
        <g>
          <line
            x1="32"
            y1="47"
            x2="45"
            y2="62"
            :style="{'strokeWidth':strokeWidth, 'stroke': color}"
            stroke-dasharray="20"
          />
          <line
            x1="42"
            y1="62"
            x2="68.4"
            y2="40"
            :style="{'strokeWidth':strokeWidth, 'stroke': color}"
            stroke-dasharray="35"
          />
        </g>
      </svg>
    </ui-activity-indicator-rolling>
  </div>
</template>

<script>
import {ref, computed, watch, onMounted} from 'vue'
import Roller from './roller'

export default {
  name: 'ui-activity-indicator-rolling-success',

  components: {
    [Roller.name]: Roller,
  },

  props: {
    size: {
      type: Number,
      default: 70,
    },
    color: {
      type: String,
      default: '#2F86F6',
    },
    isSuccess: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const animating = ref(false)
    const startTmp = ref(Date.now())
    const successFlag = ref(false)
    const strokeWidth = computed(() => props.size / 16)
    const radius = computed(() => props.size / 2)
    const viewBoxSize = computed(() => props.size + 2 * strokeWidth.value)
    const doSuccess = () => {
      const st = startTmp.value
      const et = Date.now()
      const delay = Math.ceil((et - st) / 1500) * 1500 - (et - st)
      setTimeout(() => {
        /* istanbul ignore next */
        successFlag.value = true
      }, delay)
    }
    onMounted(() => {
      if (props.isSuccess) {
        doSuccess()
      }
      // props.isSuccess && doSuccess()
    })
    watch(
      () => props.isSuccess,
      val => {
        if (val) {
          doSuccess()
        } else {
          startTmp.value = Date.now()
          successFlag.value = false
        }
      },
    )
    return {
      animating,
      startTmp,
      successFlag,
      strokeWidth,
      radius,
      viewBoxSize,
      doSuccess,
    }
  },
}

</script>

<style lang="stylus">
.ui-activity-indicator-rolling-success {
  position: relative;

  .right {
    position: absolute;
    left: 50%;
    top: 50%;

    line {
      will-change: auto;

      &:first-child {
        animation: ui-activity-indicator-rolling-line0 0.2s cubic-bezier(1, 0.5, 0.8, 1) forwards;
      }

      &:last-child {
        opacity: 0;
        animation: ui-activity-indicator-rolling-line1 0.2s cubic-bezier(1, 0.5, 0.8, 1) 0.2s forwards;
      }
    }
  }
}

@keyframes ui-activity-indicator-rolling-line0 {
  from {
    stroke-dashoffset: 20;
  }

  to {
    stroke-dashoffset: 0;
  }
}

@keyframes ui-activity-indicator-rolling-line1 {
  from {
    opacity: 1;
    stroke-dashoffset: 35;
  }

  to {
    opacity: 1;
    stroke-dashoffset: 0;
  }
}
</style>
