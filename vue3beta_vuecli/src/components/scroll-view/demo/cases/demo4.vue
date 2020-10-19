<template>
  <div class="ui-example-child ui-example-child-scroll-view ui-example-child-scroll-view-4">
    <ui-scroll-view
      ref="scrollView"
      :scrolling-x="false"
      @scroll="onScroll"
    >
      <div
        v-for="i in category"
        :key="i"
        class="scroll-view-category"
      >
        <p class="scroll-view-category-title">{{ i }}</p>
        <div
          v-for="j in list"
          :key="j"
          class="scroll-view-list"
        >
          <p class="scroll-view-item">{{`${i} - ${j}`}}</p>
        </div>
      </div>
    </ui-scroll-view>
    <p v-if="activeBlockIndex > 0" class="scroll-view-striky-title">{{ activeBlockIndex }}</p>
  </div>
</template>

<script>
import {reactive, toRefs, computed, getCurrentInstance, set, onMounted} from 'vue'
import {ScrollView} from '@csii/vx-mobile'

export default {
  name: 'scroll-view-demo-3',
  /* DELETE */
  title: '粘性标题',
  titleEnUS: 'Stricky Title',
  message: '请在移动设备中扫码预览',
  messageEnUS: 'Please scan QR code and preview on mobile device',
  /* DELETE */
  components: {
    [ScrollView.name]: ScrollView,
  },
  setup() {
    const state = reactive({
      category: 5,
      list: 5,
      dimensions: [],
      scrollY: 0,
    })
    const that = getCurrentInstance()
    const activeBlockIndex = computed(() => {
      let activeIndex = -1
      state.dimensions.forEach((dimension, index) => {
        if (state.scrollY >= dimension[0] && state.scrollY <= dimension[1]) {
          activeIndex = index + 1
        }
      })
      return activeIndex
    })
    const initScrollBlock = () => {
      const blocks = that.$el.querySelectorAll('.scroll-view-category')
      let offset = 0
      Array.prototype.slice.call(blocks).forEach((block, index) => {
        const innerHeight = block.clientHeight
        set(state.dimensions, index, [offset, offset + innerHeight])
        offset += innerHeight
      })
    }
    const onScroll = ({scrollTop}) => {
      state.scrollY = scrollTop
    }
    onMounted(() => {
      initScrollBlock()
    })
    return {
      ...toRefs(state),
      activeBlockIndex,
      initScrollBlock,
      onScroll,
    }
  },
}

</script>

<style lang="stylus">
.ui-example-child-scroll-view-4
  position relative
  height 800px
  background #FFF
  .scroll-view-striky-title
    position absolute
    top 0
    left 0
    right 0
  .scroll-view-category-title, .scroll-view-striky-title
    padding 10px 0
    text-align center
    font-size 32px
    font-family DINAlternate-Bold
    background-color #f0f0f0
  .scroll-view-item
    padding 30px 0
    text-align center
    font-size 32px
    border-bottom .5px solid #efefef
</style>