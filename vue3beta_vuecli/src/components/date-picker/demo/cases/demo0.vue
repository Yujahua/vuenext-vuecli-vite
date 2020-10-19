<template>
  <div class="ui-example-child ui-example-child-date-picker ui-example-child-date-picker-0">
    <ui-date-picker
      ref="datePicker"
      today-text="今天"
      :min-date="minDate"
      :max-date="maxDate"
      :default-date="currentDate"
      is-view
      @initialed="onDatePickerInitialed"
    ></ui-date-picker>
  </div>
</template>

<script>
import {ref} from 'vue'
import {DatePicker} from '@csii/vx-mobile'

export default {
  name: 'date-picker-demo',
  /* DELETE */
  title: '日期选择',
  titleEnUS: 'Date selection',
  describe: '2013/9/9 - 2022/9/9',
  /* DELETE */
  components: {
    [DatePicker.name]: DatePicker,
  },
  setup(props, {refs}) {
    const minDate = ref(new Date('2013/9/9'))
    const maxDate = ref(new Date('2022/9/9'))
    const currentDate = ref(new Date())
    const onDatePickerInitialed = () => {
      console.log(`[CSII VX Mobile] DatePicker getFormatDate: ${refs.datePicker.getFormatDate('yyyy/MM/dd')}`)
    }
    return {
      minDate,
      maxDate,
      currentDate,
      onDatePickerInitialed,
    }
  },
}

</script>
