<template>
  <div class="ui-example-child ui-example-child-selector ui-example-child-selector-4">
    <ui-selector-gidc
      v-model="selected"
      :data="data[0]"
      :defaultValue="selectorValue"
      title="多选模式"
      min-height="320px"
      okText="确定"
      cancelText="取消"
      large-radius
      @confirm="onSelectorConfirm"
      multi
    ></ui-selector-gidc>
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue'
import {SelectorGidc, Field, FieldItem} from '@csii/vx-mobile'

export default {
  name: 'selector-gidc-demo',
  /* DELETE */
  title: '多选模式',
  titleEnUS: 'Multi mode',
  height: 350,
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
          },
          {
            value: '4',
            text: '选项四',
          },
        ],
      ],
      selectorValue: ['1'],
    })
    const onSelectorConfirm = array => {
      state.selectorValue = array
    }
    return {
      ...toRefs(state),
      onSelectorConfirm,
    }
  },
}

</script>
