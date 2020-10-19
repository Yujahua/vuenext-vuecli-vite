<template>
  <div class="ui-example-child ui-example-child-tab-picker ui-example-child-tab-picker-0">
    <ui-field title="地址">
      <ui-field-item
        title="联系地址"
        arrow="arrow-right"
        @click="show = !show"
        placeholder="请选择联系地址"
        :content="addressStr"
        solid
      />
    </ui-field>
    <ui-tab-picker
      title="请选择"
      describe="请选择您所在的省份、城市、区县"
      large-radius
      :data="data"
      v-model="show"
      @change="handleChange"
    />
  </div>
</template>

<script>
import {Field, FieldItem, TabPicker} from '@csii/vx-mobile'
import data from '@csii/vx-mobile/components/tab-picker/demo/data'
import {computed, reactive, toRefs} from 'vue'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  height: 550,
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [TabPicker.name]: TabPicker,
  },
  setup() {
    const state = reactive({
      show: false,
      address: [],
      data: data,
    })
    const addressStr = computed(() => state.address.map(item => item.label).join(' '))
    const handleChange = ({options}) => {
      state.address = options
    }
    return {
      ...toRefs(state),
      addressStr,
      handleChange,
    }
  },
}

</script>
