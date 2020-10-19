<template>
  <div class="ui-scroll-view-more">
    <template v-if="!isFinished">
      {{ loadingText }}
    </template>
    <template v-else>
      {{ finishedText }}
    </template>
  </div>
</template>

<script>export default {
  name: 'ui-scroll-view-more',
  props: {
    loadingText: {
      type: String,
      default: '更多加载中...',
    },
    finishedText: {
      type: String,
      default: '全部已加载',
    },
    isFinished: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="stylus">
.ui-scroll-view-more
  padding v-gap-lg 0
  font-size font-minor-large
  text-align center
  color color-text-caption
</style>