<template>
  <div class="ui-example-child ui-example-child-toast ui-example-child-toast-3">
  </div>
</template>

<script>import {Toast} from '@csii/vx-mobile'

export default {
  name: 'toast-demo',
  mounted() {
    Toast.loading('载入中')
    setTimeout(() => {
      Toast.hide()
      setTimeout(() => {
        Toast.failed('载入失败')
      }, 10)
    }, 500)
  },
}
</script>
