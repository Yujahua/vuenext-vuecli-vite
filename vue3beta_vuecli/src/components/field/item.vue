<template>
  <div
    class="ui-field-item"
    :class="[
      solid ? 'is-solid' : '',
      currentDisabled ? 'is-disabled' : '',
      alignRight ? 'is-align-right' : '',
      inputEnv
    ]"
    @click="onClick"
  >
    <div class="ui-field-item-content">
      <label class="ui-field-item-title" v-if="title" v-text="title"></label>
      <div class="ui-field-item-left" v-if="$slots.left">
        <slot name="left"></slot>
      </div>
      <div class="ui-field-item-control">
        <slot>
          <template v-if="content">{{ content }}</template>
          <div class="ui-field-item-placeholder" v-else-if="placeholder" v-text="placeholder"></div>
        </slot>
      </div>
      <div class="ui-field-item-right" v-if="arrow || addon || $slots.right">
        <slot name="right">{{ addon }}</slot>
        <ui-icon v-if="arrow" :name="arrow === true ? 'arrow-right' : arrow" size="md" />
      </div>
    </div>
    <div class="ui-field-item-children" v-if="$slots.children">
      <slot name="children"></slot>
    </div>
  </div>
</template>

<script>
import {computed, inject, toRefs} from 'vue'
import Icon from '../icon'
import {isIOS, isAndroid} from '../_util'

export default {
  name: 'ui-field-item',

  components: {
    [Icon.name]: Icon,
  },

  props: {
    title: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    addon: {
      type: String,
      default: '',
    },
    arrow: {
      type: [Boolean, String],
      default: false,
    },
    solid: {
      type: Boolean,
      default: false,
    },
    alignRight: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const inputEnv = computed(() => {
      /* istanbul ignore next */
      if (isIOS) {
        return 'is-ios'
      } else if (isAndroid) {
        return 'is-android'
      } else {
        return 'is-browser'
      }
    })
    const rootField = inject('rootField', {})
    const {disabled} = toRefs(props)
    const currentDisabled = computed(() => {
      return rootField.disabled || disabled.value
    })
    function onClick(e) {
      if (!currentDisabled.value) {
        emit('click', e)
      }
    }
    return {
      inputEnv,
      onClick,
      currentDisabled,
    }
  },
}

</script>

<style lang="stylus">
.ui-field-item
  position relative

.ui-field-item-content
  position relative
  display flex
  align-items center
  justify-content space-between
  min-height field-item-min-height
  padding-top field-item-padding-v
  padding-bottom field-item-padding-v
  box-sizing border-box
  hairline(bottom, field-item-border-color)

.ui-field-item-title
  flex-shrink 0
  margin-right field-item-title-gap
  font-size field-item-font-size

.ui-field-item-left
  flex-shrink 0
  margin-right h-gap-sm
  display inline-flex
  align-items center
  justify-content flex-start
  color field-item-addon-color
  font-size field-item-addon-font-size

.ui-field-item-control
  position relative
  flex 1 1 0%
  color field-item-color
  font-size field-item-font-size
  font-weight field-item-font-weight

.ui-field-item-placeholder
  color field-item-placeholder-color
  font-weight font-weight-normal

.ui-field-item-right
  position relative
  flex-shrink 0
  margin-left h-gap-sm
  display inline-flex
  align-items center
  justify-content flex-end
  color field-item-addon-color
  font-size field-item-addon-font-size
  .ui-icon-arrow-right
    margin-right -6px
    color color-text-placeholder

.ui-field-item-children
  font-size field-item-children-font-size
  margin-top v-gap-md

.ui-field-item
  &.is-solid
    .ui-field-item-title
      width field-item-title-width
  &.is-disabled
    .ui-field-item-control,
    .ui-field-item-left,
    .ui-field-item-right
      color color-text-disabled
  &.is-align-right
    .ui-field-item-control
      text-align right
  &.is-android
    .ui-field-item-control
      font-weight field-title-font-weight-android
</style>
