<template>
  <div class="ui-example-child ui-example-child-icon ui-example-child-icon-2">
    <div class="ui-example-item-s">
      <ui-icon name="location" size="xs"></ui-icon>
      <p>xs</p>
    </div>
    <div class="ui-example-item-s">
      <ui-icon name="location" size="sm"></ui-icon>
      <p>sm</p>
    </div>
    <div class="ui-example-item-s">
      <ui-icon name="location" size="md"></ui-icon>
      <p>md</p>
    </div>
    <div class="ui-example-item-s">
      <ui-icon name="location" size="lg"></ui-icon>
      <p>lg</p>
    </div>
  </div>
</template>

<script>import {Icon} from '@csii/vx-mobile'

export default {
  name: 'icon-demo',
  /* DELETE */
  title: '大小',
  titleEnUS: 'Icon size',
  background: '#fff',
  /* DELETE */
  components: {
    [Icon.name]: Icon,
  },
}
</script>
