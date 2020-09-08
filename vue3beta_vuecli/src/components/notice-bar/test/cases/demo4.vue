<template>
  <div class="ui-example-child ui-example-child-notice-bar ui-example-child-notice-bar-4">
    <ui-notice-bar
      icon="warn"
      mode="closable"
      type="warning"
    >
      该银行3:00-12:00系统维护，请更换其他银行卡
    </ui-notice-bar>
    <ui-notice-bar
      icon="coupon"
      mode="link"
      type="activity"
      style="margin-top:10px;"
    >
      福利来啦，7日免息券发放中！
    </ui-notice-bar>
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

<style lang="stylus">
.ui-example-child-notice-bar-4
  flex-direction column
  .ui-notice-bar
    width 100%
</style>
