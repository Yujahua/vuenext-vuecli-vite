<template>
  <div
    class="ui-picker"
    :class="{'with-popup': !isView}"
  >
    <template v-if="isView">
      <ui-picker-column
        ref="pickerColumn"
        :data="data"
        :default-value="defaultValue"
        :default-index="defaultIndex"
        :invalid-index="invalidIndex"
        :line-height="lineHeight"
        :keep-index="keepIndex"
        :cols="cols"
        @initialed="$emit('initialed')"
        @change="onPickerChange"
      ></ui-picker-column>
    </template>
    <template v-else>
      <ui-popup
        ref="popup"
        class="inner-popup"
        v-model="isPickerShow"
        position="bottom"
        :mask-closable="maskClosable"
        @beforeShow="onPickerBeforeShow"
        @show="onPickerShow"
        @hide="onPickerHide"
        @maskClick="onPickerCancel"
        prevent-scroll
      >
        <ui-popup-title-bar
          :title="title"
          :describe="describe"
          :ok-text="okText"
          :cancel-text="cancelText"
          :large-radius="largeRadius"
          @confirm="onPickerConfirm"
          @cancel="onPickerCancel"
        ></ui-popup-title-bar>
        <ui-picker-column
          ref="pickerColumn"
          :data="data"
          :default-value="getDefaultValue()"
          :default-index="getDefaultIndex()"
          :invalid-index="invalidIndex"
          :line-height="lineHeight"
          :keep-index="keepIndex"
          :cols="cols"
          @initialed="onPickerInitialed"
          @change="onPickerChange"
        ></ui-picker-column>
      </ui-popup>
    </template>
  </div>
</template>

<script>
import {ref, computed, watch, getCurrentInstance, nextTick, onMounted} from 'vue'
import Popup from '../popup'
import PopTitleBar from '../popup/title-bar'
import PickerColumn from './picker-column'
import pickerMixin from './mixins'
import cascadePicker from './cascade'
import {compareObjects, extend} from '../_util'

