<template>
  <div class="ui-example-child ui-example-child-scroll-view ui-example-child-scroll-view-6">
    <ui-tabs
      @change="onTabChange"
      immediate
    >
      <ui-tab-pane class="content" name="scrollView0" label="Block - 1">
        <ui-scroll-view
          ref="scrollView0"
          :scrolling-x="false"
          manual-init
          @refreshing="onRefresh(0)"
        >
          <slot name="refresh">
            <ui-scroll-view-refresh
            v-slot="{ scrollTop, isRefreshActive, isRefreshing }"
            :scroll-top="scrollTop"
            :is-refreshing="isRefreshing"
            :is-refresh-active="isRefreshActive"
          ></ui-scroll-view-refresh></slot>
          <div
            v-for="i in list0"
            :key="i"
            class="scroll-view-list"
          >
            <p class="scroll-view-item">{{`1 - ${i}`}}</p>
          </div>
        </ui-scroll-view>
      </ui-tab-pane>
      <ui-tab-pane class="content" name="scrollView1" label="Block - 2">
        <ui-scroll-view
          ref="scrollView1"
          :scrolling-x="false"
          manual-init
          @refreshing="onRefresh(1)"
        >
          <slot name="refresh">
            <ui-scroll-view-refresh
            v-slot="{ scrollTop, isRefreshActive, isRefreshing }"
            :scroll-top="scrollTop"
            :is-refreshing="isRefreshing"
            :is-refresh-active="isRefreshActive"
          ></ui-scroll-view-refresh></slot>
          <div
            v-for="i in list1"
            :key="i"
            class="scroll-view-list"
          >
            <p class="scroll-view-item">{{`2 - ${i}`}}</p>
          </div>
        </ui-scroll-view>
      </ui-tab-pane>
    </ui-tabs>
  </div>
</template>

<script>
import {ref, getCurrentInstance} from 'vue'
import {Tabs, TabPane, ScrollView, ScrollViewRefresh} from '@csii/vx-mobile'

export default {
  name: 'scroll-view-demo-6',
  /* DELETE */
  title: '手动初始化',
  titleEnUS: 'Manual initialization',
  message: '请在移动设备中扫码预览',
  messageEnUS: 'Please scan QR code and preview on mobile device',
  /* DELETE */
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [ScrollView.name]: ScrollView,
    [ScrollViewRefresh.name]: ScrollViewRefresh,
  },
  setup(props, {refs}) {
    const list0 = ref(5)
    const list1 = ref(5)
    const isFinished = ref(false)
    const that = getCurrentInstance()
    const onRefresh = index => {
      // async data
      setTimeout(() => {
        that[`list${index}`] += 5
        refs[`scrollView${index}`].finishRefresh()
      }, 2000)
    }
    const onTabChange = tab => {
      console.log(tab.name)
      refs[tab.name].init()
    }
    return {
      list0,
      list1,
      isFinished,
      onRefresh,
      onTabChange,
    }
  },
}

</script>

<style lang="stylus">
.ui-example-child-scroll-view-6
  background #FFF
  .content
    height 800px
  .ui-tab-bar
    box-shadow 0 2px 8px #f0f0f0
  .scroll-view-item
    padding 30px 0
    text-align center
    font-size 32px
    font-family DINAlternate-Bold
    border-bottom .5px solid #efefef
</style>