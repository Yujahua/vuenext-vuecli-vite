<template>
  <div class="ui-example-child ui-example-child-stepper ui-example-child-stepper-0">
    <ui-field>
      <ui-field-item title="禁用">
        <ui-stepper slot="right" disabled />
      </ui-field-item>
    </ui-field>
  </div>
</template>

<script>import {Stepper, Field, FieldItem} from '@csii/vx-mobile'

export default {
  name: 'stepper-demo',
  /* DELETE */
  title: '禁用',
  titleEnUS: 'Disabled',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Stepper.name]: Stepper,
  },
}
</script>
