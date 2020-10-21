<template>
  <div class="ui-example-child  ui-example-child-button ui-example-child-button-3">
    <div class="ui-example-section">
      <ui-button type="primary" icon="edit" inline>Inline Primary</ui-button>
      <ui-button type="primary" inline plain>Inline Plain</ui-button>
    </div>
    <div class="ui-example-section">
      <ui-button type="warning" size="small" inline>Warning</ui-button>
      <ui-button type="disabled" size="small" inline>Disabled</ui-button>
    </div>
  </div>
</template>

<script>
import {Button} from '@csii/vx-mobile'

export default {
  name: 'button-demo',
  /* DELETE */
  title: '行内按钮',
  titleEnUS: 'Inline buttons',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
}

</script>

<style lang="stylus" scoped>
.ui-example-child-button-3
  .ui-example-section
    float left
    width 100%
    margin-bottom 10px
  .ui-button
    float left
</style>
