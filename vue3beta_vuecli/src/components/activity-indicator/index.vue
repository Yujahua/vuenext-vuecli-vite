<template>
  <div
    class="ui-activity-indicator"
    :class="type"
  >
    <div
      class="indicator-container"
      :class="{vertical}"
    >
      <div class="indicator-loading">
        <template v-if="type === 'roller'">
          <ui-activity-indicator-rolling
            :size="size"
            :color="color"
            :width="width"
          ></ui-activity-indicator-rolling>
        </template>
        <template v-else-if="type === 'spinner'">
          <ui-activity-indicator-spinning
            :size="size"
            :color="color"
          ></ui-activity-indicator-spinning>
        </template>
        <template v-else-if="type === 'carousel'">
          <ui-activity-indicator-carousel
            :size="size"
            :color="color"
          ></ui-activity-indicator-carousel>
        </template>
      </div>
      <div
        v-if="$slots.default"
        :style="{fontSize: `${textSize}px`, color: textColor}"
        class="ui-activity-indicator-text indicator-text"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Roller from './roller'
import Spinner from './spinner'
import Carousel from './carousel'

export default {
  name: 'ui-activity-indicator',

  components: {
    [Roller.name]: Roller,
    [Spinner.name]: Spinner,
    [Carousel.name]: Carousel,
  },

  props: {
    type: {
      type: String,
      default: 'roller', // roller, spinner, carousel
    },
    size: {
      type: Number,
      default: 70,
    },
    width: {
      type: Number,
    },
    color: {
      type: String,
      default({type}) {
        if (type === 'spinner') {
          return 'dark'
        } else {
          return '#2F86F6'
        }
      },
    },
    textColor: {
      type: String,
      default: '#999',
    },
    textSize: {
      type: Number,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
}

</script>

<style lang="stylus">
.ui-activity-indicator
  .indicator-container
    display flex
    flex-direction row
    align-items center
    .indicator-text
      margin 0 0 0 15px
      color color-text-minor
    &.vertical
      flex-direction column
      justify-content center
      .indicator-text
        margin 15px 0 0 0
</style>
