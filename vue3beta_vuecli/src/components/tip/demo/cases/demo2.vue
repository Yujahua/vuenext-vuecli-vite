<template>
  <div class="ui-example-child ui-example-child-tip ui-example-child-tip-2">
    <ui-tip content="不错哟" placement="left">
      <ui-button type="default" size="small" inline>点击我</ui-button>
    </ui-tip>
  </div>
</template>

<script>import {Tip, Button} from '@csii/vx-mobile'

export default {
  name: 'tips-demo',
  /* DELETE */
  title: '左侧',
  titleEnUS: 'Left',
  /* DELETE */
  components: {
    [Tip.name]: Tip,
    [Button.name]: Button,
  },
}
</script>