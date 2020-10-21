<template>
  <div class="ui-example-child ui-example-child-button ui-example-child-button-0">
    <ui-button type="default">Default</ui-button>
    <ui-button type="default" inactive>Default Inactive</ui-button>
    <ui-button type="primary">Primary</ui-button>
    <ui-button type="primary" inactive>Primary Inactive</ui-button>
    <ui-button type="primary" loading>Loading</ui-button>
    <ui-button type="warning">Warning</ui-button>
    <ui-button type="warning" inactive>Warning Inactive</ui-button>
    <ui-button type="disabled">Disabled</ui-button>
  </div>
</template>

<script>
import {Button} from '@csii/vx-mobile'

export default {
  name: 'button-demo',
  components: {
    [Button.name]: Button,
  },
}

</script>

