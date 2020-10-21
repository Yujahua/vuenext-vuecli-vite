<template>
  <div class="ui-example-child ui-example-child-scroll-view ui-example-child-scroll-view-2">
    <ui-scroll-view
      ref="scrollView"
      :scrolling-x="false"
      @refreshing="onRefresh"
    >
      <slot name="refresh">
      <ui-scroll-view-refresh
        v-slot="{ scrollTop, isRefreshActive, isRefreshing }"
        :scroll-top="scrollTop"
        :is-refreshing="isRefreshing"
        :is-refresh-active="isRefreshActive"
      ></ui-scroll-view-refresh></slot>
      <div
        v-for="i in list"
        :key="i"
        class="scroll-view-list"
      >
        <p class="scroll-view-item">{{i}}</p>
      </div>
    </ui-scroll-view>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue'
import {ScrollView, ScrollViewRefresh} from '@csii/vx-mobile'

export default {
  name: 'scroll-view-demo-0',
  /* DELETE */
  title: '下拉刷新 <a href="javascript:ScrollViewTrigger1()">触发下拉刷新</a>',
  titleEnUS: 'Pull Refresh <a href="javascript:ScrollViewTrigger1()">Trigger Pull Refresh</a>',
  message: '请在移动设备中扫码预览',
  messageEnUS: 'Please scan QR code and preview on mobile device',
  /* DELETE */
  components: {
    [ScrollView.name]: ScrollView,
    [ScrollViewRefresh.name]: ScrollViewRefresh,
  },
  setup(props, {refs}) {
    const list = ref(5)
    onMounted(() => {
      window.ScrollViewTrigger1 = () => {
        refs.scrollView.triggerRefresh()
      }
    })
    const onRefresh = () => {
      // async data
      setTimeout(() => {
        list.value += 5
        refs.scrollView.finishRefresh()
      }, 2000)
    }
    return {
      list,
      onRefresh,
    }
  },
}

</script>

<style lang="stylus">
.ui-example-child-scroll-view-2
  height 800px
  background #FFF
  .scroll-view-item
    padding 30px 0
    text-align center
    font-size 28px
    font-family DINAlternate-Bold
    border-bottom .5px solid #efefef
</style>