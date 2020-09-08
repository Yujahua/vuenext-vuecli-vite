<template>
  <div class="ui-example-child ui-example-child-tag ui-example-child-tag-3">
    <ui-tag
      size="large"
      shape="coupon"
      fill-color="#FC9153"
      type="fill"
      font-color="#fff"
      style="margin-right:20px;"
    >免息券70.1</ui-tag>
    <ui-tag
      size="large"
      shape="quarter"
      fill-color="#FC9153"
      type="fill"
      font-color="#fff"
      style="margin-right:20px;"
    >
      <ui-icon name="right"></ui-icon>
    </ui-tag>
    <ui-tag
      size="large"
      shape="bubble"
      fill-color="linear-gradient(90deg, #FF5B60 0%, #F98472 100%)"
      type="fill"
    >99</ui-tag>
  </div>
</template>

<script>import {Tag, Icon} from '@csii/vx-mobile'

export default {
  name: 'tag-demo',
  /* DELETE */
  title: '特殊标签',
  titleEnUS: 'Special tags',
  /* DELETE */
  components: {
    [Tag.name]: Tag,
    [Icon.name]: Icon,
  },
}
</script>
