<template>
  <div class="ui-example-child ui-example-child-toast ui-example-child-toast-1">
    <ui-button @click="showToast">长文字</ui-button>
  </div>
</template>

<script>import {Toast, Button} from '@csii/vx-mobile'

export default {
  name: 'toast-demo',
  /* DELETE */
  title: '长文字',
  titleEnUS: 'Long text',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
  setup() {
    const showToast = () => {
      Toast.succeed('所有文案部分字数最多展示15个字')
    }
    return {
      showToast,
    }
  },
}
</script>
