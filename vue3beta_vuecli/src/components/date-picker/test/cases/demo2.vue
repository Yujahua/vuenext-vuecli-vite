<template>
  <div class="ui-example-child ui-example-child-date-picker ui-example-child-date-picker-2">
    <ui-date-picker
      ref="datePicker"
      type="datetime"
      :min-date="currentDate"
      is-view
    ></ui-date-picker>
  </div>
</template>

<script>import {DatePicker} from '@csii/vx-mobile'

export default {
  name: 'date-picker-demo',
  components: {
    [DatePicker.name]: DatePicker,
  },
  data() {
    return {
      currentDate: new Date('2018/10/10'),
      minDate: new Date('2018/8/30 11:30'),
    }
  },
}
</script>
