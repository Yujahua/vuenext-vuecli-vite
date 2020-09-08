<template>
  <div class="ui-example-child ui-example-child-date-picker ui-example-child-date-picker-1">
    <ui-date-picker
      type="time"
      :unit-text="['', '', '', '\'', '\'\'']"
      :minute-step="1"
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
}
</script>