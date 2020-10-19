<template>
  <div class="ui-image-viewer" v-show="isViewerShow" @click="viewerClick">
    <div class="viewer-container">
      <swiper
        ref="swiper"
        :autoplay = "0"
        :default-index="currentImgIndex"
        :has-dots="false"
        :is-prevent="false"
        @after-change="afterChange"
        v-if="isViewerShow">
        <swiper-item class="viewer-item-wrap" :class="item.cls" :key="$index" v-for="(item, $index) in imgs">
          <div class="item">
              <img :src="item.url" :alt="item.alt" v-if="!!item.url" />
          </div>
        </swiper-item>
      </swiper>
      <div class="viewer-index" v-if="hasDots">{{ currentImgIndex + 1 }}/{{ list.length }}</div>
    </div>
  </div>
</template>

<script>
import {nextTick, onMounted, reactive, toRefs, watch} from 'vue'
import Swiper from '../swiper'
import SwiperItem from '../swiper/swiper-item'

export default {
  name: 'ui-image-viewer',

  components: {
    Swiper,
    SwiperItem,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    // will be deprecated in the future
    show: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default() {
        return []
      },
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
    hasDots: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, {emit}) {
    const state = reactive({
      isViewerShow: false,
      innerList: [],
      imgs: [],
      currentImgIndex: 0,
    })
    const imgsInit = () => {
      const _imgs = props.list
      const _newImgs = []
      _imgs.map(item => {
        let _item = typeof item === 'object' ? item : {url: item}
        _newImgs.push(_item)
      })
      state.imgs = _newImgs
    }
    watch(
      () => props.show,
      val => {
        state.currentImgIndex = props.initialIndex
        state.isViewerShow = val
        nextTick(() => {
          imgsInit()
        })
      },
    )
    watch(
      () => props.value,
      val => {
        state.currentImgIndex = props.initialIndex
        state.isViewerShow = val
        nextTick(() => {
          imgsInit()
        })
      },
    )
    watch(
      () => state.isViewerShow,
      val => {
        emit('input', val)
        // will be deprecated in the future
        !val && emit('update:show', val)
      },
    )
    onMounted(() => {
      state.isViewerShow = props.value || props.show
    })
    const afterChange = (fromIndex, toIndex) => {
      state.currentImgIndex = toIndex
    }
    const viewerClick = () => {
      state.isViewerShow = false
    }
    const publicMethod = () => {}
    return {
      ...toRefs(state),
      imgsInit,
      afterChange,
      viewerClick,
      publicMethod,
    }
  },
}

</script>

<style lang="stylus">
.ui-image-viewer
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  z-index image-viewer-zindex
  transform translate3d(0,0,0)
  overflow hidden

  .viewer-index
    position absolute
    bottom image-viewer-index-bottom
    left 0
    width 100%
    text-align center
    color #FFF
    font-size image-viewer-index-font-size
    text-shadow 0 1px 1px #333
    z-index 101
  .viewer-container
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    background-color rgba(0, 0, 0, 0.85)
    z-index 100
  .viewer-items
      list-style none
      position absolute
      left 0
      top 0
      height 100%
      width 100%
  .viewer-items .viewer-item-wrap
      position absolute
      top 0
      height 100%
      width 100%
  .viewer-item-wrap .item
      width 100%
      display inline-block
      position absolute
      top 50%
      transform translateY(-50%)
  .viewer-item-wrap .item>img
      width 100%
      display block
</style>
