<template>
  <fieldset class="ui-field" :class="{'is-plain': plain, 'is-disabled': disabled}">
    <header class="ui-field-header" v-if="title || brief || $slots.header || $slots.action">
      <div class="ui-field-heading">
        <legend v-if="title" class="ui-field-title" v-text="title"></legend>
        <p v-if="brief" class="ui-field-brief" v-text="brief"></p>
        <slot name="header"></slot>
      </div>
      <div class="ui-field-action">
        <slot name="action"></slot>
      </div>
    </header>
    <div class="ui-field-content">
      <slot></slot>
    </div>
    <footer class="ui-field-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </footer>
  </fieldset>
</template>

<script>
import {provide} from 'vue'
export default {
  name: 'ui-field',

  props: {
    title: {
      type: String,
      default: '',
    },
    brief: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plain: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    provide('rootField', props)
  },
}

</script>

<style lang="stylus">
.ui-field
  padding field-padding-v field-padding-h
  border none
  background-color field-bg-color
  &.is-plain
    padding 0
    background-color transparent

.ui-field-header
  position relative
  display flex
  align-items center
  justify-content space-between
  margin-bottom field-header-gap

.ui-field-heading
  flex 1 1 0%

.ui-field-action
  flex-shrink 0
  display inline-flex
  align-items center
  align-self flex-start
  justify-content flex-end
  margin-left h-gap-sm
  color field-action-color
  font-size field-action-font-size

.ui-field-title
  color field-title-color
  font-size field-title-font-size
  font-weight field-title-font-weight
  line-height 1

.ui-field-brief
  margin-top v-gap-xs
  color field-brief-color
  font-size field-brief-font-size
  line-height 1.4

.ui-field-footer
  margin-top field-footer-gap

.ui-field
  &:disabled,
  &.is-disabled
    .ui-field-title,
    .ui-field-brief,
    .ui-field-action,
    .ui-field-content,
    .ui-field-footer
      color color-text-disabled
</style>
