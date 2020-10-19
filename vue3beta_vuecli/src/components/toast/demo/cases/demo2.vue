<template>
  <div class="ui-example-child ui-example-child-toast ui-example-child-toast-2">
    <ui-button @click="showSucceedToast">失败</ui-button>
  </div>
</template>

<script>import {Toast, Button} from '@csii/vx-mobile'

export default {
  name: 'toast-demo',
  /* DELETE */
  title: '失败',
  titleEnUS: 'Failure',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
  setup() {
    const showSucceedToast = () => {
      Toast.failed('操作失败')
    }
    return {
      showSucceedToast,
    }
  },
}
</script>
