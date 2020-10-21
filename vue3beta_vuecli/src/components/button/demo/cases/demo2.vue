<template>
  <div class="ui-example-child ui-example-child-button ui-example-child-button-2">
    <ui-button type="default" round>Default & Round</ui-button>
    <ui-button type="primary" round>Primary & Round</ui-button>
    <ui-button type="warning" round>Warning & Round</ui-button>
    <ui-button type="disabled" round>Disabled & Round</ui-button>
  </div>
</template>

<script>
import {Button} from '@csii/vx-mobile'

export default {
  name: 'button-demo',
  /* DELETE */
  title: '圆角按钮',
  titleEnUS: 'Round Buttons',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
}

</script>

