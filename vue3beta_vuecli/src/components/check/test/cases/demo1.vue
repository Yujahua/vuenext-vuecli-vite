<template>
  <div class="ui-example-child ui-example-child-check ui-example-child-check-1">
    <ui-check-group v-model="favorites">
      <ui-check name="watermelon" label="西瓜" />
      <ui-check name="apple" label="苹果" />
      <ui-check name="banana" label="香蕉" />
      <ui-check name="orange" label="橙子" />
      <ui-check name="tomato" label="西红柿" disabled />
    </ui-check-group>
	</div>
</template>

<script>import {Check, CheckGroup} from '@csii/vx-mobile'

export default {
  name: 'check-demo',
  title: '复选项组',
  components: {
    [Check.name]: Check,
    [CheckGroup.name]: CheckGroup,
  },
  data() {
    return {
      favorites: ['apple'],
    }
  },
}
</script>
