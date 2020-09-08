<template>
  <div class="ui-example-child ui-example-child-slider">
    <ui-slider v-model="range" :min="15" :max="80" range></ui-slider>
	</div>
</template>

<script>import {Slider} from '@csii/vx-mobile'

export default {
  name: 'slider-demo',
  /* DELETE */
  title: '边界值',
  titleEnUS: 'Min & Max',
  /* DELETE */
  components: {
    [Slider.name]: Slider,
  },
  data() {
    return {
      range: [25, 50],
    }
  },
}
</script>
