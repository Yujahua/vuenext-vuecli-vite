<template>
  <div class="ui-example">
    <ui-switch v-model="loading" class="skeleton-switch"></ui-switch>
    <ui-field>
      <ui-skeleton avatar title :loading="loading" :row="2" class="skeleton-item">
        <ui-cell-item title="交通银行" brief="展示摘要描述" addon="附加文案" arrow>
          <span class="holder" slot="left"></span>
        </ui-cell-item>
      </ui-skeleton>
      <ui-skeleton avatar title :loading="loading" :row="2" class="skeleton-item">
        <ui-cell-item title="招商银行" brief="展示摘要描述" addon="附加文案" arrow>
          <span class="holder" slot="left"></span>
        </ui-cell-item>
      </ui-skeleton>
    </ui-field>
  </div>
</template>

<script>import {Skeleton, Field, CellItem, Switch} from '@csii/vx-mobile'
export default {
  name: 'skeleton-demo',
  title: '切换显示子组件',
  data() {
    return {
      loading: true,
    }
  },
  components: {
    [Skeleton.name]: Skeleton,
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [Switch.name]: Switch,
  },
}
</script>

<style lang="stylus" scoped>
.skeleton-switch
  margin-bottom 32px
.skeleton-item
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
