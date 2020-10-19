<template>
  <div class="ui-example-child ui-example-child-steps ui-example-child-steps-4">
    <ui-steps
      :steps="steps"
      :current="currentStep"
      transition
    >
    </ui-steps>
  </div>
</template>

<script>
import {reactive, ref, onMounted} from 'vue'
import {Steps} from '@csii/vx-mobile'

export default {
  name: 'steps-demo',
  /* DELETE */
  title: '进度变化动效 <a href="javascript:window.triggerSteps0()">current = 2</a>',
  titleEnUS: 'Transition of rogress changes <a href="javascript:window.triggerSteps0()">current = 2</a>',
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
    const currentStep = ref(0)
    onMounted(() => {
      window.triggerSteps0 = () => {
        currentStep.value = 2
      }
    })
    return {
      steps,
      currentStep,
    }
  },
}

</script>
