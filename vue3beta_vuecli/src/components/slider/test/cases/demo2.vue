<template>
  <div class="ui-example-child ui-example-child-slider">
    <ui-slider v-model="quantity" :format="format"></ui-slider>
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
      quantity: 50,
    }
  },
  methods: {
    format(val) {
      return '￥' + val
    },
  },
}
</script>
