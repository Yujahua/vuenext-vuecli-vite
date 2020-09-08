<template>
  <div class="ui-example-child ui-example-child-toast ui-example-child-toast-3">
    <ui-button @click="start">连续调用</ui-button>
  </div>
</template>

<script>import {Toast, Button} from '@csii/vx-mobile'

export default {
  name: 'toast-demo',
  /* DELETE */
  title: '连续调用',
  titleEnUS: 'Continuous call',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
  setup() {
    const start = () => {
      Toast.loading('载入中')
      setTimeout(() => {
        Toast.hide()
        setTimeout(() => {
          Toast.failed('载入失败')
        }, 10)
      }, 500)
    }
    return {
      start,
    }
  },
}
</script>
