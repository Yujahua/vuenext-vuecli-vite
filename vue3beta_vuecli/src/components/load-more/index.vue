<template>
  <div class='ui-load-more' ref='wrapper'>
    <div class='wrapper'>
      <slot
        name='refresh'
        :refresh-active='refreshActive'
        :refreshing='isPullingDown'></slot>
      <div class='container' ref='container'>
        <slot/>
      </div>
      <slot
        name='more'
        :load-active='loadActive'
        :loading='isPullingUp'
        :no-more='!hasMore' />
    </div>
  </div>
</template>
<script>
import {reactive, onUnmounted, onMounted, toRefs} from 'vue'
import BScroll from './better-scroll'
export default {
  name: 'ui-load-more',
  props: {
    scrollTop: {
      type: Number,
      default: 65,
    },
  },
  setup(props, {emit, refs}) {
    let state = reactive({
      scroller: null,
      beforePullDown: true,
      refreshActive: false,
      isRebounding: false,
      beforePullUp: true,
      loadActive: false,
      isLoad: false,
      isPullingDown: false,
      isPullingUp: false,
      bubbleY: 0,
      pullDownInitTop: -50,
      pullUpInitTop: 50,
      hasMore: true,
    })
    const initRefresh = () => {
      state.scroller.on('pullingDown', () => {
        state.beforePullDown = false
        state.isPullingDown = true
        emit('on-refresh')
      })
      state.scroller.on('scroll', pos => {
        if (state.beforePullDown) {
          if (pos.y + state.pullDownInitTop > 50) {
            state.refreshActive = true
          } else {
            state.refreshActive = false
          }
        }
      })
    }
    // 初始化上拉加载
    const initLoadMore = () => {
      state.scroller.on('pullingUp', () => {
        if (!state.hasMore) {
          return
        }
        state.beforePullUp = true
      })
      state.scroller.on('touchEnd', () => {
        if (state.hasMore && state.isLoad) {
          state.isPullingUp = true
          emit('on-load')
        }
        state.isLoad = false
      })
      state.scroller.on('scroll', pos => {
        if (state.beforePullUp) {
          let top = state.scroller.maxScrollY - state.pullUpInitTop
          if (pos.y < top) {
            state.loadActive = true
            state.isLoad = true
          } else {
            state.loadActive = false
          }
        }
      })
    }
    const initScroll = () => {
      if (!refs.wrapper) {
        return
      }
      if (refs.container) {
        refs.container.style.minHeight = `${refs.wrapper.getBoundingClientRect().height + 1}px`
      }
      let options = {
        probeType: 3,
        click: false,
        scrollbar: false, // 是否显示滚动条
        pullDownRefresh: {
          threshold: props.scrollTop,
          stop: props.scrollTop,
        }, // 下拉刷新
        pullUpLoad: true, // 上拉加载
      }
      state.scroller = new BScroll(refs.wrapper, options)
      initRefresh()
      initLoadMore()
    }
    // 刷新scroller
    const refresh = () => {
      state.isPullingDown = false
      state.isPullingUp = false
      setTimeout(() => {
        if (state.scroller) {
          state.scroller.refresh()
        }
      }, 50)
    }
    // 刷新完成
    const finishRefresh = () => {
      if (state.scroller) {
        state.scroller.finishPullDown()
      }
      state.beforePullDown = true
      state.hasMore = true
      refresh()
    }
    // 加载完成
    const finishLoad = () => {
      if (state.scroller) {
        state.scroller.finishPullUp()
      }
      state.beforePullUp = true
      refresh()
    }
    // 没有更多数据
    const noMoreData = () => {
      state.hasMore = false
      finishLoad()
    }

    onMounted(() => {
      setTimeout(() => {
        initScroll()
      }, 20)
    })
    onUnmounted(() => {
      if (state.scroller) {
        state.scroller.destroy()
      }
    })
    return {
      ...toRefs(state),
      initRefresh,
      initLoadMore,
      initScroll,
      refresh,
      finishRefresh,
      finishLoad,
      noMoreData,
    }
  },
}

</script>
<style lang='stylus'>
.ui-load-more
  overflow hidden
  .wrapper
    position relative
    .ui-refresh
      position absolute
      transform translateY(-100%)
</style>
