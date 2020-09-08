<template>
  <div class='ui-row'>
    <slot></slot>
  </div>
</template>

<script>export default {
  name: 'ui-row',
  componentName: 'UiRow',
  props: {
    gutter: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang='stylus'>
  .ui-row
    display flex
    /*background-color transparent*/
    flex-wrap nowrap
    position relative
    -webkit-box-sizing border-box
    box-sizing border-box
    &::after,
    &::before
      display table
      content ""

    &::after
      clear both

</style>
