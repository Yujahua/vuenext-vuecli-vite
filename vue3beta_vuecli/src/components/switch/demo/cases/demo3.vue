<template>
  <div class="ui-example-child ui-example-child-switch ui-example-child-switch-3">
    <ui-switch
      v-model="isActive"
      disabled
      @change="handler('switch3', isActive, $event)"
    ></ui-switch>
  </div>
</template>

<script>
import {ref} from 'vue'
import {Switch} from '@csii/vx-mobile'

export default {
  name: 'switch-demo',
  /* DELETE */
  title: '关闭不可用状态',
  titleEnUS: 'Closed and disabled',
  /* DELETE */
  components: {
    [Switch.name]: Switch,
  },
  setup() {
    const handler = (name, active) => {
      return console.log(`Status of switch ${name} is ${active ? 'active' : 'inactive'}`)
    }

    return {
      isActive: ref(false),
      handler,
    }
  },
}

</script>