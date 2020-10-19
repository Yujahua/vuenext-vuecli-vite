<template>
  <div class="ui-example-child ui-example-child-codebox ui-example-child-codebox-0">
    <ui-codebox
      v-model="code"
      :maxlength="4"
      autofocus
    />
  </div>
</template>

<script>
import {Codebox} from '@csii/vx-mobile'
import {ref} from 'vue'

export default {
  name: 'codebox-demo',
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
