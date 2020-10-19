<template>
  <label
    class="ui-radio"
    :class="{
      'is-disabled': disabled,
      'is-checked': isChecked,
      'is-inline': inline
    }"
    @click="onClick"
  >
    <div class="ui-radio-icon">
      <ui-icon :name="currentIcon" :size="size" :svg="iconSvg"/>
    </div>
    <div class="ui-radio-label" v-if="$slots.default || label">
      <slot>{{ label }}</slot>
    </div>
  </label>
</template>

<script>
import {computed, inject} from 'vue'
import Icon from '../icon'
import radioMixin from './mixins'

export default {
  name: 'ui-radio',

  mixins: [radioMixin],

  components: {
    [Icon.name]: Icon,
  },

  props: {
    name: {
      required: true,
    },
    value: {
      default: '',
    },
    size: {
      type: String,
      default: 'md',
    },
    label: {
      type: String,
      default: '',
    },
    inline: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // Mixins Props
    // icon: {
    //   type: String,
    //   default: 'checked',
    // },
    // iconInverse: {
    //   type: String,
    //   default: 'check',
    // },
    // iconDisabled: {
    //   type: String,
    //   default: 'check-disabled',
    // },
    // iconSvg: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  setup(props, {emit}) {
    const rootGroup = inject('rootGroup', null)
    const isChecked = computed(() => props.value === props.name || (rootGroup && rootGroup.value === props.name))
    const currentIcon = computed(
      () => (props.disabled ? props.iconDisabled : isChecked.value ? props.icon : props.iconInverse),
    )
    const onClick = () => {
      if (!props.disabled) {
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
.ui-radio
  display flex
  align-items center
  line-height 1.5
  margin-top v-gap-sm
  margin-bottom v-gap-sm
  .ui-radio-icon
    color color-text-placeholder
    .ui-icon
      display flex
  &.is-checked
    .ui-radio-icon
      color radio-color
  &.is-disabled
    .ui-radio-icon
    .ui-radio-label
      color color-text-disabled
  &.is-inline
    display inline-flex
    &:not(:last-child)
      margin-right 40px

.ui-radio-icon
  position relative
  flex-shrink 0

.ui-radio-label
  margin-left h-gap-sm
  font-size inherit
  font-weight font-weight-normal
</style>

