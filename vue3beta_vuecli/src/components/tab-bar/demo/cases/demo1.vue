<template>
  <div class="ui-example-child ui-example-child-tabs ui-example-child-tab-bar-1">
    <ui-tab-bar
      v-model="current"
      :items="items"
      :maxLength="5"
    />
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue'
import {TabBar} from '@csii/vx-mobile'
export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '首屏数量',
  titleEnUS: 'Max length',
  /* DELETE */
  components: {
    [TabBar.name]: TabBar,
  },
  setup() {
    let state = reactive({
      current: 1,
      items: [
        {name: 1, label: '标签1'},
        {name: 2, label: '标签2'},
        {name: 3, label: '标签3'},
        {name: 4, label: '标签4'},
        {name: 5, label: '标签5'},
      ],
    })
    return {
      ...toRefs(state),
    }
  },
}

</script>
