<template>
  <div class="ui-example-child ui-example-child-toast ui-example-child-toast-1">
    <ui-button @click="showSucceedToast">成功</ui-button>
  </div>
</template>

<script>import {Toast, Button} from '@csii/vx-mobile'

export default {
  name: 'toast-demo',
  /* DELETE */
  title: '成功',
  titleEnUS: 'Success',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
  setup() {
    const showSucceedToast = () => {
      Toast.succeed('操作成功')
    }
    return {
      showSucceedToast,
    }
  },
}
</script>
