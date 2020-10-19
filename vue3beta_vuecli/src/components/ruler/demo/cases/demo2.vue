<template>
  <div class="ui-example-child ui-example-child-single-component">
    <p>当前值：{{ value }}</p>
    <div class="container">
      <ui-ruler
        :scope="scope"
        :step="100"
        :unit="10"
        :max="2000"
        :min="1000"
        v-model="value"
      ></ui-ruler>
    </div>
  </div>
</template>

<script>
import {reactive, toRefs, onMounted} from 'vue'
import {Ruler} from '@csii/vx-mobile'

export default {
  name: 'ruler-demo',
  /* DELETE */
  title: '触发 <a href="javascript:window.triggerRuler2()">Change to 1500</a>',
  titleEnUS: 'trigger <a href="javascript:window.triggerRuler2()">Change to 1500</a>',
  describe: '只在滚动停止时有效',
  describeEnUS: 'only valid when scroll is stopped',
  message: '请在移动设备中扫码预览',
  messageEnUS: 'Please scan QR code and preview on mobile device',
  /* DELETE */
  components: {
    [Ruler.name]: Ruler,
  },
  setup() {
    const state = reactive({
      value: 1300,
      scope: [1000, 2000],
    })
    onMounted(() => {
      window.triggerRuler2 = () => {
        state.value = 1500
      }
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
