<template>
  <div class="ui-example-child ui-example-child-switch ui-example-child-switch-2">
    <ui-switch
      v-model="isActive"
      disabled
      @change="handler('switch2', isActive, $event)"
    ></ui-switch>
  </div>
</template>

<script>
import {ref} from 'vue'
import {Switch} from '@csii/vx-mobile'

export default {
  name: 'switch-demo',
  /* DELETE */
  title: '开启不可用状态',
  titleEnUS: 'Open and disabled',
  /* DELETE */
  components: {
    [Switch.name]: Switch,
  },
  setup() {
    const handler = (name, active) => {
      return console.log(`Status of switch ${name} is ${active ? 'active' : 'inactive'}`)
    }

    return {
      isActive: ref(true),
      handler,
    }
  },
}

</script>