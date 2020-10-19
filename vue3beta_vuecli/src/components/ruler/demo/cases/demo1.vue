<template>
  <div class="ui-example-child ui-example-child-single-component">
    <p>当前值：{{ value }}</p>
    <div class="container">
      <ui-ruler
        :scope="scope"
        :step="100"
        :unit="10"
        :max="1800"
        :min="1200"
        v-model="value"
      ></ui-ruler>
    </div>
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue'
import {Ruler} from '@csii/vx-mobile'

export default {
  name: 'ruler-demo-1',
  /* DELETE */
  title: '最大1800，最小1200',
  titleEnUS: 'Max 1800, Min 1200',
  message: '请在移动设备中扫码预览',
  messageEnUS: 'Please scan QR code and preview on mobile device',
  /* DELETE */
  components: {
    [Ruler.name]: Ruler,
  },
  setup() {
    const state = reactive({
      value: 1305,
      scope: [1000, 2000],
    })
    return {
      ...toRefs(state),
    }
  },
}

</script>

<style lang="stylus" scoped>
  .ui-example-child-single-component
    .container
      margin 0 auto
      width 640px
</style>
