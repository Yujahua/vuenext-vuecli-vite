<template>
  <div class="ui-example-child ui-example-child-tip ui-example-child-tip-4">
    <ui-tip
      name="ui-tip-4"
      icon="security"
      content="完善信息，领取5元免息券"
      :offset="{top: -10}"
      fill
      @show="onShow"
      @hide="onHide"
    >
      <ui-button type="default">点击我</ui-button>
    </ui-tip>
  </div>
</template>

<script>import {Tip, Button, Toast} from '@csii/vx-mobile'
export default {
  name: 'tips-demo',
  /* DELETE */
  title: '其他配置',
  titleEnUS: 'Other configurations',
  /* DELETE */
  components: {
    [Tip.name]: Tip,
    [Button.name]: Button,
  },
  setup() {
    const onShow = name => {
      Toast({
        content: `显示了${name}`,
      })
    }
    const onHide = name => {
      Toast({
        content: `隐藏了${name}`,
      })
    }
    return {
      onShow,
      onHide,
    }
  },
}
</script>

<style lang="stylus">
.ui-tip-4
  .ui-tip-bg
    background-color #FFEBDF
    &:after
      border-width 10px 11px 0 11px
      border-color #FFEBDF transparent transparent transparent
  .ui-tip-content
    padding-left 80px
    color #C37447
    .ui-icon-security
      position absolute
      left 32px
      width 64px !important
      height 64px !important
  .ui-tip-bg
    box-shadow none
    opacity 1
</style>

