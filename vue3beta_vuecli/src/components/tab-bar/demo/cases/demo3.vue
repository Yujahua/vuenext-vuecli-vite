<template>
  <div class="ui-example-child ui-example-child-tabs ui-example-child-tab-bar-3">
    <ui-tab-bar
      v-model="current"
      :items="items"
      :hasInk="false"
    />
  </div>
</template>

<script>
import {TabBar} from '@csii/vx-mobile'
import {reactive, toRefs} from 'vue'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '无下划线',
  titleEnUS: 'No ink',
  /* DELETE */
  components: {
    [TabBar.name]: TabBar,
  },
  setup() {
    let state = reactive({
      current: 1,
      items: [{name: 1, label: '标签1'}, {name: 2, label: '标签2'}, {name: 3, label: '标签3'}],
    })
    return {
      ...toRefs(state),
    }
  },
}

</script>
