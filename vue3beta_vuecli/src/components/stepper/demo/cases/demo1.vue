<template>
  <div class="ui-example-child ui-example-child-stepper ui-example-child-stepper-1">
    <ui-field>
      <ui-field-item title="只读">
        <ui-stepper slot="right" read-only />
      </ui-field-item>
    </ui-field>
  </div>
</template>

<script>import {Stepper, Field, FieldItem} from '@csii/vx-mobile'

export default {
  name: 'stepper-demo',
  /* DELETE */
  title: '只读',
  titleEnUS: 'Readonly',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Stepper.name]: Stepper,
  },
}
</script>
