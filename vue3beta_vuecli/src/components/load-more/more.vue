<template>
  <div class='ui-more'>
    <slot>
      <span v-if='loadStatus===2' class='load-status load-start'></span>
      <span v-if='loadStatus===1' class='load-status load-active'></span>
      <span v-if='loadStatus===0' class='load-status loading'></span>
      <p class='load-tip'>
        <span class='load-text'>{{ loadTip }}</span>
      </p>
    </slot>
  </div>
</template>
<script>
import {computed} from 'vue'
export default {
  name: 'ui-more',
  props: {
    loadText: {
      type: String,
      default: '上拉加载',
    },
    loadActiveText: {
      type: String,
      default: '释放加载',
    },
    loadingText: {
      type: String,
      default: '加载中...',
    },
    noMoreText: {
      type: String,
      default: '没有更多数据了',
    },
    loadActive: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    noMore: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    let loadTip = computed(() => {
      if (props.noMore) {
        return props.noMoreText
      }
      if (props.loading) {
        return props.loadingText
      }
      if (props.loadActive) {
        return props.loadActiveText
      }
      return props.loadText
    })
    let loadStatus = computed(() => {
      if (props.noMore) {
        return -1
      } else if (props.loading) {
        return 0
      } else if (props.loadActive) {
        return 1
      } else {
        return 2
      }
    })
    return {
      loadTip,
      loadStatus,
    }
  },
}

</script>
<style lang='stylus'>
.ui-more
  width 100%
  // height 100px
  display flex
  font-size 24px
  justify-content center
  align-items center
  overflow hidden
  // background-color #f00
  .load-status
    width 32px
    height 36px
    background-repeat no-repeat
    background-position center
    background-size 24px 100%
    display inline-block
    &.load-start
      background-image url('../_style/images/arrow-up.svg')
    &.load-active
      background-image url('../_style/images/arrow-down.svg')
    &.loading
      animation spinners-animation 1200ms linear infinite
      background-image url('../_style/images/loading.svg')
  .load-tip
    // margin-left 15px
    font-size 24px
    color #9E98A7
    display flex
    flex-direction column
    padding 30px 20px
    span
      text-align center
      ine-height 28px
      letter-spacing 0.82px
      &.load-date
        font-size 24px
        line-height 34px
        letter-spacing 0.7px
@keyframes spinners-animation
  from
    transform rotate(0deg)
  to
    transform rotate(360deg)
</style>
