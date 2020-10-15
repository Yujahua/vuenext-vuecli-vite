<template>
  <div class="ui-activity-indicator-carousel">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="viewBox"
      :fill="color"
      :style="{width: `${viewWidth}px`, height: `${size}px`}"
      class="ui-activity-indicator-svg carouseling"
    >
      <ui-activity-indicator-carousel-circle
        v-for="(value, index) in circleAnimateValues"
        :key="`carousel-circle-${index}`"
        :size="size"
        :index="index"
        :animate-values="value"
      ></ui-activity-indicator-carousel-circle>
    </svg>
  </div>
</template>

<script>
import {ref, computed} from 'vue'
import CarouselCircle from './carousel-circle'

export default {
  name: 'ui-activity-indicator-carousel',

  components: {
    [CarouselCircle.name]: CarouselCircle,
  },

  props: {
    size: {
      type: Number,
      default: 30,
    },
    color: {
      type: String,
      default: '#2F86F6',
    },
  },
  setup(props) {
    const circleAnimateValues = ref([
      [1, 0.8, 0.6, 0.6, 0.6, 0.8, 1],
      [0.6, 0.8, 1, 0.8, 0.6, 0.6, 0.6],
      [0.6, 0.6, 0.6, 0.8, 1, 0.8, 0.6],
    ])
    const viewWidth = computed(() => {
      const len = circleAnimateValues.value.length
      return len * props.size + (len - 1) * props.size / 2
    })
    const viewBox = computed(() => `0 0 ${viewWidth.value} ${props.size}`)

    return {
      circleAnimateValues,
      viewWidth,
      viewBox,
    }
  },
}

</script>

<style lang="stylus">
.ui-activity-indicator-carousel
  clearfix()
  .carouseling
    float left
    overflow visible
</style>
