<template>
  <div class="ui-example-child ui-example-child-skeleton ui-example-child-skeleton-2">
    <ui-field>
      <ui-skeleton avatar title :loading="loading" :row="2" class="skeleton-item">
        <ui-cell-item title="交通银行" brief="展示摘要描述" addon="附加文案" arrow>
          <slot name="left" class="holder"></slot>
        </ui-cell-item>
      </ui-skeleton>
      <ui-skeleton avatar title :loading="loading" :row="2" class="skeleton-item">
        <ui-cell-item title="招商银行" brief="展示摘要描述" addon="附加文案" arrow>
          <slot name="left" class="holder"></slot>
        </ui-cell-item>
      </ui-skeleton>
    </ui-field>
  </div>
</template>

<script>
import {Skeleton, Field, CellItem} from '@csii/vx-mobile'
import {ref, onMounted} from 'vue'
export default {
  name: 'skeleton-demo',
  /* DELETE */
  title: '加载正文 <a href="javascript:window.startLoading()">开始加载</a>',
  titleEnUS: 'Loading body <a href="javascript:window.startLoading()">Start loading</a>',
  describe: '3s后加载完成',
  describeEnUS: 'Load completed after 3s',
  /* DELETE */
  components: {
    [Skeleton.name]: Skeleton,
    [Field.name]: Field,
    [CellItem.name]: CellItem,
  },
  setup() {
    const loading = ref(true)
    const startLoading = () => {
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 3000)
    }
    onMounted(() => {
      window.startLoading = startLoading
      startLoading()
    })
    return {
      loading,
      startLoading,
    }
  },
}

</script>

<style lang="stylus" scoped>
.ui-example-child-skeleton-2
  margin 30px 0
.skeleton-switch
  margin-bottom 32px
.skeleton-item
  &:last-child
    margin-bottom 0
  margin-bottom 24px
.ui-cell-item
  &.skeleton-item
    margin-bottom 0
.holder
  display block
  width 80px
  height 80px
  border-radius 50%
  background-color #e6e6e6
</style>
