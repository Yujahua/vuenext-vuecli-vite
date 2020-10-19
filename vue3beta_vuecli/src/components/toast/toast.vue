<template>
  <div class="ui-toast" :class="[position]">
    <ui-popup
      :value="visible"
      @show="onShow"
      @hide="onHide"
      :hasMask="hasMask"
      :maskClosable="false"
    >
      <div class="ui-toast-content" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="ui-toast-content" v-else>
        <ui-icon v-if="icon" :name="icon" size="lg" :svg="iconSvg"/>
        <div class="ui-toast-text" v-if="content" v-text="content"></div>
      </div>
    </ui-popup>
  </div>
</template>

<script>
import {onUnmounted, ref} from 'vue'
import Popup from '../popup'
import Icon from '../icon'

export default {
  name: 'ui-toast',

  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
  },
  props: {
    icon: {
      type: String,
      default: '',
    },
    iconSvg: {
      type: Boolean,
      default: false,
    },
    content: {
      type: [String, Number],
      default: '',
    },
    duration: {
      type: Number,
      default: 0,
    },
    position: {
      // top, left, bottom
      type: String,
      default: 'center',
    },
    hasMask: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, {emit}) {
    let visible = ref(false)
    let timer = null
    const onShow = () => {
      emit('show')
    }
    const onHide = () => {
      emit('hide')
    }
    const hide = () => {
      visible.value = false
    }
    const fire = () => {
      if (timer) {
        clearTimeout(timer)
      }
      if (visible.value && props.duration) {
        timer = setTimeout(() => {
          hide()
        }, props.duration)
      }
    }
    const show = () => {
      visible.value = true
      fire()
    }

    onUnmounted(() => {
      if (timer) {
        clearTimeout(timer)
      }
    })
    return {
      visible,
      onShow,
      onHide,
      fire,
      show,
      hide,
    }
  },
}

</script>

<style lang="stylus">
.ui-toast
  .ui-popup
    z-index toast-zindex
  .ui-icon
    flex-shrink 0
    color toast-color
  .ui-icon + .ui-toast-text
    margin-left h-gap-xs
  .ui-popup
    .ui-popup-box
      width 540px
      display flex
      justify-content center
    .ui-popup-mask
      background transparent
  &.bottom
    .ui-popup .ui-popup-box
      position absolute
      bottom 50px
      left 50%
      transform translateX(-50%)
  &.top
    .ui-popup .ui-popup-box
      position absolute
      top 50px
      left 50%
      transform translateX(-50%)

.ui-toast-content
  display inline-flex
  align-items center
  max-width 100%
  min-width 80px
  padding toast-padding
  border-radius toast-radius
  font-size toast-font-size
  text-align left
  line-height 1.42857142
  color toast-color
  background-color toast-fill
  box-sizing border-box
  overflow hidden

.ui-toast-text
  white-space nowrap
  text-overflow: ellipsis
  overflow hidden
</style>
