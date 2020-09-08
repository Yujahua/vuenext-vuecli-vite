<template>
  <div class="ui-example-child ui-example-child-check ui-example-child-check-0">
    <ui-check v-model="checked" label="复选项" />
    <ui-check label="禁用" disabled />
	</div>
</template>

<script>import {Check} from '@csii/vx-mobile'

export default {
  name: 'check-demo',
  title: '复选项',
  components: {
    [Check.name]: Check,
  },
  data() {
    return {
      checked: false,
    }
  },
}
</script>
