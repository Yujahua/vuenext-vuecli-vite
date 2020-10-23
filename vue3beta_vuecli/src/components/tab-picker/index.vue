<template>
  <div class="ui-tab-picker">
    <ui-popup
      :value="value"
      position="bottom"
      :mask-closable="maskClosable"
      @input="onPopupInput"
      @show="onPopupShow"
      @hide="onPopupHide"
      @maskClick="onCancel"
    >
      <ui-popup-title-bar
        :title="title"
        :describe="describe"
        :large-radius="largeRadius"
        only-close
        @cancel="onCancel"
      >
        <ui-icon name="close" size="lg" slot="cancel" />
      </ui-popup-title-bar>
      <div class="ui-tab-picker-content">
          <ui-tabs
            v-model="currentTab"
            :key="tabsTmpKey"
            :inkLength="100"
            ref="tabs"
          >
            <ui-scroll-view
              ref="scrollView"
              :scrolling-x="false"
              auto-reflow
            >
              <ui-tab-pane
                v-for="(pane, index) in panes"
                :key="pane.name"
                :name="pane.name"
                :label="pane.label"
            >
                <ui-radio-list
                  :value="pane.value"
                  :options="pane.options"
                  :is-slot-scope="hasSlot"
                  @input="onSelectPaneItem($event, index)"
                  icon=""
                  icon-inverse=""
                  icon-position="right"
                >
                  <template v-slot="{ option }">
                    <slot :option="option"></slot>
                  </template>
                </ui-radio-list>
              </ui-tab-pane>
            </ui-scroll-view>
          </ui-tabs>
      </div>
    </ui-popup>
  </div>
</template>

<script>
import {reactive, toRefs, computed, nextTick} from 'vue'
import Popup from '../popup'
import PopupTitlebar from '../popup/title-bar'
import popupMixin from '../popup/mixins'
import popupTitleBarMixin from '../popup/mixins/title-bar'
import Icon from '../icon'
import Tabs from '../tabs'
import TabPane from '../tab-pane'
import RadioList from '../radio-list'
import ScrollView from '../scroll-view'
import {extend} from '../_util'

export default {
  name: 'ui-tab-picker',

  mixins: [popupMixin, popupTitleBarMixin],

  components: {
    [Popup.name]: Popup,
    [PopupTitlebar.name]: PopupTitlebar,
    [Icon.name]: Icon,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [RadioList.name]: RadioList,
    [ScrollView.name]: ScrollView,
  },

  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    defaultValue: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '请选择',
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
    // maskClosable: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  setup(props, {slots, emit, refs}) {
    const state = reactive({
      selected: [],
      oldSelected: [],
      currentTab: '',
      oldCurrentTab: '',
      tabsTmpKey: Date.now(),
    })
    const panes = computed(() => {
      const panesDate = []
      let target = props.data
      let cursor = 0
      while (target && target.name) {
        const pane = {
          name: target.name,
          label: target.label || props.placeholder,
          value: state.selected[cursor],
          selected: null,
          options: target.options,
        }
        let find = false
        for (let i = 0, len = target.options.length; i < len; i++) {
          if (target.options[i].value === state.selected[cursor]) {
            pane.label = target.options[i].label
            pane.selected = target.options[i]
            target = target.options[i].children
            find = true
            cursor++
            break
          }
        }
        if (!find) {
          target = null
        }
        panesDate.push(pane)
        // state.currentTab = pane.name // select the tab corresponding to this pane
      }
      return panesDate
    })
    const hasSlot = computed(() => !!slots.default)
    // created
    /* istanbul ignore else */
    if (props.defaultValue) {
      state.selected = props.defaultValue
    }

    /* istanbul ignore else */
    if (props.data) {
      state.currentTab = props.data.name
    }
    // MARK: private events
    const onPopupInput = val => {
      emit('input', val)
    }
    const onPopupShow = () => {
      refs.tabs.reflowTabBar()
      emit('show')
      setTimeout(() => {
        state.oldSelected = extend([], state.selected)
        state.oldCurrentTab = state.currentTab
      }, 100)
    }
    const onPopupHide = () => {
      emit('hide')
    }
    const hideTabPicker = () => {
      emit('input', false)
    }
    const onCancel = () => {
      hideTabPicker()
      setTimeout(() => {
        state.selected = extend([], state.oldSelected)
        state.currentTab = state.oldCurrentTab
        state.tabsTmpKey = Date.now()
      }, 100)
    }
    const getSelectedValues = () => {
      return state.selected
    }
    const getSelectedOptions = () => {
      if (panes.value && panes.value.length) {
        return panes.value.filter(pane => pane.value).map(pane => pane.selected)
      } else {
        return []
      }
    }
    const onSelectPaneItem = (value, index) => {
      state.selected.splice(index, state.selected.length - index, value)
      nextTick(() => {
        const nextPane = panes.value[index + 1]
        emit('select', {
          index,
          value,
          option: panes.value[index],
        })

        /* istanbul ignore else */
        if (nextPane) {
          state.currentTab = nextPane.name
          refs.scrollView.scrollTo(0, 0)
        } else if (value !== '') {
          setTimeout(() => {
            emit('change', {
              values: getSelectedValues(),
              options: getSelectedOptions(),
            })
            hideTabPicker()
          }, 300)
        }
      })
    }
    return {
      ...toRefs(state),
      panes,
      hasSlot,
      onPopupInput,
      onPopupShow,
      onPopupHide,
      onCancel,
      hideTabPicker,
      getSelectedValues,
      getSelectedOptions,
      onSelectPaneItem,
    }
  },
}

</script>

<style lang="stylus">
.ui-tab-picker
  .ui-popup
    z-index tab-picker-zindex
  .ui-tab-bar
    position relative
    margin-left tab-picker-h-gap
    margin-right tab-picker-h-gap
    padding-left 0
    padding-right 0
    background-color tab-picker-bg
    hairline(bottom, color-border-base)
  .ui-tabs-content
    height tab-picker-height
    overflow auto
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
  .ui-tab-bar-list
    justify-content flex-start
    .ui-tab-bar-item
      margin 0 60px 0 0
      padding 0
      font-size font-caption-normal
  .ui-tab-pane
    padding-left tab-picker-h-gap
    padding-right tab-picker-h-gap
    box-sizing border-box
  .ui-popup-cancel
    width 90px !important
.ui-tab-picker-content
  background-color tab-picker-bg
  .ui-radio-item.is-selected
    .ui-cell-item-body .ui-cell-item-title
      color radio-color
</style>
