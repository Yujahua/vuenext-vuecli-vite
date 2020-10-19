<template>
  <div class="ui-example-child ui-example-child-steps ui-example-child-steps-6">
    <ui-steps
      :steps="steps"
      :current="currentStep"
    >
    </ui-steps>
  </div>
</template>

<script>
import {reactive, ref} from 'vue'
import {Steps} from '@csii/vx-mobile'

export default {
  name: 'steps-demo',
  /* DELETE */
  title: '完成全部步骤',
  titleEnUS: 'Complete all steps',
  height: 150,
  /* DELETE */
  components: {
    [Steps.name]: Steps,
  },
  setup() {
    const steps = reactive([
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
    ])
    const currentStep = ref(4)
    return {
      steps,
      currentStep,
    }
  },
}

</script>
