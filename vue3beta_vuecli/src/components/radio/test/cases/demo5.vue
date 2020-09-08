<template>
  <div class="ui-example-child ui-example-child-check ui-example-child-check-5">
    <ui-radio-group v-model="insurants">
      <ui-radio-box name="self">自己</ui-radio-box>
      <ui-radio-box name="couple">配偶</ui-radio-box>
      <ui-radio-box name="parent">父母</ui-radio-box>
      <ui-radio-box name="child" disabled>子女</ui-radio-box>
    </ui-radio-group>
	</div>
</template>

<script>import {RadioBox, RadioGroup} from '@csii/vx-mobile'

export default {
  name: 'radio-demo',
  components: {
    [RadioBox.name]: RadioBox,
    [RadioGroup.name]: RadioGroup,
  },
  data() {
    return {
      insurants: 'self',
    }
  },
}
</script>
