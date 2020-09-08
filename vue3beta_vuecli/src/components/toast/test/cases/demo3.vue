<template>
  <div class="ui-example-child ui-example-child-toast ui-example-child-toast-3">
  </div>
</template>

<script>import {Toast} from '@csii/vx-mobile'

export default {
  name: 'toast-demo',
  mounted() {
    Toast.loading('加载中...')
  },
}
</script>
