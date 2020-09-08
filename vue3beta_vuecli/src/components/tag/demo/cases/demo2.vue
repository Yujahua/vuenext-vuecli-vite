<template>
  <div class="ui-example-child ui-example-child-tag ui-example-child-tag-2">
    <tag size="large" shape="square" font-color="#FF8843" type="ghost">可选</tag>
    <tag size="small" shape="square" font-color="#28AA91" type="ghost">可选</tag>
  </div>
</template>

<script>import {Tag} from '@csii/vx-mobile'

export default {
  name: 'tag-demo',
  /* DELETE */
  title: '线框',
  titleEnUS: 'Square',
  /* DELETE */
  components: {
    Tag,
  },
}
</script>
