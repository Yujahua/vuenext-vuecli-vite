<template>
  <div class="ui-example-child ui-example-child-codebox ui-example-child-codebox-1">
    <ui-codebox
      :mask="true"
      :maxlength="6"
      v-model="code"
    />
  </div>
</template>

<script>import {Codebox} from '@csii/vx-mobile'

export default {
  name: 'codebox-demo',
  components: {
    [Codebox.name]: Codebox,
  },
  data() {
    return {
      code: '1234',
    }
  },
}
</script>
