<template>
  <div class="ui-example-child ui-example-child-notice-bar ui-example-child-notice-bar-5">
    <ui-notice-bar
      mode="link"
      icon="security"
      multi-rows
    >
      为了确保您的资金安全，请设置支付密码。为了确保您的资金安全，请设置支付密码。为了确保您的资金安全，请设置支付密码。
    </ui-notice-bar>
  </div>
</template>

<script>import {NoticeBar} from '@csii/vx-mobile'

export default {
  name: 'notice-bar-demo',
  /* DELETE */
  title: '多行显示',
  titleEnUS: 'Multi-line display',
  background: '#fff',
  /* DELETE */
  components: {
    [NoticeBar.name]: NoticeBar,
  },
}
</script>
