<template>
  <div class="ui-example-child ui-example-child-tip ui-example-child-tip-3">
    <ui-tip content="点击拼车更有优惠，拼成还可能获得随机礼包" placement="right">
      <ui-button type="default" size="small" inline>点击我</ui-button>
    </ui-tip>
  </div>
</template>

<script>import {Tip, Button} from '@csii/vx-mobile'

export default {
  name: 'tips-demo',
  /* DELETE */
  title: '右侧',
  titleEnUS: 'Right',
  /* DELETE */
  components: {
    [Tip.name]: Tip,
    [Button.name]: Button,
  },
}
</script>
