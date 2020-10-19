<template>
  <div class="ui-example-child ui-example-child-steps ui-example-child-steps-0">
    <ui-steps :steps="steps"></ui-steps>
  </div>
</template>

<script>
import {reactive} from 'vue'
import {Steps} from '@csii/vx-mobile'

export default {
  name: 'steps-demo',
  /* DELETE */
  height: 150,
  /* DELETE */
  components: {
    [Steps.name]: Steps,
  },
  setup() {
    const steps = reactive([
      {
        name: '登录/注册',
      },
      {
        name: '申请征信报告',
      },
      {
        name: '提取征信报告',
      },
    ])
    return {
      steps,
    }
  },
}

</script>