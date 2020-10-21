<template>
  <div class="ui-example-child ui-example-child-button ui-example-child-button-1">
    <ui-button type="default" plain>Default & Plain</ui-button>
    <ui-button type="primary" plain>Primary & Plain</ui-button>
    <ui-button type="warning" plain>Warning & Plain</ui-button>
    <ui-button type="disabled" plain>Disabled & Plain</ui-button>
    <ui-button type="primary" plain round>Primary & Plain & Round</ui-button>
    <ui-button type="primary" plain round loading>Primary & Plain & Loading</ui-button>
  </div>
</template>

<script>
import {Button} from '@csii/vx-mobile'

export default {
  name: 'button-demo',
  /* DELETE */
  title: '线性按钮',
  titleEnUS: 'Plain buttons',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
}

</script>

