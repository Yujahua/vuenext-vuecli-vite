<template>
  <div class="ui-example-child ui-example-child-check ui-example-child-check-4">
    <ui-radio-box name="day" v-model="pay" label="日缴" disabled />
    <ui-radio-box name="month" v-model="pay" label="月付" />
    <ui-radio-box name="season" v-model="pay" label="季度费" />
	</div>
</template>

<script>
import {ref} from 'vue'
import {RadioBox} from '@csii/vx-mobile'

export default {
  name: 'radio-demo',
  /* DELETE */
  title: '单选框',
  titleEnUS: 'Radio box',
  align: 'left',
  /* DELETE */
  components: {
    [RadioBox.name]: RadioBox,
  },
  setup() {
    const pay = ref('')
    return {
      pay,
    }
  },
}

</script>
