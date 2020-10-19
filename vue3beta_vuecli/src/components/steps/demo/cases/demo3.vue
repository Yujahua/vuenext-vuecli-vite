<template>
  <div class="ui-example-child ui-example-child-steps ui-example-child-steps-3">
    <ui-steps
      :steps="steps"
      :current="2"
    >
    </ui-steps>
  </div>
</template>

<script>
import {reactive} from 'vue'
import {Steps} from '@csii/vx-mobile'

export default {
  name: 'steps-demo',
  /* DELETE */
  title: '指定当前步骤',
  titleEnUS: 'Specify the current step',
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
    return {
      steps,
    }
  },
}

</script>