<template>
  <div class="ui-landscape" :class="{'is-full': fullScreen}">
		<ui-popup
      v-model="isLandscapeShow"
      :mask-closable="maskClosable"
      prevent-scroll
      prevent-scroll-exclude=".ui-landscape-content"
      :has-mask="!fullScreen && hasMask"
      :transition="fullScreen ? 'ui-fade' : 'ui-punch'"
      @input="$emit('input', false)"
      @show="$emit('show')"
      @hide="$emit('hide')">
      <div class="ui-landscape-body" :class="{scroll}">
        <div class="ui-landscape-content">
          <slot></slot>
        </div>
        <ui-icon
          class="ui-landscape-close"
          :class="{dark: !hasMask || fullScreen}"
          @click="close"
          :name="fullScreen ? 'clear' : 'close'"
        />
      </div>
    </ui-popup>
  </div>
</template>

<script>
import {watch, ref} from 'vue'
import Popup from '../popup'
import Icon from '../icon'

export default {
  name: 'ui-landscape',
  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    scroll: {
      type: Boolean,
      default: false,
    },
    fullScreen: {
      type: Boolean,
      default: false,
    },
    hasMask: {
      type: Boolean,
      default: true,
    },
    maskClosable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    let isLandscapeShow = ref(props.value)
    const close = () => {
      isLandscapeShow.value = false
    }
    watch(
      () => props.value,
      val => {
        isLandscapeShow.value = val
      },
    )
    return {
      isLandscapeShow,
      close,
    }
  },
}

</script>

<style lang="stylus">
.ui-landscape
  &.is-full
    .ui-popup-box
      position absolute
      absolute-pos()
    .ui-landscape-body
      width 100%
      height 100%
      background landscape-fullscreen-bg
    .ui-landscape-content
      width 100%
      height 100%
      overflow auto
      -webkit-overflow-scrolling touch
    .ui-icon.ui-landscape-close
      position absolute
      right 25px
      top 25px
      margin auto

  .ui-popup, .ui-popup-box
    z-index landscape-zindex

  .ui-icon.ui-landscape-close
    position relative
    display block
    margin 50px auto 20px auto
    font-size 50px
    width 50px
    height 50px
    line-height 50px
    text-align center
    color color-text-base-inverse
    &.dark
      color color-text-base
      opacity 0.5

.ui-landscape-content
  width landscape-width
  font-size font-body-large
  overflow auto
  -webkit-overflow-scrolling touch
  box-sizing border-box
  img
    max-width 100%
    height auto
</style>
