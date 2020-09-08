<template>
  <div
    class="ui-activity-indicator-spinning"
    :class="{dark: color === 'dark'}"
  >
    <ui-icon
      class="ui-activity-indicator-svg"
      name="spinner"
      :style="{width: `${size}px`, height: `${size}px`}"
    ></ui-icon>
  </div>
</template>

<script>import Icon from '../icon'

export default {
  name: 'ui-activity-indicator-spinning',

  components: {
    [Icon.name]: Icon,
  },

  props: {
    size: {
      type: Number,
      default: 70,
    },
    color: {
      type: String,
      default: 'dark',
      validator(val) {
        return val === 'dark' || val === 'light'
      },
    },
  },
}
</script>

<style lang="stylus">
.ui-activity-indicator-spinning
  clearfix()
  .ui-icon
    float left
  &.dark
    .ui-icon
      filter invert(1)
</style>
