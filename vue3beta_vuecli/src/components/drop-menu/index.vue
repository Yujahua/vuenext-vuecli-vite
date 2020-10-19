<template>
  <div class="ui-drop-menu">
    <div class="ui-drop-menu-bar">
      <template v-for="(item, index) in data">
        <div
          class="bar-item"
          :class="{
            active: index === activeMenuBarIndex,
            selected: checkBarItemSelect(index),
            disabled: item.disabled
          }"
          :key="index"
          @click="onBarItemClick(item, index)"
        >
          <span
            v-text="getBarItemText(item, index)"
          ></span>
        </div>
      </template>
    </div>
    <ui-popup
      v-model="isPopupShow"
      position="top"
      prevent-scroll
      :prevent-scroll-exclude="scroller"
      @show="onListShow"
      @hide="onListHide"
      @before-hide="onListBeforeHide"
    >
      <div class="ui-drop-menu-list">
        <ui-radio-list
          v-model="selectedMenuListValue[activeMenuBarIndex]"
          :options="activeMenuListData"
          :is-slot-scope="hasSlot"
          align-center
          @change="onListItemClick"
        >
          <div slot-scope="{ option }">
            <slot :option="option"></slot>
          </div>
        </ui-radio-list>
      </div>
    </ui-popup>
  </div>
</template>

<script>
import {reactive, toRefs, computed, watch, set, onMounted, getCurrentInstance} from 'vue'
import Popup from '../popup'
import RadioList from '../radio-list'
import {traverse, compareObjects} from '../_util'

export default {
  name: 'ui-drop-menu',

  components: {
    [Popup.name]: Popup,
    [RadioList.name]: RadioList,
  },

  props: {
    data: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
    defaultValue: {
      type: Array,
      default() {
        return []
      },
    },
  },
  setup(props, {slots, emit}) {
    const state = reactive({
      isPopupShow: false,
      selectedMenuListItem: [],
      selectedMenuListValue: [],
      selectedMenuListIndex: [],
      activeMenuBarIndex: -1,
      scroller: '',
    })
    const hasSlot = computed(() => !!slots.default)
    const activeMenuListData = computed(() => {
      if (state.activeMenuBarIndex < 0 || !props.data[state.activeMenuBarIndex]) {
        return []
      }
      return props.data[state.activeMenuBarIndex].options
    })
    const initSelectedBar = () => {
      state.selectedMenuListValue = props.defaultValue
      traverse(props.data, ['options'], (item, level, indexs) => {
        const barItemIndex = indexs[0]
        const defaultValue = props.defaultValue[barItemIndex]
        if (
          defaultValue !== undefined &&
          (item.value === defaultValue || item.text === defaultValue || item.label === defaultValue)
        ) {
          set(state.selectedMenuListItem, barItemIndex, item)
          return 2
        }
      })
    }
    watch(
      () => props.data,
      (val, oldVal) => {
        // Avoid  Literals
        /* istanbul ignore if  */
        if (!compareObjects(val, oldVal)) {
          initSelectedBar()
        }
      },
    )
    watch(
      () => props.defaultValue,
      (val, oldVal) => {
        /* istanbul ignore if  */
        if (!compareObjects(val, oldVal)) {
          initSelectedBar()
        }
      },
    )
    onMounted(() => {
      initSelectedBar()
    })
    const that = getCurrentInstance()
    const checkBarItemSelect = index => {
      return !!(state.selectedMenuListItem[index] !== undefined || props.defaultValue[index])
    }
    const getBarItemText = (item, index) => {
      return state.selectedMenuListItem[index] !== undefined ? state.selectedMenuListItem[index].text : item.text
    }
    const setScroller = () => {
      const boxer = that.$el ? that.$el.querySelector('.ui-popup-box') : null
      /* istanbul ignore else */
      if (boxer && boxer.clientHeight >= that.$el.clientHeight) {
        state.scroller = '.ui-drop-menu-list'
      } else {
        return ''
      }
    }
    const onBarItemClick = (barItem, index) => {
      /* istanbul ignore if  */
      if (!barItem || barItem.disabled) {
        return
      }

      if (!state.isPopupShow) {
        state.isPopupShow = true
        state.activeMenuBarIndex = index
      } else {
        state.isPopupShow = false
      }
    }
    const onListItemClick = listItem => {
      const activeMenuBarIndex = state.activeMenuBarIndex
      const barItem = props.data[activeMenuBarIndex]
      state.isPopupShow = false
      state.selectedMenuListValue[activeMenuBarIndex] = listItem.value
      set(state.selectedMenuListItem, activeMenuBarIndex, listItem)
      emit('change', barItem, listItem)
    }
    const onListShow = () => {
      /* istanbul ignore next  */
      setScroller()
      emit('show')
    }
    const onListHide = () => {
      /* istanbul ignore next  */
      emit('hide')
    }
    const onListBeforeHide = () => {
      /* istanbul ignore next  */
      state.activeMenuBarIndex = -1
    }
    // MARK: public methods
    const getSelectedValues = () => {
      return state.selectedMenuListItem
    }
    const getSelectedValue = index => {
      return state.selectedMenuListItem[index]
    }
    return {
      ...toRefs(state),
      hasSlot,
      activeMenuListData,
      initSelectedBar,
      checkBarItemSelect,
      getBarItemText,
      setScroller,
      onBarItemClick,
      onListItemClick,
      onListShow,
      onListHide,
      onListBeforeHide,
      getSelectedValues,
      getSelectedValue,
    }
  },
}

</script>

<style lang="stylus">
.ui-drop-menu
  position fixed
  z-index drop-menu-zindex
  top 0
  left 0
  right 0
  height drop-menu-height
  padding-bottom constant(safe-area-inset-bottom)
  box-sizing border-box
  color color-text-minor
  font-size drop-menu-font-size
  font-weight drop-menu-font-weight

.ui-drop-menu-bar
  position relative
  z-index drop-menu-zindex
  display flex
  height 100%
  background drop-menu-bar-bg
  hairline(bottom, drop-menu-bar-border-color)
  .bar-item
    display flex
    flex 1
    margin 2% 0
    align-items center
    justify-content center
    span
      position relative
      padding-right 30px
      &:after
        content ""
        position absolute
        right 0
        top 50%
        width 0
        height 0
        margin-top -4px
        border-left solid 8px transparent
        border-right solid 8px transparent
        border-top solid 9px color-border-element
        transition transform .3s ease-in-out-quint
    &.active
      color drop-menu-color
      span:after
        transform rotate(180deg)
        border-top-color drop-menu-color
    &.selected
      color drop-menu-color
    &.disabled
      opacity drop-menu-disabled-opacity

.ui-drop-menu-list
  width 100%
  padding-top drop-menu-height
  background drop-menu-list-bg
  box-sizing border-box
  .ui-radio-item
    font-weight font-weight-normal
    &.is-selected .ui-cell-item-title
      color color-primary
      
</style>
