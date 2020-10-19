<template>
  <div class="ui-example-child ui-example-child-swiper ui-example-child-swiper-2">
    <ui-swiper
      @before-change="beforeChange"
      @after-change="afterChange"
      :autoplay="5000"
      transition="fade"
      ref="swiper3">
      <ui-swiper-item :key="$index" v-for="(item, $index) in simples">
        <a href="javascript:void(0)"
          class="banner-item"
          :style="{'background': `${item.color}`}">{{item.text}}</a>
      </ui-swiper-item>
    </ui-swiper>
  </div>
</template>

<script>
import {reactive, onMounted} from 'vue'
import {Swiper, SwiperItem} from '@csii/vx-mobile'
import simple from '@csii/vx-mobile/components/swiper/demo/data/simple'

export default {
  name: 'swiper-demo',
  /* DELETE */
  title: '渐隐轮播 <a href="javascript:window.triggerSwiper3()">Goto 2</a>',
  titleEnUS: 'Fade carousel <a href="javascript:window.triggerSwiper3()">Goto 2</a>',
  message:
    '@before-change: from: <span id="valueSwiper10">0</span>, to: <span id="valueSwiper11">0</span><br/>@after-change: from: <span id="valueSwiper12">0</span>, to: <span id="valueSwiper13">0</span>',
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
      setValue('#valueSwiper10', from)
      setValue('#valueSwiper11', to)
    }
    const afterChange = (from, to) => {
      setValue('#valueSwiper12', from)
      setValue('#valueSwiper13', to)
    }
    const goto = () => {
      refs.swiper3.goto(2)
    }
    onMounted(() => {
      window.triggerSwiper3 = () => {
        goto()
      }
    })
    return {
      simples,
      beforeChange,
      afterChange,
    }
  },
}

</script>

<style lang="stylus">
.ui-example-child-swiper-2
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
