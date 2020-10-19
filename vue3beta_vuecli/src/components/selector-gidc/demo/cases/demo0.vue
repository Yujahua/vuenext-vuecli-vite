<template>
  <div class="ui-example-child ui-example-child-selector ui-example-child-selector-0">
      <ui-selector-gidc
        v-model="checked"
        default-value="2"
        :data="data[0]"
        max-height="320px"
        title="普通模式"
        large-radius
        @choose="onSelectorChoose"
      ></ui-selector-gidc>
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue'
import {SelectorGidc, Field, FieldItem} from '@csii/vx-mobile'

export default {
  name: 'selector-gidc-demo',
  /* DELETE */
  title: '无需确认',
  titleEnUS: 'No need to confirm',
  height: 300,
  /* DELETE */
  components: {
    [SelectorGidc.name]: SelectorGidc,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
  },
  setup() {
    const state = reactive({
      checked: '',
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
          {
            value: '5',
            text: '选项五',
          },
          {
            value: '6',
            text: '选项六',
          },
          {
            value: '7',
            text: '选项七',
          },
          {
            value: '8',
            text: '选项八',
          },
          {
            value: '9',
            text: '选项九',
          },
          {
            value: '10',
            text: '选项十',
          },
        ],
      ],
      selectorValue: '选项二',
    })
    const onSelectorChoose = ({text}) => {
      state.selectorValue = text
    }
    return {
      ...toRefs(state),
      onSelectorChoose,
    }
  },
}

</script>
