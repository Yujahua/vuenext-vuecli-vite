<template>
  <div class="ui-example-child ui-example-child-picker ui-example-child-picker-0">
    <ui-picker
      ref="picker"
      :data="pickerData"
      :invalid-index="[[2, 3, 4]]"
      @initialed="onPickerInitialed"
      @change="onPickerConfirm"
      is-view
    ></ui-picker>
  </div>
</template>

<script>
import {ref, reactive, onMounted} from 'vue'
import {Picker, Dialog} from '@csii/vx-mobile'
import simple from '@csii/vx-mobile/components/picker/demo/data/simple'

export default {
  name: 'picker-demo',
  /* DELETE */
  title:
    '单列数据 <a href="javascript:window.PickerTrigger0()">getColumnValues</a><a href="javascript:window.PickerTrigger1()">getColumnIndexs</a><a href="javascript:window.PickerTrigger2()">setColumnValues</a>',
  titleEnUS:
    'Single column <a href="javascript:window.PickerTrigger0()">getColumnValues</a><a href="javascript:window.PickerTrigger1()">getColumnIndexs</a><a href="javascript:window.PickerTrigger2()">setColumnValues</a>',
  describe: '禁用2-4项',
  describeEnUS: 'Disable 2-4 items',
  /* DELETE */
  components: {
    [Picker.name]: Picker,
  },
  setup(props, {refs}) {
    const pickerData = reactive(simple)
    const pickerDataNew = reactive([
      {
        text: 'Hello World',
        value: 9999,
      },
    ])
    const pickerValue = ref('')
    const onPickerInitialed = () => {
      const value = refs.picker.getColumnValues()
      console.log(`[CSII VX Mobile] Picker Initialed: ${JSON.stringify(value)}`)
    }
    const onPickerConfirm = (columnIndex, itemIndex, value) => {
      if (value) {
        pickerValue.value = value.text
      }
    }
    const getColumnValues = picker => {
      const value = refs[picker].getColumnValues()
      Dialog.alert({
        content: `<pre>${JSON.stringify(value)}</pre>`,
      })
    }
    const getColumnIndexs = picker => {
      const value = refs[picker].getColumnIndexs()
      Dialog.alert({
        content: `<pre>${JSON.stringify(value)}</pre>`,
      })
    }
    const setColumnValues = picker => {
      refs[picker].setColumnValues(0, pickerDataNew, vm => {
        vm.refresh(null, 0)
      })
    }
    onMounted(() => {
      window.PickerTrigger0 = () => {
        getColumnValues('picker')
      }
      window.PickerTrigger1 = () => {
        getColumnIndexs('picker')
      }
      window.PickerTrigger2 = () => {
        setColumnValues('picker')
      }
    })
    return {
      pickerData,
      pickerDataNew,
      pickerValue,
      onPickerInitialed,
      onPickerConfirm,
      getColumnValues,
      getColumnIndexs,
      setColumnValues,
    }
  },
}

</script>
