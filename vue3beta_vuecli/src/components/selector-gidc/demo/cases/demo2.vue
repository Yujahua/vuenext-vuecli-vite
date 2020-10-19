<template>
  <div class="ui-example-child ui-example-child-selector ui-example-child-selector-2">
    <ui-selector-gidc
      v-model="selected"
      :data="data[0]"
      min-height="320px"
      title="确认模式"
      okText="确认"
      large-radius
      @confirm="onSelectorConfirm"
    ></ui-selector-gidc>
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue'
import {SelectorGidc, Field, FieldItem} from '@csii/vx-mobile'

export default {
  name: 'selector-gidc-demo',
  /* DELETE */
  title: '确认模式',
  titleEnUS: 'Confirmed mode',
  height: 500,
  /* DELETE */
  components: {
    [SelectorGidc.name]: SelectorGidc,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
  },
  setup() {
    const state = reactive({
      selected: '',
      data: [
        [
          {
            value: '1',
            text: '选项一',
            brief: '选项一说明',
          },
          {
            value: '2',
            text: '选项二',
            brief: '选项二说明',
          },
          {
            value: '3',
            text: '选项三',
            brief: '选项三说明',
          },
          {
            value: '4',
            text: '选项四',
            brief: '选项四说明',
          },
        ],
      ],
      selectorValue: '',
    })
    const onSelectorConfirm = ({text}) => {
      state.selectorValue = text
    }
    return {
      ...toRefs(state),
      onSelectorConfirm,
    }
  },
}

</script>
