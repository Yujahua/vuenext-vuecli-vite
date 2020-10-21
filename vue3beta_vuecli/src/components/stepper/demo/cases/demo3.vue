<template>
  <div class="ui-example-child ui-example-child-stepper ui-example-child-stepper-3">
    <ui-field>
      <ui-field-item title="步进2, 只允许输入整数">
        <slot name="right">
          <ui-stepper v-model="value" :step="2" :min="2" is-integer />
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
  title: '步进2',
  titleEnUS: 'Step 2',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Stepper.name]: Stepper,
  },
  setup() {
    const value = ref(3)
    return {
      value,
    }
  },
}

</script>
