<template>
  <div class="ui-example-child ui-example-child-picker ui-example-child-picker-2">
    <ui-field>
      <ui-field-item
        title="起保年份"
        arrow="arrow-right"
        :addon="pickerValue0"
        @click="isPickerShow0 = true">
      </ui-field-item>
      <ui-field-item
        title="省市区/县"
        arrow="arrow-right"
        :addon="pickerValue1"
        @click="isPickerShow1 = true">
      </ui-field-item>
    </ui-field>
    <ui-picker
      ref="picker0"
      v-model="isPickerShow0"
      :data="pickerData0"
      large-radius
      @confirm="onPickerConfirm(0)"
      title="选择年份"
    ></ui-picker>
    <ui-picker
      ref="picker1"
      v-model="isPickerShow1"
      :data="pickerData1"
      :cols="3"
      is-cascade
      large-radius
      title="选择省市区/县"
      @confirm="onPickerConfirm(1)"
    ></ui-picker>
  </div>
</template>

<script>
import {getCurrentInstance, reactive, toRefs} from 'vue'
import {Picker, Field, FieldItem} from '@csii/vx-mobile'
import simple from '@csii/vx-mobile/components/picker/demo/data/simple'
import district from '@csii/vx-mobile/components/picker/demo/data/district'

export default {
  name: 'picker-demo',
  /* DELETE */
  title: '弹出展示',
  titleEnUS: 'Display in Popup',
  height: 500,
  /* DELETE */
  components: {
    [Picker.name]: Picker,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
  },
  setup(props, {refs}) {
    const state = reactive({
      isPickerShow0: false,
      isPickerShow1: false,
      pickerData0: simple,
      pickerData1: district,
      pickerValue0: '',
      pickerValue1: '',
    })
    const that = getCurrentInstance()
    const onPickerConfirm = index => {
      const values = refs[`picker${index}`].getColumnValues()
      let res = ''
      values.forEach(value => {
        value && (res += `${value.text || value.label} `)
      })
      that[`pickerValue${index}`] = res
    }
    return {
      ...toRefs(state),
      onPickerConfirm,
    }
  },
}

</script>
