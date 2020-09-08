<template>
  <div class="ui-example-child ui-example-child-captcha-1">
    <ui-captcha
      :maxlength="4"
      :isView="true"
      brief="最新验证码依然有效，请勿重发"
    >
      验证码已发送至186****5407
    </ui-captcha>
  </div>
</template>

<script>import {Captcha} from '@csii/vx-mobile'

export default {
  name: 'captcha-demo',
  components: {
    [Captcha.name]: Captcha,
  },
}
</script>

<style lang="stylus">
.ui-example-child-captcha-1
  height 650px
  padding 30px 0
  .ui-number-keyboard
    margin-top 30px
</style>
