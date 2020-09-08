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

<script>import {Ruler} from '@csii/vx-mobile'

export default {
  name: 'ruler-demo',
  components: {
    [Ruler.name]: Ruler,
  },
  data() {
    return {
      value: 1300,
      scope: [1000, 2000],
    }
  },
  mounted() {
    window.triggerRuler2 = () => {
      this.value = 1500
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
