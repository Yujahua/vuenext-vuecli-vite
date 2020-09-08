<template>
  <div class="ui-example-child ui-example-child-tag ui-example-child-tag-1">
    <ui-tag
      size="large"
      shape="fillet"
      type="fill"
      fill-color="rgba(255, 91, 96, .1)"
      font-weight="normal"
      font-color="#FF5B60"
    >逾期23天</ui-tag>
  </div>
</template>

<script>import {Tag} from '@csii/vx-mobile'

export default {
  name: 'tag-demo',
  /* DELETE */
  title: '圆角',
  titleEnUS: 'Fillet',
  /* DELETE */
  components: {
    [Tag.name]: Tag,
  },
}
</script>