<template>
  <div class="ui-example-child ui-example-child-slider">
    <ui-slider v-model="quantity" :format="format"></ui-slider>
	</div>
</template>

<script>
import {Slider} from '@csii/vx-mobile'
import {ref} from 'vue'

export default {
  name: 'slider-demo',
  /* DELETE */
  title: '格式化',
  titleEnUS: 'Format',
  /* DELETE */
  components: {
    [Slider.name]: Slider,
  },
  setup() {
    const quantity = ref(50)
    const format = val => '￥' + val
    return {
      quantity,
      format,
    }
  },
}

</script>
