<template>
  <div class="ui-example-child ui-example-child-slider">
    <ui-slider v-model="bucket" :step="10"></ui-slider>
	</div>
</template>

<script>
import {Slider} from '@csii/vx-mobile'
import {ref} from 'vue'

export default {
  name: 'slider-demo',
  /* DELETE */
  title: '步长',
  titleEnUS: 'Steps',
  /* DELETE */
  components: {
    [Slider.name]: Slider,
  },
  setup() {
    const bucket = ref(10)
    return {
      bucket,
    }
  },
}

</script>
