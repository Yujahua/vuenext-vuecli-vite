<template>
  <div class="ui-example-child ui-example-child-stepper ui-example-child-stepper-4">
    <ui-field>
      <ui-field-item title="最小值4大于默认值">
        <slot name="right">
          <ui-stepper :min="4" />
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
  title: '最小值4大于默认值',
  titleEnUS: 'Minimum is 4 which is greater than default',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Stepper.name]: Stepper,
  },
}

</script>
