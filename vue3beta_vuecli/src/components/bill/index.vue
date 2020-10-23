<template>
  <ui-water-mark
    class="ui-bill"
    :content="waterMark"
  >
    <header class="ui-bill-header">
      <template v-if="!$slots.header">
        <h4 class="ui-bill-title" v-if="title" v-text="title"></h4>
        <div class="ui-bill-no" v-if="no">NO.{{no}}</div>
      </template>
      <template v-else>
        <slot name="header"></slot>
      </template>
    </header>
    <div class="ui-bill-neck">
      <span></span>
    </div>
    <div class="ui-bill-content">
      <div class="ui-bill-detail">
        <slot></slot>
      </div>
      <footer v-if="$slots.footer" class="ui-bill-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
    <template v-slot:watermark="props" v-if="!!$slots.watermark">
      <slot name="watermark" :coord="props.coord"></slot>
    </template>
  </ui-water-mark>
</template>

<script>
import FieldItem from '../field-item'
import WaterMark from '../water-mark'

export default {
  name: 'ui-bill',

  components: {
    [FieldItem.name]: FieldItem,
    [WaterMark.name]: WaterMark,
  },

  props: {
    title: {
      type: String,
      default: '',
    },
    no: {
      type: [String, Number],
      default: '',
    },
    waterMark: {
      type: String,
      default: '',
    },
  },
}

</script>

<style lang="stylus">
.ui-bill
  position relative
  background bill-bg

.ui-bill-header
  display flex
  align-items center
  justify-content space-between
  padding 28px 32px 8px

.ui-bill-title
  color bill-name-color
  font-size bill-name-font-size
  font-weight font-weight-medium
  font-family Songti SC

.ui-bill-no
  color bill-no-color
  font-size bill-no-font-size

.ui-bill-neck
  position relative
  height 36px
  padding 10px
  margin 0 28px
  box-sizing border-box
  span
    position absolute
    display block
    top 50%
    left 10px
    right 10px
    height 1px
    border-top dashed 1px color-border-element

.ui-bill-content
  padding 0 32px 20px 32px

.ui-bill-detail
  padding-bottom 40px
</style>
