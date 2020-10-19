<template>
  <div class="ui-example-child ui-example-child-slider">
    <ui-slider v-model="quantity"></ui-slider>
	</div>
</template>

<script>
import {ref} from 'vue'
import {Slider} from '@csii/vx-mobile'

export default {
  name: 'slider-demo',
  /* DELETE */
  title: '基本',
  titleEnUS: 'Basic',
  /* DELETE */
  components: {
    [Slider.name]: Slider,
  },
  setup() {
    const quantity = ref(25)
    return {
      quantity,
    }
  },
}

</script>
