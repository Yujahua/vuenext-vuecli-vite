<template>
  <button
    :type="nativeType"
    class="ui-button"
    :class="[
      type,
      inactive ? 'inactive' : 'active',
      inline ? 'inline' : 'block',
      round ? 'round' : '',
      plain ? 'plain' : '',
      size === 'small' ? 'small' : ''
    ]"
    :disabled="inactive || type === 'disabled'"
  >
    <div class="ui-button-inner">
      <template v-if="icon">
        <ui-icon :name="icon" :svg="iconSvg"></ui-icon>
      </template>
      <template v-else-if="loading">
        <ui-activity-indicator-rolling class="ui-button-loading"></ui-activity-indicator-rolling>
      </template>
      <div class="ui-button-content">
        <slot></slot>
      </div>
    </div>
  </button>
</template>

<script>
import ActivityIndicatorRolling from '../activity-indicator/roller'

import Icon from '../icon'

export default {
  name: 'ui-button',
  components: {
    [ActivityIndicatorRolling.name]: ActivityIndicatorRolling,
    [Icon.name]: Icon,
  },

  props: {
    type: {
      type: String,
      default: 'default', // default, primary, warning, disabled, link
    },
    nativeType: {
      type: String,
      default: 'button',
    },
    icon: {
      type: String,
      default: '',
    },
    iconSvg: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'large', // large, small
    },
    plain: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    inactive: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
}

</script>

<style lang="stylus">
.ui-button
  position relative
  display block
  height button-height
  line-height button-height
  font-size button-font-size
  font-weight button-font-weight
  font-family font-family-normal
  text-align center
  border none
  border-radius button-radius
  box-sizing border-box
  outline none
  transition all .3s
  -webkit-appearance none
  -webkit-user-select none
  -webkit-tap-highlight-color transparent
  overflow visible

.ui-button-inner
  display flex
  align-items center
  justify-content center
  width 100%
  height 100%
  overflow hidden
  text-overflow ellipsis
  word-break break-word
  white-space nowrap

.ui-button-loading
  .ui-activity-indicator-svg
    width 35px !important
    height 35px !important
    margin-right 10px

.ui-button-content
  display flex
  align-items center
  padding 0 6px
  .ui-icon
    padding 0

.ui-button
  position relative
  .ui-icon
    display flex
    align-items center
    justify-content center
    padding 0 6px
  // type
  &.default
    background button-default-fill
    color button-default-color
    hairline(all, color-border-element, button-radius, 3px)
    &.active:active
      background button-default-active-fill
    .ui-button-loading .ui-activity-indicator-svg .circle circle
      stroke button-default-color !important
  &.primary
    background button-primary-fill
    color button-primary-color
    hairline(all, button-primary-fill, button-radius, 3px)
    &.active:active
      background button-primary-active-fill
    .ui-button-loading .ui-activity-indicator-svg .circle circle
      stroke button-primary-color !important
  &.warning
    background button-warning-fill
    color button-warning-color
    hairline(all, button-warning-fill, button-radius, 3px)
    &.active:active
      background button-warning-active-fill
    .ui-button-loading .ui-activity-indicator-svg .circle circle
      stroke button-warning-color !important
  &.disabled
    background button-disabled-fill
    color button-disabled-color
    hairline(all, button-disabled-fill, button-radius, 3px)
    .ui-button-loading .ui-activity-indicator-svg .circle circle
      stroke button-disabled-color !important

  &.plain
    background transparent

    &.default
      color button-default-plain-color
      hairline(all, color-border-element, button-radius, 3px)
      &.active:active
        background button-default-plain-active-fill
      .ui-button-loading .ui-activity-indicator-svg .circle circle
        stroke button-default-plain-color !important
    &.primary
      color button-primary-plain-color
      hairline(all, button-primary-fill, button-radius, 3px)
      &.active:active
        background button-primary-plain-active-fill
      .ui-button-loading .ui-activity-indicator-svg .circle circle
        stroke button-primary-plain-color !important
    &.warning
      color button-warning-plain-color
      hairline(all, button-warning-fill, button-radius, 3px)
      &.active:active
        background button-warning-plain-active-fill
      .ui-button-loading .ui-activity-indicator-svg .circle circle
        stroke button-warning-plain-color !important
    &.disabled
      color button-disabled-plain-color
      hairline(all, color-border-element, button-radius, 3px)
      .ui-button-loading .ui-activity-indicator-svg .circle circle
        stroke button-disabled-plain-color !important

  &.round
    border-radius button-height
    &:after
      border-radius button-height !important

  &.inline
    display inline-block
    padding 0 h-gap-md
  &.block
    width 100%

  &.small
    height button-small-height
    line-height button-small-height
    font-size button-small-font-size
    &.round
      border-radius button-small-height
      &:after
        border-radius button-small-height

  &.link
    display inline
    width auto
    height auto
    line-height 1
    font-size button-small-font-size
    font-weight font-weight-normal
    color button-primary-fill
    background transparent
    &.inactive
      color color-text-disabled
      opacity 1

  &.inactive
    opacity opacity-disabled
    &.disabled
      opacity 1
</style>
