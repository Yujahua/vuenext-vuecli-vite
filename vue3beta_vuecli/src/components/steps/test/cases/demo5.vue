<template>
  <div class="ui-example-child ui-example-child-steps ui-example-child-steps-5">
    <ui-steps
      :steps="steps"
      :current="currentStep"
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
        },
        {
          name: '开通',
        },
        {
          name: '验证',
        },
        {
          name: '成功',
        },
      ],
      currentStep: 1,
    }
  },
}
</script>

<style lang="stylus">
.ui-example-child-steps-5
  height 140px
  .ui-steps .icon.current::before
    content ''
    color color-primary-tap
    border-bottom 10px solid
    border-left 10px solid transparent
    border-right 10px solid transparent
    position absolute
    top 130px
</style>
