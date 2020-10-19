<template>
  <div class="ui-example-child ui-example-child-swiper ui-example-child-swiper-3">
    <ui-swiper
      @before-change="beforeChange"
      @after-change="afterChange"
      ref="swiper4">
      <ui-swiper-item :key="$index" v-for="(item, $index) in mulits">
        <ul>
          <li :key="$index1" v-for="(sub, $index1) in item">
            <a href="javascript:void(0)" class="banner-item" :style="{'background': `${sub.color}`}">{{sub.text}}</a>
          </li>
        </ul>
      </ui-swiper-item>
    </ui-swiper>
  </div>
</template>

<script>
import {onMounted, reactive} from 'vue'
import {Swiper, SwiperItem} from '@csii/vx-mobile'
import mulit from '@csii/vx-mobile/components/swiper/demo/data/mulit-item'

export default {
  name: 'swiper-demo',
  /* DELETE */
  title: '每屏多内容 <a href="javascript:window.triggerSwiper4()">Goto 2</a>',
  titleEnUS: 'Multiple content per screen <a href="javascript:window.triggerSwiper3()">Goto 2</a>',
  describe: '复杂结构，每屏显示一组多条内容',
  describeEnUS: 'Complex structure, displaying a group of multiple items per screen',
  message:
    '@before-change: from: <span id="valueSwiper15">0</span>, to: <span id="valueSwiper16">0</span><br/>@after-change: from: <span id="valueSwiper17">0</span>, to: <span id="valueSwiper18">0</span>',
  /* DELETE */
  components: {
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
  },
  setup(props, {refs}) {
    let mulits = reactive(mulit)
    const setValue = (id, value) => {
      document.querySelector(id) && (document.querySelector(id).innerHTML = value)
    }
    const beforeChange = (from, to) => {
      setValue('#valueSwiper15', from)
      setValue('#valueSwiper16', to)
    }
    const afterChange = (from, to) => {
      setValue('#valueSwiper17', from)
      setValue('#valueSwiper18', to)
    }
    const goto = () => {
      refs.swiper4.goto(2)
    }
    onMounted(() => {
      window.triggerSwiper4 = () => {
        goto()
      }
    })
    return {
      mulits,
      beforeChange,
      afterChange,
    }
  },
}

</script>

<style lang="stylus">
.ui-example-child-swiper-3
  height 250px
  li
    list-style none
    float left
    width 33%
    height 125px
  .banner-item
    float left
    width 100%
    height 100%
    line-height 125px
    text-align center
    font-size 28px
    color #FFF
    box-align center
    align-items center
    box-pack center
    justify-content center
    text-decoration-line none
</style>
