<template>
  <div class="ui-example-child ui-example-child-codebox ui-example-child-codebox-3">
    <ui-codebox
      :maxlength="-1"
      v-model="code"
      system
    />
  </div>
</template>

<script>
import {Codebox} from '@csii/vx-mobile'
import {ref} from 'vue'

export default {
  name: 'codebox-demo',
  /* DELETE */
  title: '系统键盘',
  titleEnUS: 'System keyboard',
  /* DELETE */
  components: {
    [Codebox.name]: Codebox,
  },
  setup() {
    return {
      code: ref(''),
    }
  },
}

</script>
