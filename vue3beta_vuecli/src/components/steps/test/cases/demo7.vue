<template>
  <div class="ui-example-child ui-example-child-steps ui-example-child-steps-7">
    <ui-steps
      direction="vertical"
      :steps="steps"
      :current="1"
      vertical-adaptive
    >
    </ui-steps>
  </div>
</template>

<script>import {Steps} from '@csii/vx-mobile'

export default {
  name: 'steps-demo',
  components: {
    [Steps.name]: Steps,
  },
  data() {
    return {
      steps: [
        {
          name: '登录',
          text: '这是登录的描述',
        },
        {
          name: '开通',
          text: '这是开通的描述',
        },
        {
          name: '验证',
          text: '这是验证的描述',
        },
        {
          name: '成功',
          text: '这是成功的描述',
        },
      ],
    }
  },
}
</script>

<style lang="stylus">
.ui-example-child-steps-7 .ui-steps
  height 420px
</style>
