<template>
  <ui-check-base-box
    class="ui-check-box"
    :label="label"
    :is-checked="isChecked"
    :disabled="disabled"
    @click.native="onClick"
  >
    <slot>{{label}}</slot>
  </ui-check-base-box>
</template>

<script>
import {computed, inject} from 'vue'
import CheckBaseBox from '../check-base/box'

export default {
  name: 'ui-check-box',

  components: {
    [CheckBaseBox.name]: CheckBaseBox,
  },

  props: {
    name: {
      default: true,
    },
    value: {
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const rootGroup = inject('rootGroup', null)
    const isChecked = computed(
      () => props.value === props.name || (rootGroup && rootGroup.value.indexOf(props.name) !== -1),
    )
    const onClick = () => {
      if (props.disabled) {
        return
      }

      if (typeof props.name === 'boolean') {
        emit('input', !props.value)
      } else if (isChecked.value) {
        emit('input', '')
        if (rootGroup) {
          rootGroup.uncheck(props.name)
        }
      } else {
        emit('input', props.name)
        if (rootGroup) {
          rootGroup.check(props.name)
        }
      }
    }
    return {
      isChecked,
      onClick,
    }
  },
}

</script>

<style lang="stylus">
.ui-check-box
  position relative
  display inline-block
  text-align center
  color checkbox-color
  font-size checkbox-font-size
  padding v-gap-sm h-gap-md
  border 1px solid checkbox-border-color
  border-radius checkbox-border-radius
  box-sizing border-box
  overflow hidden
  &.is-checked
    color checkbox-active-color
    border-color checkbox-active-border-color
    &:before
      background-color checkbox-active-bg
    &.is-disabled
      color checkbox-active-color
      border-color checkbox-active-border-color
      opacity 0.6
  &.is-disabled
    color checkbox-disabled-color
    border-color checkbox-disabled-color

  .ui-tag
    position absolute
    top 0
    right 0
    .quarter-bg
      background-color checkbox-active-color
</style>
