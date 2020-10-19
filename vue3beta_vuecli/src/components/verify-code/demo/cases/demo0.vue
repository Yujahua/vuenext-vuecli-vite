<template>
  <div class="ui-example-child ui-example-child-verify-code">
    <ui-verify-code></ui-verify-code>
	</div>
</template>

<script>import {VerifyCode} from '@csii/vx-mobile'

export default {
  name: 'verify-code-demo',
  /* DELETE */
  title: '按钮验证码',
  describe: '点击按钮获取验证码',
  /* DELETE */
  components: {
    [VerifyCode.name]: VerifyCode,
  },
}
</script>

<style lang="stylus" scoped>
.ui-example-child-verify-code
  padding 20px
  background-color #fff
</style>
