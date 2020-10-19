<template>
  <div class="ui-example-child ui-example-child-scroll-view ui-example-child-scroll-view-0">
    <ui-scroll-view
      ref="scrollView"
      @scroll="onScroll"
    >
      <div
        v-for="i in list"
        class="scroll-view-item"
        :key="i"
        @click="onItemClick(i)"
      >
        {{i}}
      </div>
    </ui-scroll-view>
  </div>
</template>

<script>
import {ScrollView, Toast} from '@csii/vx-mobile'
import {ref, onMounted} from 'vue'

export default {
  name: 'scroll-view-demo-0',
  /* DELETE */
  title: '基础 <a href="javascript:ScrollViewTrigger0()">添加内容</a>',
  titleEnUS: 'Basic <a href="javascript:ScrollViewTrigger0()">Add Items</a>',
  message: '请在移动设备中扫码预览',
  messageEnUS: 'Please scan QR code and preview on mobile device',
  /* DELETE */
  components: {
    [ScrollView.name]: ScrollView,
  },
  setup(props, {refs}) {
    const list = ref(5)
    const addItems = () => {
      list.value += 5
      // 如果把autoReflow设置为false, 需调用reflowScroller
      refs.scrollView.reflowScroller()
    }
    onMounted(() => {
      window.ScrollViewTrigger0 = () => {
        addItems()
      }
    })
    const onItemClick = i => {
      Toast.info(`Click ${i}`)
    }
    const onScroll = ({scrollLeft, scrollTop}) => {
      console.log(`[CSII VX Mobile ScrollView - demo0 - onScroll] scrollLeft: ${scrollLeft}, scrollTop: ${scrollTop}`)
    }
    return {
      list,
      addItems,
      onItemClick,
      onScroll,
    }
  },
}

</script>

<style lang="stylus">
.ui-example-child-scroll-view-0
  height 400px
  background #FFF
  .scroll-view-item
    padding 30px 0
    text-align center
    font-size 28px
    font-family DINAlternate-Bold
    border-bottom .5px solid #efefef
</style>