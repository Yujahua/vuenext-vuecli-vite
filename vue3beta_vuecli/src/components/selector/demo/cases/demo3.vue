<template>
  <div class="ui-example-child ui-example-child-selector ui-example-child-selector-3">
    <ui-field>
      <ui-field-item
        title="Check模式"
        :content="selectorValue"
        @click="showSelector"
        arrow
      />
    </ui-field>
    <ui-selector
      v-model="isSelectorShow"
      :data="data[0]"
      title="Check模式"
      min-height="320px"
      okText="确认"
      cancelText="取消"
      large-radius
      @confirm="onSelectorConfirm"
      is-check
    ></ui-selector>
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue'
import {Selector, Field, FieldItem} from '@csii/vx-mobile'

export default {
  name: 'selector-demo',
  /* DELETE */
  title: 'Check模式',
  titleEnUS: 'Check mode',
  height: 550,
  /* DELETE */
  components: {
    [Selector.name]: Selector,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
  },
  setup() {
    const state = reactive({
      isSelectorShow: false,
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
    const showSelector = () => {
      state.isSelectorShow = true
    }
    const onSelectorConfirm = ({text}) => {
      state.selectorValue = text
    }
    return {
      ...toRefs(state),
      showSelector,
      onSelectorConfirm,
    }
  },
}

</script>
