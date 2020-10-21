<template>
  <div class="ui-example-child ui-example-child-scroll-view ui-example-child-scroll-view-5">
    <ui-tab-bar
      v-model="activeBlockIndex"
      :items="tabBarItems"
      :max-length="5"
      ref="tabBar"
      @change="onTabChange"
    ></ui-tab-bar>
    <ui-scroll-view
      class="scroll-view-with-tab-bar"
      ref="scrollView"
      :scrolling-x="false"
      @scroll="onScroll"
      @mousedown.enter="onScrollStart"
      @touchstart.enter="onScrollStart"
    >
      <div
        v-for="i in category"
        :key="i"
        class="scroll-view-category"
      >
        <div
          v-for="j in list"
          :key="j"
          class="scroll-view-list"
        >
          <p class="scroll-view-item">{{`${i} - ${j}`}}</p>
        </div>
      </div>
    </ui-scroll-view>
  </div>
</template>

<script>
import {reactive, toRefs, computed, onMounted, getCurrentInstance, set} from 'vue'
import {ScrollView, TabBar} from '@csii/vx-mobile'

const debounce = function(fn, delay) {
  let timer
  return function() {
    const context = this
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(function() {
      fn.apply(context, arguments)
    }, delay)
  }
}
export default {
  name: 'scroll-view-demo-3',
  /* DELETE */
  title: '配合TabBar',
  titleEnUS: 'With TabBar',
  message: '请在移动设备中扫码预览',
  messageEnUS: 'Please scan QR code and preview on mobile device',
  /* DELETE */
  components: {
    [ScrollView.name]: ScrollView,
    [TabBar.name]: TabBar,
  },
  setup(props, {refs}) {
    const state = reactive({
      category: 5,
      list: 5,
      dimensions: [],
      scrollY: 0,
      isManual: false,
      activeBlockIndex: 0,
    })
    const that = getCurrentInstance()
    const tabBarItems = computed(() => {
      return state.dimensions.map((item, index) => {
        return {name: index, label: `Block - ${index + 1}`}
      })
    })
    const initScrollBlock = () => {
      const blocks = that.$el.querySelectorAll('.scroll-view-category')

      let offset = 0
      Array.prototype.slice.call(blocks).forEach((block, index) => {
        const innerHeight = block.clientHeight
        set(state.dimensions, index, [offset, offset + innerHeight])
        offset += innerHeight
      })

      // setTimeout(() => {
      //   this.$refs.tabBar.reflow()
      // }, 1000)
    }
    const onScrollStart = () => {
      state.isManual = false
    }
    const onScroll = ({scrollTop}) => {
      if (!state.isManual) {
        state.dimensions.some((dimension, index) => {
          if (scrollTop >= dimension[0] && scrollTop <= dimension[1]) {
            state.activeBlockIndex = index
            return true
          }
        })
      }
    }
    const onTabChange = (item, index) => {
      state.isManual = true
      debounce(() => {
        const offsetTop = state.dimensions[index][0]
        refs.scrollView.scrollTo(0, offsetTop, true)
        state.scrollY = offsetTop
      }, 100)()
    }
    onMounted(() => {
      initScrollBlock()
    })
    return {
      ...toRefs(state),
      tabBarItems,
      initScrollBlock,
      onScrollStart,
      onScroll,
      onTabChange,
    }
  },
}

</script>

<style lang="stylus">
.ui-example-child-scroll-view-5
  position relative
  height 800px
  background #FFF
  .ui-tab-bar
    position absolute
    left 0
    top 0
    right 0
    z-index 2
    box-shadow 0 2px 8px #f0f0f0
  .scroll-view-with-tab-bar
    & > .scroll-view-container
      padding-top 100px
    .scroll-view-item
      padding 30px 0
      text-align center
      font-size 32px
      border-bottom .5px solid #efefef
</style>