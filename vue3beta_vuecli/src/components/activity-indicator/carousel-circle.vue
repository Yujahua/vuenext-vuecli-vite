<template>
  <circle :cx="cx" :cy="size/2" :r="size/2">
    <animate
      attributeName="fill-opacity"
      attributeType="XML"
      begin="0s" dur="1s"
      :values="opacityValues"
      calcMode="linear"
      repeatCount="indefinite"
    />
    <animate
      attributeName="r"
      attributeType="XML"
      begin="0s" dur="1s"
      :values="sizeValues"
      calcMode="linear"
      repeatCount="indefinite"
    />
  </circle>
</template>

<script>
import {computed} from 'vue'

export default {
  name: 'ui-activity-indicator-carousel-circle',

  props: {
    size: {
      type: Number,
      default: 30,
    },
    index: {
      type: Number,
      default: 0,
    },
    animateValues: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
  },
  setup(props) {
    const cx = computed(() => props.index * props.size * 1.5 + props.size / 2)
    const opacityValues = computed(() => props.animateValues.join(';'))
    const sizeValues = computed(() => props.animateValues.map(val => val * props.size / 2).join(';'))

    return {
      cx,
      opacityValues,
      sizeValues,
    }
  },
}

</script>
