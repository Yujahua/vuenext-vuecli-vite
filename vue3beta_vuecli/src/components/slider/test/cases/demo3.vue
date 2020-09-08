<template>
  <div class="ui-example-child ui-example-child-slider">
    <ui-slider v-model="range" range></ui-slider>
	</div>
</template>

<script>import {Slider} from '@csii/vx-mobile'

export default {
  name: 'slider-demo',
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
