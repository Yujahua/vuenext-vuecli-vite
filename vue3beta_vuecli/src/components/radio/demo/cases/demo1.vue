<template>
  <div class="ui-example-child ui-example-child-radio ui-example-child-radio-1">
    <ui-field>
      <ui-field-item title="婚姻状况" solid>
        <ui-radio name="2" v-model="marriage" label="已婚" inline />
        <ui-radio name="1" v-model="marriage" label="未婚" inline />
        <ui-radio name="3" v-model="marriage" label="保密" inline />
      </ui-field-item>
    </ui-field>
  </div>
</template>

<script>
import {ref} from 'vue'
import {Radio, Field, FieldItem} from '@csii/vx-mobile'

export default {
  name: 'radio-demo',
  /* DELETE */
  title: '表单项内联',
  titleEnUS: 'With Field',
  align: 'left',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Radio.name]: Radio,
  },
  setup() {
    const marriage = ref('2')
    return {
      marriage,
    }
  },
}

</script>
