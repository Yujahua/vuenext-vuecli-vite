<template>
  <div class="ui-cell-item"
    :class="{
      'is-disabled': disabled,
      'no-border': noBorder,
    }"
    @click="onClick"
  >
    <div
      class="ui-cell-item-body"
      :class="{multilines: !!brief}"
    >
      <div class="ui-cell-item-left" v-if="$slots.left">
        <slot name="left"></slot>
      </div>
      <div v-if="title || brief || $slots.default" class="ui-cell-item-content">
        <p class="ui-cell-item-title" v-if="title" v-text="title"></p>
        <p class="ui-cell-item-brief" v-if="brief" v-text="brief"></p>
        <slot></slot>
      </div>
      <div class="ui-cell-item-right" v-if="arrow || addon || $slots.right">
        <slot name="right">
          {{ addon }}
        </slot>
        <ui-icon v-if="arrow" name="arrow-right" size="md" />
      </div>
    </div>
    <div class="ui-cell-item-children" v-if="$slots.children">
      <slot name="children"></slot>
    </div>
  </div>
</template>

<script>import Icon from '../icon'

export default {
  name: 'ui-cell-item',

  components: {
    [Icon.name]: Icon,
  },

  props: {
    title: {
      type: String,
      default: '',
    },
    brief: {
      type: String,
      default: '',
    },
    addon: {
      type: String,
      default: '',
    },
    arrow: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    noBorder: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const onClick = e => {
      if (!props.disabled) {
        emit('click', e)
      }
    }
    return {
      onClick,
    }
  },
}
</script>

<style lang="stylus">
.ui-cell-item
  position relative
  &.no-border .ui-cell-item-body
    remove-hairline(bottom)


.ui-cell-item-body
  position relative
  display flex
  align-items center
  justify-content space-between
  min-height cell-item-min-height
  padding-top cell-item-padding-v
  padding-bottom cell-item-padding-v
  box-sizing border-box
  hairline(bottom, cell-item-border-color)
  &.multilines
    padding-top cell-item-multilines-padding-v
    padding-bottom cell-item-multilines-padding-v

.ui-cell-item-left
  flex-shrink 0
  margin-right h-gap-lg

.ui-cell-item-content
  flex 1 1 0%
  color cell-item-title-color
  font-size cell-item-title-font-size
  line-height 1.2

.ui-cell-item-right
  flex-shrink 0
  margin-left h-gap-sm
  display inline-flex
  align-items center
  justify-content flex-end
  color cell-item-right-color
  font-size cell-item-right-font-size
  .ui-icon-arrow-right
    margin-left 6px
    margin-right -6px
    color color-text-placeholder

.ui-cell-item-title
  line-height 1.2

.ui-cell-item-brief
  color cell-item-brief-color
  font-size cell-item-brief-font-size
  line-height 1.4
  margin-top v-gap-xs

.ui-cell-item-children
  padding cell-item-padding-v 0

.ui-cell-item
  &.is-disabled
    &,
    .ui-cell-item-content,
    .ui-cell-item-title,
    .ui-cell-item-brief,
    .ui-cell-item-left,
    .ui-cell-item-right,
    .ui-cell-item-children
      color color-text-disabled
</style>
