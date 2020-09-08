<template>
  <div class="ui-example-child ui-example-child-tip ui-example-child-tip-0">
    <ui-tip content="不错哟" placement="top">
      <ui-button type="default">点击我</ui-button>
    </ui-tip>
  </div>
</template>

<script>import {Tip, Button} from '@csii/vx-mobile'

export default {
  name: 'tips-demo',
  /* DELETE */
  title: '上方',
  titleEnUS: 'Top',
  /* DELETE */
  components: {
    [Tip.name]: Tip,
    [Button.name]: Button,
  },
}
</script>
