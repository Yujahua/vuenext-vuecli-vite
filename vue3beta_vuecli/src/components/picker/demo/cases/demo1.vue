<template>
  <div class="ui-example-child ui-example-child-picker ui-example-child-picker-1">
    <ui-picker
      ref="picker"
      :data="pickerData"
      :cols="3"
      :default-index="pickerDefaultIndex"
      :default-value="pickerDefaultValue"
      is-view
      is-cascade
      @initialed="onPickerInitialed"
      @change="onPickerConfirm"
    ></ui-picker>
  </div>
</template>

<script>
import {reactive, onMounted, toRefs} from 'vue'
import {Picker, Dialog} from '@csii/vx-mobile'
import district from '@csii/vx-mobile/components/picker/demo/data/district'

export default {
  name: 'picker-demo',
  /* DELETE */
  title:
    '联动数据 <a href="javascript:window.PickerTrigger3()">getColumnValue(0)</a><a href="javascript:window.PickerTrigger4()">getColumnIndex(0)</a><a href="javascript:window.PickerTrigger5()">changeDefaultValue</a>',
  titleEnUS:
    'Cascade <a href="javascript:window.PickerTrigger3()">getColumnValue(0)</a><a href="javascript:window.PickerTrigger4()">getColumnIndex(0)</a><a href="javascript:window.PickerTrigger5()">changeDefaultValue</a>',
  describe: '默认选中3, 2, 1项',
  describeEnUS: '"3, 2, 1" item selected by default',
  /* DELETE */
  components: {
    [Picker.name]: Picker,
  },
  setup(props, {refs}) {
    const state = reactive({
      pickerData: [],
      pickerDefaultIndex: [],
      pickerDefaultValue: [],
      pickerValue: '',
    })
    const onPickerInitialed = () => {
      const columnValues = refs.picker.getColumnValues()
      let value = ''
      columnValues.forEach(item => {
        value += `${item.label}-`
      })
      console.log(`[CSII VX Mobile] Picker getColumnValues: ${value.substr(0, value.length - 1)}`)
    }
    const onPickerConfirm = (columnIndex, itemIndex, value) => {
      if (value) {
        state.pickerValue = value.text
      }
    }
    const getColumnValue = (picker, index) => {
      const value = refs.picker.getColumnValue(index)
      delete value.children
      Dialog.alert({
        content: JSON.stringify(value),
      })
    }
    const getColumnIndex = (picker, index) => {
      const value = refs.picker.getColumnIndex(index)
      Dialog.alert({
        content: `<pre>${JSON.stringify(value)}</pre>`,
      })
    }
    onMounted(() => {
      state.pickerData = district
      state.pickerDefaultIndex = [3, 2, 1]

      window.PickerTrigger3 = () => {
        getColumnValue('picker', 0)
      }
      window.PickerTrigger4 = () => {
        getColumnIndex('picker', 0)
      }
      window.PickerTrigger5 = () => {
        state.pickerDefaultIndex = []
        state.pickerDefaultValue = ['110000', '110100', '110101']
        setTimeout(() => {
          refs.picker.refresh()
        }, 0)
      }
    })
    return {
      ...toRefs(state),
      onPickerInitialed,
      onPickerConfirm,
      getColumnValue,
      getColumnIndex,
    }
  },
}

</script>
