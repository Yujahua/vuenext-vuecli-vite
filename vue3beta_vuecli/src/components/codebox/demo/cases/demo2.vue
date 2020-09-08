<template>
  <div class="ui-example-child ui-example-child-codebox ui-example-child-codebox-2">
    <ui-codebox
      :maxlength="-1"
      v-model="code"
    />
  </div>
</template>

<script>import {Codebox} from '@csii/vx-mobile'

export default {
  name: 'codebox-demo',
  /* DELETE */
  title: '不限长度',
  titleEnUS: 'Unlimited length',
  /* DELETE */
  components: {
    [Codebox.name]: Codebox,
  },
  data() {
    return {
      code: '',
    }
  },
}
</script>
