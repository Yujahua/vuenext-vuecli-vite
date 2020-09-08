<template>
  <div class="ui-example-child ui-example-child-result-page ui-example-child-result-page-3">
    <ui-result-page
      class="customized"
      img-url="//manhattan.didistatic.com/static/manhattan/do1_JX7bcfXqLpStKRv31xlp"
      text="不太确定自己错在了哪里..."
      subtext="要不然刷新试试？">
    </ui-result-page>
  </div>
</template>

<script>import {ResultPage} from '@csii/vx-mobile'

export default {
  name: 'result-page-demo',
  /* DELETE */
  title: '自定义图案',
  titleEnUS: 'Custom pattern',
  /* DELETE */
  components: {
    [ResultPage.name]: ResultPage,
  },
}
</script>