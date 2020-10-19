<template>
  <div class="ui-example-child ui-example-child-selector ui-example-child-selector-3">
    <ui-selector-gidc
      v-model="selected"
      :data="data[0]"
      title="Check模式"
      min-height="320px"
      okText="确认"
      cancelText="取消"
      large-radius
      @confirm="onSelectorConfirm"
      is-check
    ></ui-selector-gidc>
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue'
import {SelectorGidc, Field, FieldItem} from '@csii/vx-mobile'

export default {
  name: 'selector-gidc-demo',
  /* DELETE */
  title: 'Check模式',
  titleEnUS: 'Check mode',
  height: 550,
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
          },
          {
            value: '2',
            text: '选项二',
          },
          {
            value: '3',
            text: '选项三',
            disabled: true,
          },
          {
            value: '4',
            text: '选项四',
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
