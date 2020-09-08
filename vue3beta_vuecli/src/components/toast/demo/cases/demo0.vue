<template>
  <div class="ui-example-child ui-example-child-toast ui-example-child-toast-0">
    <ui-button @click="showTextToast">纯文字</ui-button>
  </div>
</template>

<script>import {Toast, Button} from '@csii/vx-mobile'

export default {
  name: 'toast-demo',
  /* DELETE */
  title: '纯文字',
  titleEnUS: 'Plain text',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
  setup() {
    const showTextToast = () => {
      Toast.info('一段文字')
    }
    return {
      showTextToast,
    }
  },
}
</script>
