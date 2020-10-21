<template>
  <div class="ui-example-child  ui-example-child-button ui-example-child-button-3">
    <ui-button type="link" icon="message">评论</ui-button>
    <ui-button type="link" inactive>去看看<ui-icon name="arrow-right" size="md"></ui-icon></ui-button>
  </div>
</template>

<script>
import {Button, Icon} from '@csii/vx-mobile'

export default {
  name: 'button-demo',
  /* DELETE */
  title: '文字链接按钮',
  titleEnUS: 'Text link buttons',
  align: 'right',
  /* DELETE */
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
}

</script>

<style lang="stylus" scoped>
.ui-example-child-button-3
  .ui-example-box-content
    float left
    width 100%
    padding 60px h-gap-lg
    color color-text-base
    font-size font-minor-large
    text-align left
    background color-bg-base
    box-sizing border-box
    line-height 1.5
    text-indent 2em
  .ui-button
    float left
</style>
