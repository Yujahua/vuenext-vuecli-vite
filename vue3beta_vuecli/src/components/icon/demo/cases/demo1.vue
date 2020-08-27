<template>
  <div class="ui-example-child ui-example-child-icon ui-example-child-icon-1">
    <div class="ui-example-item-s">
      <ui-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></ui-icon>
      <p>spinner</p>
    </div>
    <div class="ui-example-item-s">
      <ui-icon name="success-color" size="lg" svg></ui-icon>
      <p>success-color</p>
    </div>
    <div class="ui-example-item-s">
      <ui-icon name="warn-color" size="lg" svg></ui-icon>
      <p>warn-color</p>
    </div>
  </div>
</template>

<script>
// import {Icon} from '@csii/vx-mobile'
import {Icon} from '../../../index'

export default {
  name: 'icon-demo',
  /* DELETE */
  title: 'svg图标',
  titleEnUS: 'Svg Icon',
  align: 'center',
  background: '#fff',
  /* DELETE */
  components: {
    [Icon.name]: Icon,
  },
}

</script>
