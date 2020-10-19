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

<script>
import {ref} from 'vue'
import {RadioBox, RadioGroup} from '@csii/vx-mobile'

export default {
  name: 'radio-demo',
  /* DELETE */
  title: '单选框组',
  titleEnUS: 'Radio box group',
  align: 'left',
  /* DELETE */
  components: {
    [RadioBox.name]: RadioBox,
    [RadioGroup.name]: RadioGroup,
  },
  setup() {
    const insurants = ref('self')
    return {
      insurants,
    }
  },
}

</script>
