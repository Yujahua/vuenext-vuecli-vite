<template>
  <div class="ui-example-child ui-example-child-icon ui-example-child-icon-3">
    <div class="ui-example-item-s">
      <ui-icon name="security" color="gray"></ui-icon>
      <p>gray</p>
    </div>
    <div class="ui-example-item-s">
      <ui-icon name="security" color="orange"></ui-icon>
      <p>orange</p>
    </div>
    <div class="ui-example-item-s">
      <ui-icon name="security" color="blue"></ui-icon>
      <p>blue</p>
    </div>
    <div class="ui-example-item-s">
      <ui-icon name="security" color="purple"></ui-icon>
      <p>purple</p>
    </div>
  </div>
</template>

<script>import {Icon} from '@csii/vx-mobile'

export default {
  name: 'icon-demo',
  /* DELETE */
  title: '颜色',
  titleEnUS: 'Icon color',
  background: '#fff',
  /* DELETE */
  components: {
    [Icon.name]: Icon,
  },
}
</script>
