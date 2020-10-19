<template>
  <div class="ui-example-child ui-example-child-action-bar ui-example-child-0">
    <ui-action-bar :actions="data"></ui-action-bar>
  </div>
</template>

<script>
import {ActionBar, Toast} from '@csii/vx-mobile'
import {reactive} from 'vue'

export default {
  name: 'action-bar-demo',
  /* DELETE */
  title: '多按钮',
  titleEnUS: 'Multiple buttons',
  height: 150,
  /* DELETE */
  components: {
    [ActionBar.name]: ActionBar,
  },
  setup() {
    const handleClick = () => {
      Toast.succeed('Click')
    }
    let data = reactive([
      {
        text: '次要按钮',
        onClick: handleClick,
      },
      {
        text: '主要按钮',
        onClick: handleClick,
      },
    ])
    return {
      data,
      handleClick,
    }
  },
}

</script>
