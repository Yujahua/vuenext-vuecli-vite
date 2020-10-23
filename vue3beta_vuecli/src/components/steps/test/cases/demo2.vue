<template>
  <div class="ui-example-child ui-example-child-steps ui-example-child-steps-2">
    <ui-steps
      :steps="steps"
      :current="2"
    >
      <template v-slot:reached="props">
        <!-- props.index -->
        <ui-icon name="checked" v-if="props.index === 1"></ui-icon>
        <div class="step-node-default" v-else></div>
      </template>
      <template v-slot:current="props">
        <ui-icon name="location"></ui-icon>
      </template>
    </ui-steps>
  </div>
</template>

<script>
import {Steps, Icon} from '@csii/vx-mobile'

export default {
  name: 'steps-demo',
  components: {
    [Steps.name]: Steps,
    [Icon.name]: Icon,
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
    }
  },
}

</script>