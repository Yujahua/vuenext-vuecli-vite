<template>
  <div class="ui-example-child ui-example-child-action-sheet">
    <ui-button @click="showActionSheet">唤起动作面板</ui-button>
    <ui-action-sheet
      v-model="value"
      :title="title"
      :default-index="defaultIndex"
      :invalid-index="invalidIndex"
      :cancel-text="cancelText"
      :options="options"
      @selected="selected"
      @cancel="cancel"
    ></ui-action-sheet>
  </div>
</template>

<script>
import {ActionSheet, Button, Dialog} from '@csii/vx-mobile'
import {reactive, toRefs} from 'vue'

export default {
  name: 'action-sheet-demo',
  height: 500,
  components: {
    [ActionSheet.name]: ActionSheet,
    [Button.name]: Button,
  },
  setup() {
    let state = reactive({
      value: false,
      title: '操作说明的标题',
      options: [
        {
          label: '选项1',
          value: 0,
        },
        {
          label: '选项2',
          value: 1,
        },
        {
          label: '选项3',
          value: 2,
        },
      ],
      defaultIndex: 1,
      invalidIndex: 2,
      cancelText: '取消',
    })
    const showActionSheet = () => {
      state.value = true
    }
    const selected = item => {
      Dialog.alert({
        content: `selected: ${JSON.stringify(item)}`,
      })
    }
    const cancel = () => {
      Dialog.alert({
        content: 'cancel',
      })
    }
    return {
      ...toRefs(state),
      showActionSheet,
      selected,
      cancel,
    }
  },
}

</script>
