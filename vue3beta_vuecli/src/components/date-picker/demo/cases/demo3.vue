<template>
  <div class="ui-example-child ui-example-child-date-picker ui-example-child-date-picker-3">
    <ui-field>
      <ui-field-item
        name="name"
        title="出险时间"
        arrow="arrow-right"
        align="right"
        :content="datePickerValue"
        @click.enter="isDatePickerShow = true">
      </ui-field-item>
    </ui-field>
    <ui-date-picker
      ref="datePicker"
      v-model="isDatePickerShow"
      type="custom"
      title="选择出险时间"
      large-radius
      :text-render="textRender"
      :custom-types="['yyyy', 'MM','dd', 'hh', 'mm']"
      :default-date="currentDate"
      @change="onDatePickerChange"
      @confirm="onDatePickerConfirm"
    ></ui-date-picker>
  </div>
</template>

<script>
import {ref} from 'vue'
import {DatePicker, Field, FieldItem} from '@csii/vx-mobile'

export default {
  name: 'date-picker-demo',
  /* DELETE */
  title: '自定义类型和选项文案值',
  titleEnUS: 'Custom type and option textual values',
  height: 500,
  /* DELETE */
  components: {
    [DatePicker.name]: DatePicker,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
  },
  setup(props, {refs}) {
    const currentDate = ref(new Date())
    const isDatePickerShow = ref(false)
    const datePickerValue = ref('')
    const textRender = function() {
      const args = Array.prototype.slice.call(arguments)
      const typeFormat = args[0] // 类型
      // const column0Value = args[1] // 第1列选中值
      // const column1Value = args[2] // 第2列选中值
      const column2Value = args[3] // 第3列选中值
      if (typeFormat === 'dd') {
        return `*${column2Value}日`
      }
    }
    const onDatePickerChange = (columnIndex, itemIndex, value) => {
      console.log(
        `[CSII VX Mobile] DatePicker Change\ncolumnIndex: ${columnIndex},\nitemIndex:${itemIndex},\nvalue: ${JSON.stringify(
          value,
        )}`,
      )
    }
    const onDatePickerConfirm = columnsValue => {
      console.log(`[CSII VX Mobile] DatePicker Confirm\nvalue: ${JSON.stringify(columnsValue)}`)
      datePickerValue.value = refs.datePicker.getFormatDate('yyyy/MM/dd hh:mm')
    }
    return {
      currentDate,
      datePickerValue,
      isDatePickerShow,
      textRender,
      onDatePickerChange,
      onDatePickerConfirm,
    }
  },
}

</script>