<template>
  <div class="ui-example-child ui-example-child-picker ui-example-child-picker-1">
    <ui-picker
      ref="picker"
      :data="pickerData"
      :cols="3"
      :default-index="pickerDefaultIndex"
      :key="tmp"
      is-view
      is-cascade
    ></ui-picker>
  </div>
</template>

<script>import {Picker} from '@csii/vx-mobile'
import district from '@csii/vx-mobile/components/picker/demo/data/district'
import {setTimeout} from 'timers'

export default {
  name: 'picker-demo',
  components: {
    [Picker.name]: Picker,
  },
  data() {
    return {
      pickerData: [],
      pickerDefaultIndex: [],
    }
  },
  mounted() {
    this.pickerData = district
    this.pickerDefaultIndex = [3, 2, 1]
    setTimeout(() => {
      this.$refs.picker.refresh()
    }, 0)
  },
}
</script>
