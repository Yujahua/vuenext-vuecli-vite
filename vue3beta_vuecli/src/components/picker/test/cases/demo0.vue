<template>
  <div class="ui-example-child ui-example-child-picker ui-example-child-picker-0">
    <ui-picker
      ref="picker"
      :data="pickerData"
      :invalid-index="[[2, 3, 4]]"
      is-view
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
      pickerData: simple,
    }
  },
}
</script>
