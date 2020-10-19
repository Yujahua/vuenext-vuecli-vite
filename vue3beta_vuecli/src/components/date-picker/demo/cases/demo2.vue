<template>
  <div class="ui-example-child ui-example-child-date-picker ui-example-child-date-picker-2">
    <ui-date-picker
      ref="datePicker"
      type="datetime"
      :default-date="currentDate"
      is-view
      keep-index
    ></ui-date-picker>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue'
import {DatePicker, Dialog} from '@csii/vx-mobile'

export default {
  name: 'date-picker-demo',
  /* DELETE */
  title: '日期时间选择 <a href="javascript:window.triggerDatePicker0()">getFormatDate()</a>',
  titleEnUS: 'Date & Time selection <a href="javascript:window.triggerDatePicker0()">getFormatDate()</a>',
  /* DELETE */
  components: {
    [DatePicker.name]: DatePicker,
  },
  setup(props, {refs}) {
    const currentDate = ref(new Date())
    onMounted(() => {
      window.triggerDatePicker0 = () => {
        Dialog.alert({
          content: refs.datePicker.getFormatDate(),
        })
      }
    })
    return {
      currentDate,
    }
  },
}

</script>
