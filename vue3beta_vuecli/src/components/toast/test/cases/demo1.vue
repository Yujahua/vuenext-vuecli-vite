<template>
  <div class="ui-example-child ui-example-child-toast ui-example-child-toast-1">
  </div>
</template>

<script>import {Toast} from '@csii/vx-mobile'

export default {
  name: 'toast-demo',
  mounted() {
    Toast.succeed('操作成功')
  },
}
</script>
