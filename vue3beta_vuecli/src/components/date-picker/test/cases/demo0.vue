<template>
  <div class="ui-example-child ui-example-child-date-picker ui-example-child-date-picker-0">
    <ui-date-picker
      ref="datePicker"
      :min-date="minDate"
      :max-date="maxDate"
      :default-date="currentDate"
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
      minDate: new Date('2013/9/9'),
      maxDate: new Date('2020/9/9'),
      currentDate: new Date('2018/2/5'),
    }
  },
}
</script>
