<template>
  <div class="ui-tag">
    <template v-if="shape === 'quarter'">
      <div :class="computedClass">
        <div class="quarter-content">
          <slot></slot>
        </div>
        <div class="quarter-bg" :style="colorStyle"></div>
      </div>
    </template>
    <template v-else-if="shape === 'coupon'">
      <div :class="computedClass">
        <div class="coupon-container" :style="colorStyle">
          <div
            class="left-coupon"
            :style="{ background: fillColor ? 'radial-gradient(circle at left, transparent 33%, ' + fillColor + ' 33%)' : ''}"
            v-if="shape === 'coupon'"
          >
          </div>
          <slot></slot>
          <div
            class="right-coupon"
            :style="{ background: fillColor ? 'radial-gradient(circle at right, transparent 33%, ' + fillColor + ' 33%)' : ''}"
            v-if="shape === 'coupon'"
          >
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div :class="computedClass" :style="[colorStyle, sizeStyle]">
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<script>
import {reactive, set, computed, onMounted, nextTick, getCurrentInstance} from 'vue'
import {transformCamelCase} from '../_util'
export default {
  name: 'ui-tag',
  props: {
    size: {
      type: String, // tiny, small, large
      default: 'large',
    },
    shape: {
      // square, circle, fillet, quarter, coupon, bubble
      type: String,
      default: 'square',
    },
    sharp: {
      // top-left, top-right, bottom-left, bottom-right
      type: String,
      default: '',
    },
    type: {
      // fill ghost
      type: String,
      default: 'ghost',
    },
    fillColor: {
      type: String,
      default: '',
    },
    fontWeight: {
      // normal, bold, bolder
      type: String,
      default: 'normal',
    },
    fontColor: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const sizeStyle = reactive({})
    const computedClass = computed(() => {
      return [
        'default',
        `size-${props.size}`,
        `shape-${props.shape}`,
        `type-${props.type}`,
        `font-weight-${props.fontWeight}`,
      ]
    })
    const colorStyle = computed(() => {
      let style = {}
      if (props.type === 'fill') {
        // eslint-disable-next-line
        props.fillColor && (style.background = props.fillColor)
      }
      if (props.fontColor) {
        if (props.type === 'ghost') {
          style.borderColor = props.fontColor
        }
        style.color = props.fontColor
      }
      return style
    })

    onMounted(() => {
      const el = getCurrentInstance().$el
      nextTick(() => {
        if (props.shape === 'circle') {
          const radius = el.offsetHeight / 2
          // sizeStyle.paddingLeft=radius + 'px'
          // sizeStyle.paddingRight=radius + 'px'
          // sizeStyle.borderRadius=radius + 'px'
          set(sizeStyle, 'paddingLeft', radius + 'px')
          set(sizeStyle, 'paddingRight', radius + 'px')
          set(sizeStyle, 'borderRadius', radius + 'px')

          if (props.sharp) {
            // sizeStyle[transformCamelCase(`border-${props.sharp}-radius`)]=0
            set(sizeStyle, transformCamelCase(`border-${props.sharp}-radius`), 0)
          }
        }
      })
    })
    return {
      sizeStyle,
      computedClass,
      colorStyle,
    }
  },
}

</script>

<style lang="stylus">
.ui-tag
  color color-text-base
  font-size 28px
  text-align center
  display inline-block
  -webkit-user-select none

  .default
    background rgba(0,0,0,0)
    color tag-color
    border-color tag-color
  .shape-square
    padding 0 12px
    border-radius 50%
  .shape-square
    padding 0 12px
    border-radius 0
  .shape-fillet
    padding 2px 8px
    border-radius tag-fillet-radius
  .shape-quarter
    position relative
    display flex
    width 56px
    height 56px
    background transparent !important
    overflow hidden
    .quarter-content
      position relative
      left 10%
      bottom 10%
      display flex
      flex 1
      z-index 2
      justify-content center
      align-items center
      // transform translate(-50%, -75%)
    .quarter-bg
      position absolute
      top -100%
      left 0
      width 200%
      height 200%
      border-radius radius-circle
    .quarter-wrap
      display inline-block
      padding 16px 12px 10px 26px
    .quarter-wrap-hidden
      visibility hidden
      display inline-block
      padding 16px 12px 10px 26px
    
    &.size-small
      width 40px
      height 40px
    &.size-tiny
      width 24px
      height 24px

  .shape-coupon
    position relative
    padding 0 10px
    background transparent !important
    .coupon-container
      padding 2px 0
    .left-coupon,
    .right-coupon
      position absolute
      top 0
      width 10px
      height 100%
    .left-coupon
      left 0
    .right-coupon
      right 0
    
    &.size-small
      padding 0 8px
      .left-coupon,
      .right-coupon
        width 8px
    &.size-tiny
      padding 0 5px
      .left-coupon,
      .right-coupon
        width 5px

  .shape-bubble
    width 50px
    padding 6px 0
    border-radius radius-circle
    border-bottom-left-radius 0
    box-sizing border-box

    &.size-small
      width 38px
      padding 3px 0
    &.size-tiny
      width 24px
      padding 2px 0

  .size-large
    font-size tag-large-font-size
  .size-small
    font-size tag-small-font-size
  .size-tiny
    font-size tag-tiny-font-size
  .type-fill
    color color-text-base-inverse
    background tag-color
  .type-ghost
    border 1px solid tag-color
    background rgba(0,0,0,0)

  .font-weight-normal
    font-weight normal
  .font-weight-bold
    font-weight bold
  .font-weight-bolder
    font-weight bolder

  .ui-icon.icon-font
    font-size inherit
    transform scale(1.2)
</style>
