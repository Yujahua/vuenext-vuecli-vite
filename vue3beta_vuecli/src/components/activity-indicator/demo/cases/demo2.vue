<template>
  <div class="ui-example-child ui-example-child-ui-activity-indicator ui-example-child-ui-activity-indicator-2">
    <ui-activity-indicator
      type="carousel"
      :size="15"
    ></ui-activity-indicator>
    <ui-button type="primary" @click="createPay">
      <ui-activity-indicator
        v-if="loading"
        class="ui-activity-indicator-css"
        type="carousel"
        :size="15"
        color="#fff"
        text-color="#fff"
      ></ui-activity-indicator>
      <span v-else>确认支付</span>
    </ui-button>
	</div>
</template>

<script>
import {ref} from 'vue'
// import {ActivityIndicator} from '@csii/vx-mobile'
import {ActivityIndicator, Button} from '../../../index'

export default {
  name: 'activity-indicator-demo',
  /* DELETE */
  title: 'Carousel',
  /* DELETE */
  components: {
    [ActivityIndicator.name]: ActivityIndicator,
    [Button.name]: Button,
  },
  setup() {
    const loading = ref(false)
    const createPay = () => {
      if (loading.value) {
        return false
      }
      loading.value = true
      setTimeout(() => (loading.value = false), 2000)
    }

    return {
      loading,
      createPay,
    }
  },
}

</script>

<style lang="stylus">
.ui-example-child-ui-activity-indicator-2
  display flex
  flex-direction column
  align-items center
  .ui-activity-indicator
    margin-bottom 30px
  .ui-button
    width 100%
    .ui-activity-indicator-css
      margin-bottom 0
      .ui-activity-indicator-svg
        height 15px !important
</style>