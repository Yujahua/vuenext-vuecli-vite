<template>
  <div class="ui-example-child ui-example-child-swiper ui-example-child-swiper-0">
    <ui-swiper
      @before-change="beforeChange"
      @after-change="afterChange"
      ref="swiper"
      :is-prevent="false"
      :useNative-driver="false"
    >
      <ui-swiper-item :key="$index" v-for="(item, $index) in simples">
        <div
          class="banner-item"
          :style="{'background': `${item.color}`}">{{item.text}}</div>
      </ui-swiper-item>
    </ui-swiper>
  </div>
</template>

<script>
import {onMounted, reactive} from 'vue'
import {Swiper, SwiperItem} from '@csii/vx-mobile'
import simple from '@csii/vx-mobile/components/swiper/demo/data/simple'

export default {
  name: 'swiper-demo',
  /* DELETE */
  title:
    '横向轮播 <a href="javascript:window.triggerSwiper0()">Goto 2</a><a href="javascript:window.triggerSwiper1()">Play</a><a href="javascript:window.triggerSwiper2()">Stop</a>',
  titleEnUS:
    'Horizontal rotation <a href="javascript:window.triggerSwiper0()">Goto 2</a><a href="javascript:window.triggerSwiper1()">Play</a><a href="javascript:window.triggerSwiper2()">Stop</a>',
  describe: '10秒后异步加载更多项，20秒后重置为初始数量',
  describEnUs: 'Async load more items in 10s, and reset to origin items in another 10s',
  message:
    '@before-change: from: <span id="valueSwiper0">0</span>, to: <span id="valueSwiper1">0</span><br/>@after-change: from: <span id="valueSwiper2">0</span>, to: <span id="valueSwiper3">0</span>',
  /* DELETE */
  components: {
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
  },
  setup(props, {refs}) {
    let simples = reactive(simple)
    const setValue = (id, value) => {
      document.querySelector(id) && (document.querySelector(id).innerHTML = value)
    }
    const beforeChange = (from, to) => {
      setValue('#valueSwiper0', from)
      setValue('#valueSwiper1', to)
    }
    const afterChange = (from, to) => {
      setValue('#valueSwiper2', from)
      setValue('#valueSwiper3', to)
    }
    const fn = index => {
      setValue('#valueSwiper4', index)
    }
    const goto = () => {
      refs.swiper.goto(2)
    }
    const play = () => {
      refs.swiper.play()
    }
    const stop = () => {
      refs.swiper.stop()
    }
    onMounted(() => {
      // Simulation of asynchronous
      setTimeout(() => {
        simples = simple.concat(simple)
      }, 10000)
      // Simulation of asynchronous
      setTimeout(() => {
        simples = simple
      }, 24500)
      window.triggerSwiper0 = () => {
        goto()
      }
      window.triggerSwiper1 = () => {
        play()
      }
      window.triggerSwiper2 = () => {
        stop()
      }
    })
    return {
      beforeChange,
      afterChange,
      fn,
      simples,
    }
  },
}

</script>

<style lang="stylus">
.ui-example-child-swiper-0
  height 250px
  .banner-item
    float left
    width 100%
    height 100%
    line-height 250px
    text-align center
    font-size 28px
    color #FFF
    box-align center
    align-items center
    box-pack center
    justify-content center
    text-decoration-line none
</style>
