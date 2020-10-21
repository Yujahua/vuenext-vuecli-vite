<template>
  <div
    class="ui-selector"
    :class="{
      'is-normal': !isCheck,
      'is-check': isCheck
    }"
  >
    <ui-popup
      class="inner-popup"
      v-model="isSelectorShow"
      position="bottom"
      :mask-closable="maskClosable"
      @show="onSelectorShow"
      @hide="onSelectorHide"
      @maskClick="onSelectorCancel"
    >
      <ui-popup-title-bar
        v-show="!hideTitleBar || isNeedConfirm"
        :title="title"
        :describe="describe"
        :ok-text="okText"
        :cancel-text="cancelText"
        :large-radius="largeRadius"
        :only-close="!isCheck && !isNeedConfirm && !cancelText"
        @confirm="onSelectorConfirm"
        @cancel="onSelectorCancel"
      ></ui-popup-title-bar>
      <div class="ui-selector-container">
        <ui-scroll-view
          ref="scroll"
          :scrolling-x="false"
          :style="{
            maxHeight: `${maxHeight}`,
            minHeight: `${minHeight}`
          }"
        >
          <slot name="header"></slot>
          <!-- audio-list with single select -->
          <template v-if="!multi">
            <ui-radio-list
              class="ui-selector-list"
              ref="radio"
              :key="radioKey"
              :value="defaultValue"
              :options="data"
              :is-slot-scope="hasSlot"
              :icon="icon"
              :icon-disabled="iconDisabled"
              :icon-inverse="iconInverse"
              :icon-position="iconPosition"
              :icon-size="iconSize"
              :icon-svg="iconSvg"
              @change="onSelectorChoose"
            >
              <template v-slot="{ option, index, selected }">
                <slot :option="option" :index="index" :selected="selected"></slot>
              </template>
            </ui-radio-list>
          </template>
          <!-- check-list with multi select -->
          <template v-else>
            <ui-check-list
              class="ui-selector-list"
              ref="check"
              :key="checkKey"
              v-model="multiDefaultValue"
              :options="data"
              :is-slot-scope="hasSlot"
              :icon="icon"
              :icon-disabled="iconDisabled"
              :icon-inverse="iconInverse"
              :icon-position="iconPosition"
              :icon-size="iconSize"
              :icon-svg="iconSvg"
            >
              <template v-slot="{ option, index, selected }">
                <slot :option="option" :index="index" :selected="selected"></slot>
              </template>
            </ui-check-list>
          </template>
          <slot name="footer"></slot>
        </ui-scroll-view>
      </div>
    </ui-popup>
  </div>
</template>

<script>
import {reactive, toRefs, computed, watch} from 'vue'
import Icon from '../icon'
import Popup from '../popup'
import PopupTitlebar from '../popup/title-bar'
import popupMixin from '../popup/mixins'
import popupTitleBarMixin from '../popup/mixins/title-bar'
import RadioList from '../radio-list'
import radioMixin from '../radio/mixins'
import ScrollView from '../scroll-view'
import CheckList from '../check-list'

