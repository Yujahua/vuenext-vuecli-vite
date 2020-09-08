<template>
  <div class="ui-example-child ui-example-child-notice-bar ui-example-child-notice-bar-1">
    <ui-notice-bar
      mode="closable"
      icon="security"
    >
      为了确保您的资金安全，请设置支付密码
    </ui-notice-bar>
  </div>
</template>

<script>import {NoticeBar} from '@csii/vx-mobile'

export default {
  name: 'notice-bar-demo',
  /* DELETE */
  title: '设置图标',
  titleEnUS: 'With icon',
  background: '#fff',
  /* DELETE */
  components: {
    [NoticeBar.name]: NoticeBar,
  },
}
</script>
