<template>
  <div class="ui-example-child ui-example-child-scroll-view ui-example-child-scroll-view-3">
    <ui-scroll-view
      ref="scrollView"
      :scrolling-x="false"
      @end-reached="onEndReached"
    >
      <div
        v-for="i in list"
        :key="i"
        class="scroll-view-list"
      >
        <p class="scroll-view-item">{{i}}</p>
      </div>
      <slot name="more">
      <ui-scroll-view-more
        :is-finished="isFinished"
      >
      </ui-scroll-view-more></slot>
    </ui-scroll-view>
  </div>
</template>

<script>
import {ref} from 'vue'
import {ScrollView, ScrollViewMore} from '@csii/vx-mobile'

export default {
  name: 'scroll-view-demo-2',
  /* DELETE */
  title: '加载更多',
  titleEnUS: 'Load More',
  message: '请在移动设备中扫码预览',
  messageEnUS: 'Please scan QR code and preview on mobile device',
  /* DELETE */
  components: {
    [ScrollView.name]: ScrollView,
    [ScrollViewMore.name]: ScrollViewMore,
  },
  setup(props, {refs}) {
    const list = ref(10)
    const isFinished = ref(false)
    const onEndReached = () => {
      if (isFinished.value) {
        return
      }
      // async data
      setTimeout(() => {
        list.value += 5
        if (list.value >= 20) {
          isFinished.value = true
        }
        refs.scrollView.finishLoadMore()
      }, 1000)
    }
    return {
      list,
      isFinished,
      onEndReached,
    }
  },
}

</script>

<style lang="stylus">
.ui-example-child-scroll-view-3
  height 800px
  background #FFF
  .scroll-view-item
    padding 30px 0
    text-align center
    font-size 32px
    font-family DINAlternate-Bold
    border-bottom .5px solid #efefef
</style>