<template>
  <div
    class="ui-swiper-item" 
    :style="{'width': swiperWidth, 'height': swiperHeight }">
    <slot></slot>
  </div>
</template>

<script>
import {computed, onMounted, getCurrentInstance, onUnmounted} from 'vue'
export default {
  name: 'ui-swiper-item',
  setup(props, {parent}) {
    let swiperWidth = computed(() => (!parent.isVertical ? `${parent.dimension}px` : 'auto'))
    let swiperHeight = computed(() => (parent.isVertical ? `${parent.dimension}px` : 'auto'))
    let that = getCurrentInstance()
    onMounted(() => parent && parent.swiperItemCreated(that))
    onUnmounted(() => parent && parent.swiperItemDestroyed(that))
    return {
      swiperWidth,
      swiperHeight,
    }
  },
}

</script>

<style lang="stylus">
  .ui-swiper-item
    position relative
    width 100%
    flex-shrink 0
</style>
