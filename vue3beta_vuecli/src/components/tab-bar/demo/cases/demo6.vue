<template>
  <div class="ui-example-child ui-example-child-tabs ui-example-child-tab-bar-6">
    <ui-tab-bar
      v-model="current"
      :items="items"
      @change="onTabChange"
    ></ui-tab-bar>
    <ui-swiper
      ref="swiper"
      :autoplay="0"
      :is-prevent="false"
      :is-loop="false"
      :has-dots="false"
      @before-change="onSwiperChange"
    >
      <ui-swiper-item>
        她对他很满意。走吧。好。他起身买单，腿却一拐一拐的。难怪他才华横溢，事业有成，却还是单身。趁着他买单，她赶紧悄悄走了。
      </ui-swiper-item>
      <ui-swiper-item>
        又是一年，她又遇到了他，他正牵着孩子的手，走的飞快。
      </ui-swiper-item>
    </ui-swiper>
  </div>
</template>

<script>
import {TabBar, Swiper, SwiperItem} from '@csii/vx-mobile'
import {reactive, nextTick, toRefs} from 'vue'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '手势切换',
  titleEnUS: 'Gesture switching',
  /* DELETE */
  components: {
    [TabBar.name]: TabBar,
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
  },
  setup(p, {refs}) {
    let state = reactive({
      current: 0,
      items: [{name: 0, label: '标签1'}, {name: 1, label: '标签2'}],
    })
    const onSwiperChange = (from, to) => {
      state.current = to
    }
    const onTabChange = (item, index) => {
      nextTick(() => {
        refs.swiper.goto(index)
      })
    }
    return {
      ...toRefs(state),
      onSwiperChange,
      onTabChange,
    }
  },
}

</script>

<style>
.ui-example-child-tab-bar-6 .ui-swiper {
  background: #FFF;
}
.ui-example-child-tab-bar-6 .ui-swiper .ui-swiper-item {
  padding: 20px;
  box-sizing: border-box;
  font-size: 24px;
  line-height: 1.5;
  color: #666;
}
</style>