export default {
  name: 'ui-picker',

  mixins: [pickerMixin],

  components: {
    [Popup.name]: Popup,
    [PopTitleBar.name]: PopTitleBar,
    [PickerColumn.name]: PickerColumn,
  },

  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
    cols: {
      type: Number,
      default: 1,
    },
    defaultValue: {
      type: Array,
      default() {
        return []
      },
    },
    defaultIndex: {
      type: Array,
      default() {
        // if (this.cols < 1) {
        //   return []
        // }
        // const arr = new Array(this.cols)
        // for (let i = 0, len = arr.length; i < len; i++) {
        //   arr[i] = 0
        // }
        // return arr
        return []
      },
    },
    invalidIndex: {
      type: Array,
      default() {
        return []
      },
    },
    isCascade: {
      type: Boolean,
      default: false,
    },

    // Mixin Props
    // value: {
    //   type: Boolean,
    //   default: false,
    // },
    // isView: {
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
    //   default: '确认',
    // },
    // cancelText: {
    //   type: String,
    //   default: '取消',
    // },
    // maskClosable: {
    //   type: Boolean,
    //   default: true,
    // },
    // lineHeight: {
    //   type: Boolean,
    // },
    // keepIndex: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  setup(props, {refs, emit}) {
    const isPickerShow = ref(false)
    const isPickerFirstPopup = ref(true)
    const oldActivedIndexs = ref(null)
    const column = computed(() => refs['pickerColumn'])
    const isScrollInitialed = computed(() => column.value.isScrollInitialed)
    const that = getCurrentInstance()
    const initPicker = () => {
      if (!props.isView && props.value) {
        isPickerShow.value = props.value
      }

      column.value.inheritPickerApi(that, ['refresh'])

      if (isPickerFirstPopup.value) {
        isPickerFirstPopup.value = false
      } else {
        // mark initial activedIndexs as snapshoot
        setTimeout(() => {
          oldActivedIndexs.value = extend([], column.value.activedIndexs)
        }, 100)
      }
    }
    const getDefaultIndex = () => {
      return oldActivedIndexs.value || props.defaultIndex
    }
    const getDefaultValue = () => {
      return oldActivedIndexs.value ? [] : props.defaultValue
    }
    const initPickerColumn = () => {
      /* istanbul ignore if */
      if (!props.isCascade) {
        return
      }

      const defaultIndex = getDefaultIndex()
      const defaultValue = getDefaultValue()
      // const defaultIndexOfFirstColumn = defaultIndex[0] || 0
      nextTick(() => {
        cascadePicker(column.value, {
          currentLevel: -1,
          maxLevel: props.cols,
          values: props.data || [],
          defaultIndex,
          defaultValue,
        })
      })
    }
    watch(
      () => props.value,
      val => {
        isPickerShow.value = val
        if (val) {
          initPicker()
        }
      },
    )
    watch(isPickerShow, val => {
      if (!val) {
        emit('input', val)
      }
    })
    watch(
      () => props.data,
      (val, oldVal) => {
        if (!compareObjects(val, oldVal)) {
          initPickerColumn()
        }
      },
      {deep: true, immediate: true},
    )
    watch(
      () => props.defaultIndex,
      (val, oldVal) => {
        if (!compareObjects(val, oldVal)) {
          initPickerColumn()
        }
      },
      {deep: true},
    )
    onMounted(() => {
      initPicker()
      if (props.isView) {
        nextTick(() => {
          column.value.refresh()
        })
      }
    })
    const resetPickerColumn = () => {
      initPickerColumn()
    }
    const onPickerConfirm = () => {
      const columnVal = column.value
      const columnValues = columnVal.getColumnValues()
      let isScrolling = false
      columnVal.scrollers.forEach(scroller => {
        /* istanbul ignore next */
        if (
          scroller._isAnimating !== false ||
          scroller._isDecelerating !== false ||
          scroller._isDragging !== false ||
          scroller._isGesturing !== false
        ) {
          isScrolling = true
          return false
        }
      })

      if (!isScrolling) {
        isPickerShow.value = false
        emit('confirm', columnValues)
      }
    }
    const onPickerInitialed = () => {
      emit('initialed')
    }
    const onPickerCancel = () => {
      isPickerShow.value = false
      emit('cancel')

      // reset picker by snapshot
      nextTick(() => {
        resetPickerColumn()
        column.value.refresh()
      })
    }
    const onPickerChange = (columnIndex, itemIndex, values) => {
      /* istanbul ignore next */
      if (props.isCascade) {
        cascadePicker(
          column.value,
          {
            currentLevel: columnIndex,
            maxLevel: props.cols,
            values,
          },
          () => {
            // reinitiate columns after the changing column
            column.value.refresh(null, columnIndex + 1)
          },
        )
      }
      /* istanbul ignore next */
      emit('change', columnIndex, itemIndex, values)
    }
    const onPickerBeforeShow = () => {
      /* istanbul ignore next */
      if (!isScrollInitialed.value) {
        nextTick(() => {
          column.value.refresh()
        })
      }
    }
    const onPickerHide = () => {
      emit('hide')
    }
    const onPickerShow = () => {
      emit('show')
    }
    const refresh = function() {
      column.value.isScrollInitialed = false
      /**
       * Manual call 'column.refresh' only when picker is in-view or popup is show,
       * otherwise 'column.refresh' will be called at popup's 'onBerforeShow' automatically
      */
      if (props.isView || isPickerShow.value) {
        column.value.refresh.apply(column.value, arguments)
      }
    }
    return {
      isPickerShow,
      isPickerFirstPopup,
      oldActivedIndexs,
      column,
      isScrollInitialed,
      initPicker,
      initPickerColumn,
      getDefaultIndex,
      getDefaultValue,
      resetPickerColumn,
      onPickerConfirm,
      onPickerInitialed,
      onPickerCancel,
      onPickerChange,
      onPickerBeforeShow,
      onPickerHide,
      onPickerShow,
      refresh,
    }
  },
}

</script>

<style lang="stylus">
.ui-picker
  width 100%
  .ui-popup
    z-index picker-zindex
</style>
