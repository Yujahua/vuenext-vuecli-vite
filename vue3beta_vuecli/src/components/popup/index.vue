<template>
  <div
    v-show="isPopupShow"
    class="ui-popup"
    :class="[
      hasMask ? 'with-mask' : '',
      largeRadius ? 'large-radius' : '',
      position
    ]"
  >
    <transition name="ui-mask-fade">
      <div
        v-show="hasMask && isPopupBoxShow"
        @click="onPopupMaskClick"
        class="ui-popup-mask"
      ></div>
    </transition>
    <ui-transition
      :name="transition"
      @before-enter="onPopupTransitionStart"
      @before-leave="onPopupTransitionStart"
      @after-enter="onPopupTransitionEnd"
      @after-leave="onPopupTransitionEnd"
    >
      <div
        v-show="isPopupBoxShow"
        class="ui-popup-box"
        :class="[
          transition
        ]"
      >
        <slot></slot>
      </div>
    </ui-transition>
  </div>
</template>

<script>
import {reactive, toRefs, onMounted, getCurrentInstance, watch} from 'vue'

import Transition from '../transition'
import popupMixin from './mixins'

export default {
  name: 'ui-popup',

  mixins: [popupMixin],

  components: {
    'ui-transition': Transition,
  },

  props: {
    position: {
      type: String,
      default: 'center',
    },
    transition: {
      type: String,
      default() {
        switch (this.position) {
          case 'bottom':
            return 'ui-slide-up'
          /* istanbul ignore next */
          case 'top':
            return 'ui-slide-down'
          /* istanbul ignore next */
          case 'left':
            return 'ui-slide-right'
          /* istanbul ignore next */
          case 'right':
            return 'ui-slide-left'
          default:
            return 'ui-fade' // fade/fade-bounce/fade-slide/fade-zoom
        }
      },
    },
    preventScroll: {
      type: Boolean,
      default: false,
    },
    preventScrollExclude: {
      type: [String, Function],
      default() {
        return ''
      },
    },
    // Mixin Props
    // value: {
    //   type: Boolean,
    //   default: false,
    // },
    // hasMask: {
    //   type: Boolean,
    //   default: true,
    // },
    // maskClosable: {
    //   type: Boolean,
    //   default: true,
    // },
  },

  setup(props, context) {
    // props  传入的props   context 类似于vue2.X中的vue实例对象（{attrs,slots,emit,root}）
    const that = getCurrentInstance()
    const state = reactive({
      isPopupShow: false,
      // controle popup box
      isPopupBoxShow: false,
      // transtion lock
      isAnimation: false,
      largeRadius: false,
    })
    // MARK: event handler
    const onPopupTransitionStart = () => {
      if (!state.isPopupBoxShow) {
        context.emit('before-hide')
      } else {
        context.emit('before-show')
      }
    }
    const onPopupTransitionEnd = () => {
      /* istanbul ignore next */
      if (!state.isAnimation) {
        return
      }

      /* istanbul ignore next */
      if (!state.isPopupBoxShow) {
        // popup hide after popup box finish animation
        state.isPopupShow = false
        context.emit('hide')
      } else {
        context.emit('show')
      }

      /* istanbul ignore next */
      state.isAnimation = false
    }
    const stopImmediatePropagation = event => {
      /* istanbul ignore next */
      event.stopImmediatePropagation()
    }
    const preventScrollExcludeFunc = (isBind, preventScrollExclude) => {
      const handler = isBind ? 'addEventListener' : 'removeEventListener'
      preventScrollExclude = preventScrollExclude || props.preventScrollExclude
      const excluder =
        preventScrollExclude && typeof preventScrollExclude === 'string'
          ? that.$el.querySelector(preventScrollExclude)
          : preventScrollExclude
      // 改写 &&写法
      if (excluder) {
        excluder[handler]('touchmove', stopImmediatePropagation, false)
      }
    }
    const preventDefault = event => {
      event.preventDefault()
    }
    const preventScrollFunc = isBind => {
      const handler = isBind ? 'addEventListener' : 'removeEventListener'
      const masker = that.$el.querySelector('.ui-popup-mask')
      const boxer = that.$el.querySelector('.ui-popup-box')
      if (masker) {
        masker[handler]('touchmove', preventDefault, false)
      }
      if (boxer) {
        boxer[handler]('touchmove', preventDefault, false)
      }
      preventScrollExcludeFunc(isBind)
    }
    const showPopupBox = () => {
      state.isPopupShow = true
      state.isAnimation = true
      // popup box enter the animation after popup show
      state.isPopupBoxShow = true
      /* istanbul ignore if */
      if (process.env.NODE_ENV === 'test') {
        onPopupTransitionStart()
        onPopupTransitionEnd()
      }
      if (props.preventScroll) {
        preventScrollFunc(true)
      }
    }
    const hidePopupBox = () => {
      state.isAnimation = true
      state.isPopupBoxShow = false
      if (props.preventScroll) {
        preventScrollFunc(false)
      }
      context.emit('input', false)
      /* istanbul ignore if */
      if (process.env.NODE_ENV === 'test') {
        onPopupTransitionStart()
        onPopupTransitionEnd()
      }
    }
    const onPopupMaskClick = () => {
      if (props.maskClosable) {
        hidePopupBox()
        context.emit('mask-click')
      }
    }
    onMounted(() => {
      if (props.value) {
        showPopupBox()
      }
    })
    watch(
      () => props.value,
      val => {
        if (val) {
          if (state.isAnimation) {
            setTimeout(() => {
              showPopupBox()
            }, 50)
          } else {
            showPopupBox()
          }
        } else {
          hidePopupBox()
        }
      },
    )
    watch(
      () => props.preventScrollExclude,
      (val, oldVal) => {
        // remove old listener before add
        /* istanbul ignore next */
        preventScrollExcludeFunc(false, oldVal)
        /* istanbul ignore next */
        preventScrollExcludeFunc(true, val)
      },
    )
    return {
      ...toRefs(state),
      showPopupBox,
      hidePopupBox,
      preventScrollFunc,
      preventScrollExcludeFunc,
      preventDefault,
      stopImmediatePropagation,
      onPopupTransitionStart,
      onPopupTransitionEnd,
      onPopupMaskClick,
    }
  },
}

</script>

<style lang="stylus">
.ui-popup
  absolute-pos()
  position fixed
  display flex
  pointer-events none
  z-index popup-zindex

  &.center
    align-items center
    justify-content center

  &.top
    flex-direction column
    justify-content flex-start
    .ui-popup-box
      width 100%

  &.bottom
    flex-direction column
    justify-content flex-end
    .ui-popup-box
      width 100%

  &.left
    justify-content flex-start
    .ui-popup-box
      height 100%

  &.right
    justify-content flex-end
    .ui-popup-box
      height 100%

  &.inner-popup .ui-popup-box
    background-color color-bg-inverse
    border-radius popup-title-bar-radius popup-title-bar-radius 0 0
  &.large-radius.inner-popup .ui-popup-box
    border-radius popup-title-bar-radius-large popup-title-bar-radius-large 0 0

.ui-popup-mask
  absolute-pos()
  position absolute
  pointer-events auto
  z-index 1
  background-color popup-mask-bg

.ui-popup-box
  position relative
  pointer-events auto
  z-index 2
  max-width 100%
  max-height 100%
  overflow auto

.ui-mask-fade
  &-enter, &-leave-to
    opacity 0.01
  &-enter-active, &-leave-active
    transition opacity 250ms
</style>
