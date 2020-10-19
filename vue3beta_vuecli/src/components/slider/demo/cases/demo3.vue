<template>
  <div class="ui-example-child ui-example-child-slider">
    <ui-slider v-model="range" range></ui-slider>
	</div>
</template>

<script>
import {Slider} from '@csii/vx-mobile'
import {reactive} from 'vue'

export default {
  name: 'slider-demo',
  /* DELETE */
  title: '范围',
  titleEnUS: 'Range',
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

