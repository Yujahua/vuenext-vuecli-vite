<template>
  <div class="ui-example-child ui-example-child-stepper ui-example-child-stepper-5">
    <ui-field>
      <ui-field-item title="step为小数1.3">
        <slot name="right">
          <ui-stepper :step="1.3" />
        </slot>
      </ui-field-item>
    </ui-field>
  </div>
</template>

<script>
import {Stepper, Field, FieldItem} from '@csii/vx-mobile'

export default {
  name: 'stepper-demo',
  /* DELETE */
  title: 'step为小数1.3',
  titleEnUS: 'Step is a decimal, 1.3',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Stepper.name]: Stepper,
  },
}

</script>
