<template>
  <div class="ui-example-child ui-example-child-tab-picker ui-example-child-tab-picker-0">
    <ui-tab-picker
      title="请选择"
      describe="请选择您所在的省份、城市、区县"
      :data="data"
      value
    />
  </div>
</template>

<script>import {TabPicker} from '@csii/vx-mobile'
import data from '@csii/vx-mobile/components/tab-picker/demo/data'

export default {
  name: 'tab-bar-demo',
  components: {
    [TabPicker.name]: TabPicker,
  },
  data() {
    return {
      show: false,
      data: data,
    }
  },
}
</script>
