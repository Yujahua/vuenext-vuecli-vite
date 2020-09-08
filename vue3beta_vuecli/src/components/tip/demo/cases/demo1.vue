<template>
  <div class="ui-example-child ui-example-child-tip ui-example-child-tip-1">
    <ui-tip content="不错哟" placement="bottom">
      <ui-button type="default">点击我</ui-button>
    </ui-tip>
  </div>
</template>

<script>import {Tip, Button} from '@csii/vx-mobile'

export default {
  name: 'tips-demo',
  /* DELETE */
  title: '下方',
  titleEnUS: 'Bottom',
  /* DELETE */
  components: {
    [Tip.name]: Tip,
    [Button.name]: Button,
  },
}
</script>
