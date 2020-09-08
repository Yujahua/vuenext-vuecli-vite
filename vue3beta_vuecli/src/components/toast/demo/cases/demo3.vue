<template>
  <div class="ui-example-child ui-example-child-toast ui-example-child-toast-3">
    <ui-button @click="showLoadingToast">载入</ui-button>
  </div>
</template>

<script>import {Toast, Button} from '@csii/vx-mobile'

export default {
  name: 'toast-demo',
  /* DELETE */
  title: '载入',
  titleEnUS: 'Loading',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
  setup() {
    const showLoadingToast = () => {
      Toast.loading('加载中...')
      setTimeout(() => {
        Toast.hide()
      }, 3000)
    }
    return {
      showLoadingToast,
    }
  },
}
</script>
