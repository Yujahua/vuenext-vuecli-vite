<template>
  <div class="ui-example-child ui-example-child-notice-bar ui-example-child-notice-bar-3">
    <ui-notice-bar round>为了确保您的资金安全，请设置支付密码</ui-notice-bar>
  </div>
</template>

<script>import {NoticeBar} from '@csii/vx-mobile'

export default {
  name: 'notice-bar-demo',
  components: {
    [NoticeBar.name]: NoticeBar,
  },
}
</script>
