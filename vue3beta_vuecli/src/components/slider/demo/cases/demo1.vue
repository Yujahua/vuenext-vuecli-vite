<template>
  <div class="ui-example-child ui-example-child-slider">
    <ui-slider v-model="quantity" disabled></ui-slider>
	</div>
</template>

<script>
import {Slider} from '@csii/vx-mobile'
import {ref} from 'vue'

export default {
  name: 'slider-demo',
  /* DELETE */
  title: '禁用',
  titleEnUS: 'Disabled',
  /* DELETE */
  components: {
    [Slider.name]: Slider,
  },
  setup() {
    const quantity = ref(50)
    return {
      quantity,
    }
  },
}

</script>
