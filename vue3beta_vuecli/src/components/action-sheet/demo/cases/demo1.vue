<template>
  <div class="ui-example-child ui-example-child-action-sheet">
    <ui-button @click="showActionSheet">唤起动作面板</ui-button>
  </div>
</template>

<script>import {ActionSheet, Button, Dialog} from '@csii/vx-mobile'

export default {
  name: 'action-sheet-demo',
  /* DELETE */
  title: '单例模式',
  titleEnUS: 'Singleton',
  height: 500,
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
  setup() {
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
    const showActionSheet = () => {
      ActionSheet.create({
        value: true,
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
        onCancel: cancel,
        onSelected: selected,
      })
    }

    return {
      showActionSheet,
      selected,
      cancel,
    }
  },
}
</script>