export default {
  name: 'ui-selector',

  mixins: [popupMixin, popupTitleBarMixin, radioMixin],

  components: {
    [Icon.name]: Icon,
    [RadioList.name]: RadioList,
    [CheckList.name]: CheckList,
    [Popup.name]: Popup,
    [PopupTitlebar.name]: PopupTitlebar,
    [ScrollView.name]: ScrollView,
  },

  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
    defaultValue: {
      default: '',
    },
    isCheck: {
      type: Boolean,
      default: false,
    },
    maxHeight: {
      type: [Number, String],
      default: 'auto',
    },
    minHeight: {
      type: [Number, String],
      default: 'auto',
    },
    cancelText: {
      default() {
        return this.okText ? '取消' : ''
      },
    },
    iconPosition: {
      default: 'right',
    },
    multi: {
      type: Boolean,
      default: false,
    },
    hideTitleBar: {
      type: Boolean,
      default: false,
    },

    // Mixin Props
    // value: {
    //   type: Boolean,
    //   default: false,
    // },
    // title: {
    //   type: String,
    //   default: '',
    // },
    // describe: {
    //   type: String,
    //   default: '',
    // },
    // okText: {
    //   type: String,
    //   default: '',
    // },
    // maskClosable: {
    //   type: Boolean,
    //   default: true,
    // },
    // icon: {
    //   type: String,
    //   default: 'checked',
    // },
    // iconInverse: {
    //   type: String,
    //   default: 'check',
    // },
    // iconDisabled: {
    //   type: String,
    //   default: 'check-disabled',
    // },
    // iconSvg: {
    //   type: Boolean,
    //   default: false,
    // },
    // iconSize: {
    //   type: String,
    //   default: 'md',
    // },
    // iconPosition: {
    //   type: String,
    //   default: 'left',
    // },
  },
  setup(props, {slots, emit, refs}) {
    const state = reactive({
      isSelectorShow: props.value,
      radioKey: Date.now(),
      checkKey: Date.now() + 1,
      activeIndex: -1,
      tmpActiveIndex: -1,
      multiDefaultValue: [],
    })
    const isNeedConfirm = computed(() => props.okText !== '')
    const hasSlot = computed(() => !!slots.default)
    watch(
      () => props.value,
      val => {
        state.isSelectorShow = val
      },
    )
    watch(
      () => state.isSelectorShow,
      val => {
        emit('input', val)
      },
    )
    watch(
      () => props.defaultValue,
      val => {
        if (!props.multi || val === '') {
          return
        }
        state.multiDefaultValue = !Array.isArray(val) ? [val] : val
      },
      {immediate: true},
    )
    const setScroller = () => {
      refs.scroll.reflowScroller()
    }
    const onSelectorConfirm = () => {
      if (props.multi) {
        emit('confirm', state.multiDefaultValue.slice())
        state.isSelectorShow = false
        return
      }

      if (state.tmpActiveIndex > -1) {
        state.activeIndex = state.tmpActiveIndex
        state.isSelectorShow = false
        emit('confirm', props.data[state.activeIndex])
      }
    }
    const onSelectorCancel = () => {
      state.isSelectorShow = false
      state.tmpActiveIndex = state.activeIndex

      if (state.tmpActiveIndex !== -1) {
        refs.radio.selectByIndex(state.tmpActiveIndex)
      } else {
        // reset radio
        state.radioKey = Date.now()
        state.checkKey = Date.now() + 1
      }

      emit('cancel')
    }
    const onSelectorChoose = (item, index) => {
      state.tmpActiveIndex = index
      if (!isNeedConfirm.value) {
        state.activeIndex = index
        state.isSelectorShow = false
      }

      emit('choose', item)
    }
    const onSelectorShow = () => {
      /* istanbul ignore next  */
      setScroller()
      emit('show')
    }
    const onSelectorHide = () => {
      /* istanbul ignore next  */
      emit('hide')
    }
    return {
      ...toRefs(state),
      isNeedConfirm,
      hasSlot,
      setScroller,
      onSelectorConfirm,
      onSelectorCancel,
      onSelectorChoose,
      onSelectorShow,
      onSelectorHide,
    }
  },
}

</script>

<style lang="stylus">
.ui-selector
  .ui-popup
    z-index selector-zindex
  // .ui-popup-title-bar .ui-popup-cancel
  //   .ui-icon
  //     align-self flex-start
  .ui-radio-item
    padding-left h-gap-sl
    padding-right h-gap-sl
    transition background-color .3s
    .ui-cell-item-body.multilines .ui-cell-item-title
      font-weight font-weight-normal
    &.is-selected
      .ui-cell-item-title
        color color-primary
    &:active
      background-color color-bg-tap
  &.is-check
    .ui-radio-item.is-selected
      .ui-cell-item-title
        color inherit
  .ui-check-item
    padding-left h-gap-sl
    padding-right h-gap-sl


.ui-selector-container
  padding-bottom constant(safe-area-inset-bottom)
  overflow hidden

.ui-selector
  &.is-normal
    .ui-radio-item
      text-align center
      .ui-cell-item-left,
      .ui-cell-item-right
        display none
</style>
