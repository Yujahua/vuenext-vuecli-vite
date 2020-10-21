<template>
  <div class="ui-example-child ui-example-child-steps ui-example-child-steps-2">
    <ui-steps
      :steps="steps"
      :current="2"
    >
      <template name="icon" v-slot="props">
        <b v-if="props.index === props.currentIndex">{{ props.index }}</b>
        <span v-else>{{ props.index }}</span>
      </template>
    </ui-steps>
    <ui-steps
      :steps="steps"
      :current="2"
    >
      <template name="reached" v-slot="props">
        <!-- props.index -->
        <ui-icon name="checked" v-if="props.index === 1"></ui-icon>
        <div class="step-node-default" v-else>
          <div class="step-node-default-icon" style="width: 6px;height: 6px;border-radius: 50%;"></div>
        </div>
      </template>
      <template v-slot:current>
        <ui-icon name="location"></ui-icon>
      </template>
      <template v-slot:unreached>
        <ui-icon name="time"></ui-icon>
      </template>
    </ui-steps>
  </div>
</template>

<script>
import {reactive} from 'vue'
import {Steps, Icon} from '@csii/vx-mobile'

export default {
  name: 'steps-demo',
  /* DELETE */
  title: '自定义步骤图标',
  titleEnUS: 'Custom step icon',
  height: 150,
  /* DELETE */
  components: {
    [Steps.name]: Steps,
    [Icon.name]: Icon,
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
