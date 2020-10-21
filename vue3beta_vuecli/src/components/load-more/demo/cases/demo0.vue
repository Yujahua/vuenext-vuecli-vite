<template>
  <ui-load-more class='load-more-demo'
      ref='loadMore'
      @on-refresh='onRefresh'
      @on-load='onLoadMore'>
      <slot name='refresh'>
      <ui-refresh
      v-slot='{ refreshing, refreshActive }'
      :refreshing='refreshing'
      :refresh-active='refreshActive'
      />
      </slot>
        <div v-for='i in list'
        :key='i' class='scroll-view-item'>{{i}}</div>
      <slot name='more'>
      <ui-more
      v-slot='{ loading, loadActive, noMore }'
      :loading='loading'
      :load-active='loadActive'
      :no-more='noMore'/></slot>
    </ui-load-more>
</template>
<script>
import {ref} from 'vue'
import {LoadMore, More, Refresh} from '@csii/vx-mobile'
export default {
  name: 'load-more-demo',
  components: {
    [LoadMore.name]: LoadMore,
    [More.name]: More,
    [Refresh.name]: Refresh,
  },
  setup(props, {refs}) {
    let list = ref(5)
    const onRefresh = () => {
      setTimeout(() => {
        list.value = 5
        // console.log(this.$refs.loadMore)
        refs.loadMore.finishRefresh()
      }, 2000)
    }
    const onLoadMore = () => {
      // console.log('loadmore')
      setTimeout(() => {
        // console.log('load Data')
        list.value += 5
        if (list.value >= 25) {
          refs.loadMore.noMoreData()
          return
        }
        refs.loadMore.finishLoad()
      }, 1000)
    }
    return {
      list,
      onRefresh,
      onLoadMore,
    }
  },
}

</script>
<style lang='stylus'>
.load-more-demo
  height calc(100vh - 300px)
  background-color #fff
  .scroll-view-item
    line-height 1rem
    text-align center
    &:nth-of-type(odd)
      background-color #eee
</style>
