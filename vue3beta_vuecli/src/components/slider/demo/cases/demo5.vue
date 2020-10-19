<template>
  <div class="ui-example-child ui-example-child-slider">
    <ui-slider v-model="range" :min="15" :max="80" range></ui-slider>
	</div>
</template>

<script>
import {Slider} from '@csii/vx-mobile'
import {reactive} from 'vue'

export default {
  name: 'slider-demo',
  /* DELETE */
  title: '边界值',
  titleEnUS: 'Min & Max',
  /* DELETE */
  components: {
    [Slider.name]: Slider,
  },
  setup() {
    const range = reactive([25, 50])
    return {
      range,
    }
  },
}

</script>
