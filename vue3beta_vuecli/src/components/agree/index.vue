<template>
  <div
    class="ui-agree"
    :class="[
      disabled ? 'disabled' : ''
    ]">
    <div
      class="ui-agree-icon"
      :class="[
        value ? 'checked' : ''
      ]"
      @click="onChange($event)">
      <div class="ui-agree-icon-container">
        <ui-icon name="checked" :size="size"></ui-icon>
        <ui-icon name="check" :size="size"></ui-icon>
      </div>
    </div>
    <div class="ui-agree-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {toRefs} from 'vue'
import Icon from '../icon'
export default {
  name: 'ui-agree',

  components: {
    [Icon.name]: Icon,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
    },
  },
  setup(props, {emit}) {
    const {disabled, value} = toRefs(props)
    const onChange = function(event) {
      if (disabled.value) {
        return
      }
      emit('input', !value.value)
      emit('change', event)
    }
    return {
      onChange,
    }
  },
}

</script>

<style lang="stylus">
.ui-agree
  display flex
  align-items center
  &.disabled
    opacity agree-disabled-opacity

.ui-agree-icon
  display flex
  justify-content center
  align-items center
  align-self flex-start
  flex-shrink 0
  position relative
  margin-right h-gap-sm
  color agree-fill
  width 50px
  height 50px
  .ui-agree-icon-container
    position relative
    .ui-icon
      display flex
      width auto 
      height auto
      line-height 1
      will-change auto
      &.ui-icon-checked
        position absolute
        top 0
        left 0
        transform scale(0.6)
        color transparent
        transition all .3s ease-in-out-quint
      &.ui-icon-check
        color agree-fill
  &.checked .ui-agree-icon-container
    .ui-icon-checked
      transform scale(1)
      color agree-fill
    .ui-icon-check
      opacity 0.8

.ui-agree-content
  flex 1 1 0%
  line-height 1.5
</style>
