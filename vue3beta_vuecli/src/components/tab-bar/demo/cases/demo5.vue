<template>
  <div class="ui-example-child ui-example-child-tabs ui-example-child-tab-bar-5">
    <ui-tab-bar
      v-model="current"
      :items="items"
      @change="onChange"
    />
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue'
import {TabBar, Toast} from '@csii/vx-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '监听事件',
  titleEnUS: 'Events',
  /* DELETE */
  components: {
    [TabBar.name]: TabBar,
  },
  setup() {
    let state = reactive({
      current: 1,
      items: [{name: 1, label: '标签1'}, {name: 2, label: '标签2'}, {name: 3, label: '标签3'}],
    })
    const onChange = (item, index, prevIndex) => {
      Toast.info(`index: ${index}, prevIndex: ${prevIndex}, label: ${item.label}`)
    }
    return {
      ...toRefs(state),
      onChange,
    }
  },
}

</script>
