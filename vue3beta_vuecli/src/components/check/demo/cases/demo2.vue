<template>
  <div class="ui-example-child ui-example-child-check ui-example-child-check-2">
    <ui-check-box name="day" v-model="pay" label="日缴" disabled />
    <ui-check-box name="month" v-model="pay" label="月付" />
    <ui-check-box name="season" v-model="pay" label="季度费" />
	</div>
</template>

<script>
import {CheckBox} from '@csii/vx-mobile'
import {ref} from 'vue'

export default {
  name: 'check-demo',
  /* DELETE */
  title: '复选框',
  titleEnUS: 'Check box',
  /* DELETE */
  components: {
    [CheckBox.name]: CheckBox,
  },
  setup() {
    return {
      pay: ref(''),
    }
  },
}

</script>
