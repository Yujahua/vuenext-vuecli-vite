<template>
  <div class="ui-example-child ui-example-child-check ui-example-child-check-3">
    <ui-check-group v-model="insurants">
      <ui-check-box name="self" disabled>自己</ui-check-box>
      <ui-check-box name="couple">配偶</ui-check-box>
      <ui-check-box name="parent">父母</ui-check-box>
      <ui-check-box name="child">子女</ui-check-box>
    </ui-check-group>
	</div>
</template>

<script>import {CheckBox, CheckGroup} from '@csii/vx-mobile'

export default {
  name: 'check-demo',
  components: {
    [CheckBox.name]: CheckBox,
    [CheckGroup.name]: CheckGroup,
  },
  data() {
    return {
      insurants: ['self'],
    }
  },
}
</script>
