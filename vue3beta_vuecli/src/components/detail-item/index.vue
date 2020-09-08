<template>
  <div class="ui-detail-item" :class="{ 'is-bold': bold }">
    <div class="ui-detail-title" v-text="title"></div>
    <div class="ui-detail-content">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>

<script>export default {
  name: 'ui-detail-item',

  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: [String, Number],
      default: '',
    },
    bold: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="stylus">
.ui-detail-item
  display flex
  align-items center
  justify-content space-between
  line-height 1.35
  font-size detail-item-font-size
  padding-top detail-item-gap
  padding-bottom detail-item-gap

.ui-detail-title
  flex-shrink 0
  color detail-item-title-color

.ui-detail-content
  flex 1 1 0%
  color detail-item-content-color
  display flex
  align-items center
  justify-content flex-end
  margin-left h-gap-sm

.ui-detail-item
  &.is-bold
    .ui-detail-title,
    .ui-detail-content
      font-weight bold
      color detail-item-content-color
</style>
