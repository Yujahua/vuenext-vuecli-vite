<template>
  <div class="ui-example-child ui-example-child-toast ui-example-child-toast-0">
  </div>
</template>

<script>import {Toast} from '@csii/vx-mobile'

export default {
  name: 'toast-demo',
  mounted() {
    Toast({
      content: '自定义位置',
      position: 'bottom',
    })
  },
}
</script>
