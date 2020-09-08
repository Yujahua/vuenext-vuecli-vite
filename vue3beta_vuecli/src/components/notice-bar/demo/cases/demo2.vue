<template>
  <div class="ui-example-child ui-example-child-notice-bar ui-example-child-notice-bar-2">
    <ui-notice-bar :time="5000">为了确保您的资金安全，请设置支付密码</ui-notice-bar>
  </div>
</template>

<script>import {NoticeBar} from '@csii/vx-mobile'

export default {
  name: 'notice-bar-demo',
  /* DELETE */
  title: '设置时间',
  titleEnUS: 'Setting dwell time',
  describe: '5s后隐藏',
  describeEnUS: 'Hidden after 5s',
  background: '#fff',
  /* DELETE */
  components: {
    [NoticeBar.name]: NoticeBar,
  },
}
</script>