<template>
  <div class="ui-example-child ui-example-child-toast ui-example-child-toast-2">
  </div>
</template>

<script>import {Toast} from '@csii/vx-mobile'

export default {
  name: 'toast-demo',
  mounted() {
    Toast.failed('操作失败')
  },
}
</script>
