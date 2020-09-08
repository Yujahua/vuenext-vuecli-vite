<template>
  <div class="ui-example-child ui-example-child-toast ui-example-child-toast-0">
    <ui-button @click="showTextToast">自定义位置</ui-button>
  </div>
</template>

<script>import {Toast, Button} from '@csii/vx-mobile'

export default {
  name: 'toast-demo',
  /* DELETE */
  title: '自定义位置',
  titleEnUS: 'Customize location',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
  setup() {
    const showTextToast = () => {
      Toast({
        content: '自定义位置',
        position: 'bottom',
      })
    }
    return {
      showTextToast,
    }
  },
}
</script>
