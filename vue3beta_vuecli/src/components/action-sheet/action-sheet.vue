<template>
  <div class="ui-action-sheet">
    <ui-popup
      class="inner-popup large-radius"
      v-model="isActionSheetShow"
      position="bottom"
      prevent-scroll
      @show="onShow"
      @hide="onHide"
    >
      <div class="ui-action-sheet-content">
        <header class="ui-action-sheet-header" v-if="title">{{ title }}</header>
        <ul class="ui-action-sheet-list">
            <li
              v-for="(item, index) in options"
              :key="index"
              :class="{
                'active': index === clickIndex,
                'disabled': index=== invalidIndex,
                'ui-action-sheet-item': true
              }"
              @click="onSelect(item, index)"
            >
              <div class="ui-action-sheet-item-wrapper">
                <div class="ui-action-sheet-item-section" v-html="item.text || item.label"></div>
              </div>
            </li>
          <li class="ui-action-sheet-cancel" @click="onCancel">{{ cancelText }}</li>
        </ul>
      </div>
    </ui-popup>
  </div>
</template>

<script>
import {reactive, toRefs, watch} from 'vue'

import Popup from '../popup'

import {inArray} from '../_util'

export default {
  name: 'ui-action-sheet',

  components: {
    [Popup.name]: Popup,
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
    options: {
      type: Array,
      default() {
        return []
      },
    },
    defaultIndex: {
      type: Number,
      default: -1,
    },
    invalidIndex: {
      type: Number,
      default: -1,
    },
    cancelText: {
      type: String,
      default: '取消',
    },
  },

  setup(props, {emit}) {
    let state = reactive({
      isActionSheetShow: props.value,
      clickIndex: -1,
      scroller: '',
    })
    state.clickIndex = props.defaultIndex
    watch(
      () => props.value,
      newVal => {
        state.isActionSheetShow = newVal
      },
    )
    // MARK: events handler, 如 onButtonClick
    const onShow = () => {
      emit('show')
    }
    const hideSheet = () => {
      state.isActionSheetShow = false
      emit('input', false)
    }
    const onHide = () => {
      emit('hide')
      hideSheet()
    }
    const onSelect = (item, index) => {
      if (index === state.invalidIndex || inArray(state.invalidIndex, index)) {
        return
      }
      state.clickIndex = index
      emit('selected', item)
      hideSheet()
    }
    const onCancel = () => {
      emit('cancel')
      hideSheet()
    }
    return {
      ...toRefs(state),
      onShow,
      onHide,
      hideSheet,
      onSelect,
      onCancel,
    }
  },
}

</script>

<style lang="stylus">
.ui-action-sheet
  color action-sheet-color
  -webkit-font-smoothing antialiased
  .ui-popup
    z-index action-sheet-zindex
  .ui-popup-box
    background-color color-bg-base

.ui-action-sheet-content
  position relative
  width 100%
  font-size action-sheet-font-size
  background action-sheet-bg
  text-align center
  overflow auto

.ui-action-sheet-header
  position relative
  vertical-height(action-sheet-height)
  hairline(bottom, color-border-base)
  word-ellipsis()
  overflow visible

.ui-action-sheet-item
  position relative
  vertical-height(action-sheet-height)
  padding 0 action-sheet-padding-h
  box-sizing border-box
  font-size action-sheet-font-size
  transition background-color .3s
  -webkit-user-select none
  &.active
    color action-sheet-color-highlight
  &.disabled .ui-action-sheet-item-section
    opacity action-sheet-disabled-opacity
  &:first-of-type
    .ui-action-sheet-item-wrapper:after
      display none
  &:active
    background-color color-bg-tap
    &.disabled
      background-color transparent

.ui-action-sheet-item-wrapper
  position relative
  hairline(top, color-border-base)

.ui-action-sheet-cancel
  height 132px
  line-height 120px
  color action-sheet-color-cancel
  font-weight font-weight-medium
  &::before
    display block
    content ''
    height 12px
    background action-sheet-cancel-gap-bg
</style>
