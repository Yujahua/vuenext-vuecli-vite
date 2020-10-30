<template>
  <div class="ui-dialog">
    <ui-popup
      :value="value"
      :hasMask="hasMask"
      :maskClosable="maskClosable"
      position="center"
      :transition="transition"
      :preventScroll="preventScroll"
      :preventScrollExclude="preventScrollExclude"
      @input="onInput"
      @show="onShow"
      @hide="onHide"
    >
      <div class="ui-dialog-content">
        <slot name="header"></slot>
        <div class="ui-dialog-body">
          <a
            role="button"
            v-if="closable"
            class="ui-dialog-close"
            @click="close"
          >
            <ui-icon name="close" />
          </a>
          <div v-if="icon" class="ui-dialog-icon">
            <ui-icon :name="icon" :svg="iconSvg"/>
          </div>
          <h2 class="ui-dialog-title" v-if="title" v-text="title"></h2>
          <slot>
            <div class="ui-dialog-text" v-html="content"></div>
          </slot>
        </div>
        <footer class="ui-dialog-actions" :class="{ 'is-column': layout === 'column' }">
            <a
              v-for="(btn, index) in btns"
              role="button"
              class="ui-dialog-btn"
              :class="{
                disabled: !!btn.disabled,
                warning: !btn.disabled && !!btn.warning
              }"
              :key="index"
              @click="onClick(btn)"
              @touchmove.prevent
            >
              <ui-activity-indicator-rolling v-if="btn.loading" class="ui-dialog-btn-loading"></ui-activity-indicator-rolling>
              <ui-icon
                v-else-if="btn.icon"
                class="ui-dialog-btn-icon"
                :name="btn.icon"
                :svg="btn.iconSvg"
                size="md"
              ></ui-icon>
              {{ btn.text }}
            </a>
        </footer>
      </div>
    </ui-popup>
  </div>
</template>

<script>
import {onMounted, onBeforeUnmount, getCurrentInstance} from 'vue'
import Popup from '../popup'
import Icon from '../icon'
import ActivityIndicatorRolling from '../activity-indicator/roller'
import {mdDocument} from '../_util'

export default {
  name: 'ui-dialog',

  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [ActivityIndicatorRolling.name]: ActivityIndicatorRolling,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    iconSvg: {
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    content: {
      type: String,
      default: '',
    },
    btns: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
    layout: {
      type: String,
      default: 'row',
    },
    appendTo: {
      default: () => mdDocument.body,
    },
    hasMask: {
      type: Boolean,
      default: true,
    },
    maskClosable: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default: 'ui-fade',
    },
    preventScroll: {
      type: Boolean,
      default: false,
    },
    preventScrollExclude: {
      type: String,
      default: '',
    },
  },
  setup(props, {emit}) {
    const that = getCurrentInstance()
    // MARK: private methods

    // MARK: events handler
    const onInput = val => {
      emit('input', val)
    }
    const onShow = () => {
      emit('show')
    }
    const onHide = () => {
      emit('hide')
    }
    // MARK: public methods
    const close = () => {
      emit('input', false)
    }
    const onClick = btn => {
      if (btn.disabled || btn.loading) {
        return
      }
      if (typeof btn.handler === 'function') {
        btn.handler.call(null, btn)
      } else {
        close()
      }
    }
    onMounted(() => {
      if (props.appendTo) {
        props.appendTo.appendChild(that.$el)
      }
    })
    onBeforeUnmount(() => {
      if (props.appendTo) {
        props.appendTo.removeChild(that.$el)
      }
    })
    return {
      onInput,
      onShow,
      onHide,
      close,
      onClick,
    }
  },
}

</script>

<style lang="stylus">
.ui-dialog
  .ui-popup
    z-index dialog-zindex

.ui-dialog-content
  width dialog-width
  border-radius dialog-radius
  background-color color-bg-inverse
  overflow hidden

.ui-dialog-body
  color dialog-text-color
  font-size dialog-text-font-size
  text-align left
  padding dialog-body-padding

.ui-dialog-icon
  position relative
  display block
  width dialog-icon-size
  height dialog-icon-size
  margin v-gap-md auto 28px
.ui-dialog .ui-dialog-icon .ui-icon
.ui-dialog .ui-dialog-icon .ui-icon.icon-svg
.ui-dialog .ui-dialog-icon .ui-icon.icon-font
  display flex
  align-items center
  justify-content center
  position absolute
  top 0
  left 0
  width dialog-icon-size
  height dialog-icon-size
  fill dialog-icon-fill
  color dialog-icon-fill
  font-size dialog-icon-size
  line-height dialog-icon-size

.ui-dialog-close
  position absolute
  color dialog-close-color
  top 32px
  right 32px
  z-index 15

.ui-dialog-title
  color dialog-title-color
  text-align center
  font-size dialog-title-font-size
  font-weight font-weight-normal
  line-height 1.2
  margin 0 0 28px 0

.ui-dialog-text
  display flex
  justify-content center

.ui-dialog-actions
  position relative
  display flex
  hairline(top, dialog-action-border-color)
  &.is-column
    flex-direction column
    .ui-dialog-btn
      flex 0 0 auto
      remove-hairline(right)
      &:not(:first-child)
        hairline(top, dialog-action-border-color)
      &:last-child
        color color-text-minor
      &:first-child
        color dialog-action-highlight-color

.ui-dialog-btn
  position relative
  flex 1 1 0%
  display flex
  align-items center
  justify-content center
  height dialog-action-height
  font-size dialog-action-font-size
  font-weight dialog-action-font-weight
  color color-text-minor
  text-align center
  hairline(right, dialog-action-border-color)
  transition background-color .3s
  -webkit-user-select none
  -webkit-tap-highlight-color transparent
  &.warning
    color color-text-error !important
    .ui-dialog-btn-loading .ui-activity-indicator-svg .circle circle
      stroke color-text-error !important
  &.disabled
    color color-text-disabled !important
    .ui-dialog-btn-loading .ui-activity-indicator-svg .circle circle
      stroke color-text-disabled !important
  &:last-child
    color dialog-action-highlight-color
    remove-hairline(right)
    .ui-dialog-btn-loading .ui-activity-indicator-svg .circle circle
      stroke dialog-action-highlight-color 
  &:not(.disabled):active
    background-color color-bg-tap
  .ui-dialog-btn-loading .ui-activity-indicator-svg
    width 32px !important
    height 32px !important
    margin-right 10px
    .circle circle
      stroke color-text-minor
  .ui-dialog-btn-icon
    margin-right 10px
</style>
