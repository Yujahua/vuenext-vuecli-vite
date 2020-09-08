<template>
  <div class="ui-example-child ui-example-child-picker ui-example-child-picker-2">
    <ui-picker
      ref="picker0"
      value
      :data="pickerData0"
      title="选择年份"
    ></ui-picker>
  </div>
</template>

<script>import {Picker} from '@csii/vx-mobile'
import simple from '@csii/vx-mobile/components/picker/demo/data/simple'

export default {
  name: 'picker-demo',
  components: {
    [Picker.name]: Picker,
  },
  data() {
    return {
      pickerData0: simple,
    }
  },
}
</script>
