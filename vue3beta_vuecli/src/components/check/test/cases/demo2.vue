<template>
  <div class="ui-example-child ui-example-child-check ui-example-child-check-2">
    <ui-check-box name="day" v-model="pay" label="日缴" disabled />
    <ui-check-box name="month" v-model="pay" label="月付" />
    <ui-check-box name="season" v-model="pay" label="季度费" />
	</div>
</template>

<script>import {CheckBox} from '@csii/vx-mobile'

export default {
  name: 'check-demo',
  components: {
    [CheckBox.name]: CheckBox,
  },
  data() {
    return {
      pay: '',
    }
  },
}
</script>
