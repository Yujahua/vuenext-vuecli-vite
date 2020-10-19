<template>
  <div class="ui-example-child ui-example-child-captcha">
    <ui-field title="文案">
      <ui-input-item title="标题" v-model="title"></ui-input-item>
      <ui-input-item title="插槽内容" v-model="content"></ui-input-item>
      <ui-input-item title="短信验证码" value="1234" readonly></ui-input-item>
    </ui-field>

    <ui-field title="配置">
      <ui-field-item title="限制验证码长度" customized align="right">
        <ui-switch v-model="limit"></ui-switch>
      </ui-field-item>

      <ui-input-item title="验证码长度" type="tel" v-model="maxlength"></ui-input-item>

      <ui-field-item title="采用掩码" customized align="right">
        <ui-switch v-model="mask"></ui-switch>
      </ui-field-item>

      <ui-field-item title="使用系统键盘" customized align="right">
        <ui-switch v-model="system"></ui-switch>
      </ui-field-item>
    </ui-field>
    <ui-button @click="next">确定</ui-button>

    <ui-captcha
      ref="captcha"
      v-model="show"
      :title="title"
      :maxlength="limit ? parseFloat(maxlength) : -1"
      :system="system"
      :mask="mask"
      :appendTo="appendTo"
      @submit="submit"
      @show="onShow"
      @hide="onHide"
      @send="onSend"
    >{{content}}</ui-captcha>
  </div>
</template>

<script>
import {ref} from 'vue'
import {Button, Toast, Captcha, InputItem, Field, FieldItem, Switch} from '@csii/vx-mobile'

export default {
  name: 'captcha-demo',
  /* DELETE */
  title: '自定义',
  titleEnUS: 'Customize',
  height: 650,
  /* DELETE */
  components: {
    [Button.name]: Button,
    [Captcha.name]: Captcha,
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Switch.name]: Switch,
  },
  setup() {
    const show = ref(false)
    const appendTo = ref(document.querySelector('.doc-demo-box-priview') || document.body)
    const title = ref('输入验证码')
    const content = ref('验证码已发送至 186****5407')
    const limit = ref(true)
    const maxlength = ref('4')
    const mask = ref(false)
    const system = ref(false)
    const next = function() {
      show.value = true
    }
    const captcha = ref(null)
    const submit = function(val) {
      const max = parseFloat(maxlength.value)
      setTimeout(() => {
        if (!limit.value || max < 0 || val.length === max) {
          if (val !== '1234') {
            captcha.value.setError('验证码错误，请重新输入')
          } else {
            show.value = false
            Toast({
              content: `你输入了${val}`,
            })
          }
        }
      }, 300)
    }
    const onSend = function() {
      console.log('click resend button.')
    }
    const onShow = function() {}
    const onHide = function() {}
    return {
      show,
      appendTo,
      title,
      content,
      limit,
      maxlength,
      mask,
      system,
      next,
      submit,
      captcha,
      onSend,
      onShow,
      onHide,
    }
  },
}

</script>

<style lang="stylus">
.ui-example-child-captcha {
  padding: 20px;

  .ui-field {
    margin-bottom: 40px;
  }
}
</style>
