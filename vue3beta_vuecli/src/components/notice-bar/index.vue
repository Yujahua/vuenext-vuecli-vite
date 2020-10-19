<template>
  <div
    class="ui-notice-bar"
    :class="[
      round && 'ui-notice-bar-round',
      type
    ]"
    v-if="isShow"
  >
    <div class="ui-notice-bar-left" :class="[(!customLeft && !icon) && 'ui-notice-bar-empty']">
      <!-- custom first -->
      <template v-if="customLeft">
        <slot name="left"></slot>
      </template>
      <template v-else-if="icon">
        <ui-icon class="ui-notice-icon" :name="icon" :svg="iconSvg"></ui-icon>
      </template>
    </div>
    <div
      class="ui-notice-bar-content"
      :class="[
        multiRows && 'ui-notice-bar-multi-content'
      ]"
      ref="wrap"
    >
      <div :class="[(overflow && scrollable) && 'ui-notice-bar-content-animate']" ref="content">
        <slot></slot>
      </div>
    </div>
    <div class="ui-notice-bar-right">
      <!-- custom first -->
      <template v-if="customRight">
        <slot name="right"></slot>
      </template>
      <template v-else-if="mode || closable">
        <ui-icon
          class="ui-notice-icon ui-notice-icon-right"
          :name="rightIcon"
          @click.native.stop="close"
        ></ui-icon>
      </template>
    </div>
  </div>
</template>

<script>
import {ref, computed, onUpdated, onMounted} from 'vue'
import Icon from '../icon'
export default {
  name: 'ui-notice-bar',

  components: {
    [Icon.name]: Icon,
  },

  props: {
    mode: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'default', // default/activity/warning
    },
    time: {
      type: Number,
      default: 0,
    },
    round: {
      type: Boolean,
      default: false,
    },
    multiRows: {
      type: Boolean,
      default: false,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    // will be delete in future
    icon: {
      type: String,
      default: '',
    },
    iconSvg: {
      type: Boolean,
      default: false,
    },
    // will be delete in future
    closable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {slots, refs, emit}) {
    const isShow = ref(true)
    const overflow = ref(false)
    const customLeft = computed(() => !!slots.left)
    const customRight = computed(() => !!slots.right)
    const rightIcon = computed(() => (props.mode === 'link' ? 'arrow-right' : 'close'))
    const checkOverflow = () => {
      if (!props.scrollable) {
        return
      }
      const {wrap, content} = refs

      /* istanbul ignore if */
      if (!wrap || !content) {
        return
      }
      overflow.value = content.scrollWidth > wrap.clientWidth
    }
    const hide = time => {
      setTimeout(() => {
        isShow.value = false
      }, time)
    }
    onUpdated(() => {
      checkOverflow()
    })
    onMounted(() => {
      if (props.time) {
        hide(props.time)
      }
      checkOverflow()
    })
    const close = () => {
      if (props.mode === 'closable' || props.closable) {
        isShow.value = false
      }
      emit('close')
    }
    return {
      isShow,
      overflow,
      customLeft,
      customRight,
      rightIcon,
      checkOverflow,
      hide,
      close,
    }
  },
}

</script>

<style lang="stylus">
.ui-notice-bar
  display flex
  z-index notice-bar-zindex
  font-size notice-bar-font-size
  min-height 64px
  background-color notice-bar-fill
  color notice-bar-color
  position relative
  padding-left 32px
  box-sizing border-box
  &.ui-notice-bar-round
    border-radius notice-bar-border-radius
  &.activity
    background-color notice-bar-fill-activity
    color notice-bar-color-activity
  &.warning
    background-color notice-bar-fill-warning
    color notice-bar-color-warning

.ui-notice-bar-left,
.ui-notice-bar-right
  display flex
  align-items center

.ui-notice-bar-left
  padding-right 12px
.ui-notice-bar-right
  padding-right 32px
.ui-notice-bar-empty
  padding-right 0

.ui-notice-bar-content
  flex 1
  margin auto
  width auto
  line-height 64px
  white-space nowrap
  overflow hidden
  &.ui-notice-bar-multi-content
    padding h-gap-md 0
    line-height font-caption-large
    white-space normal
  .ui-notice-bar-content-animate
    padding-left 100%
    display inline-block
    animation ui-notice-bar-animation linear 16s infinite both

@keyframes ui-notice-bar-animation {
  0% {
    transform translate3d(0, 0, 0)
  }
  100% {
    transform translate3d(-100%, 0, 0)
  }
}
</style>
