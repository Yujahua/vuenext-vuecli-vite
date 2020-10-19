<template>
  <label
    class="ui-check"
    :class="{
      'is-disabled': disabled,
      'is-checked': isChecked
    }"
    @click="onClick"
  >
    <div class="ui-check-icon">
      <ui-icon :name="currentIcon" :size="size" :svg="iconSvg"/>
    </div>
    <div class="ui-check-label" v-if="$slots.default || label">
      <slot>{{ label }}</slot>
    </div>
  </label>
</template>

<script>
import {computed, inject} from 'vue'
import Icon from '../icon'
import checkMixin from './mixin'

export default {
  name: 'ui-check',

  mixins: [checkMixin],

  components: {
    [Icon.name]: Icon,
  },

  props: {
    name: {
      default: true,
    },
    value: {
      default: false,
    },
    size: {
      type: String,
      default: 'md',
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
    const currentIcon = computed(
      () => (props.disabled ? props.iconDisabled : isChecked.value ? props.icon : props.iconInverse),
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
      currentIcon,
      onClick,
    }
  },
}

</script>

<style lang="stylus">
.ui-check
  display flex
  align-items center
  margin-top v-gap-sm
  margin-bottom v-gap-sm
  &.is-checked
    .ui-check-icon
      color check-color
  &.is-disabled
    .ui-check-icon
    .ui-check-label
      color color-text-disabled

.ui-check-icon
  position relative
  color color-text-placeholder
  .ui-icon
    display flex

.ui-check-label
  margin-left h-gap-sm
  font-size inherit
</style>
