<template>
  <div class="ui-example-child ui-example-child-radio ui-example-child-radio-0">
    <ui-radio name="0" v-model="checked" label="单选项1" />
    <ui-radio name="1" v-model="checked" label="单选项2" />
  </div>
</template>

<script>
import {ref} from 'vue'
import {Radio} from '@csii/vx-mobile'

export default {
  name: 'radio-demo',
  /* DELETE */
  title: '普通单选项',
  titleEnUS: 'Normal radio',
  /* DELETE */
  components: {
    [Radio.name]: Radio,
  },
  setup() {
    const checked = ref('0')
    return {
      checked,
    }
  },
}

</script>
