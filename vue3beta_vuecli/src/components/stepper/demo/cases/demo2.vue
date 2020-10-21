<template>
  <div class="ui-example-child ui-example-child-stepper ui-example-child-stepper-2">
    <ui-field>
      <ui-field-item title="最小值-12，最大值18">
        <slot name="right">
          <ui-stepper v-model="value" min="-12" max="18" />
        </slot>
      </ui-field-item>
    </ui-field>
  </div>
</template>

<script>
import {ref} from 'vue'
import {Stepper, Field, FieldItem} from '@csii/vx-mobile'

export default {
  name: 'stepper-demo',
  /* DELETE */
  title: '最小值-12，最大值18',
  titleEnUS: 'Minimum is -12 and maximum is 18',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Stepper.name]: Stepper,
  },
  setup() {
    const value = ref(0)
    return {
      value,
    }
  },
}

</script>
