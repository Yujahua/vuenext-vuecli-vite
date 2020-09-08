<template>
  <div class="ui-example-child ui-example-child-notice-bar ui-example-child-notice-bar-7">
    <ui-notice-bar>
      <ui-icon slot="left" class="ui-notice-demo-icon ui-notice-demo-icon-left" name="security"></ui-icon>
      为了确保您的资金安全，请设置支付密码
    </ui-notice-bar>
  </div>
</template>

<script>import {NoticeBar, Icon} from '@csii/vx-mobile'

export default {
  name: 'notice-bar-demo',
  components: {
    [NoticeBar.name]: NoticeBar,
    [Icon.name]: Icon,
  },
}
</script>
