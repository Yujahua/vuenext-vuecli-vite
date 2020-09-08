<template>
  <div class="ui-example-child ui-example-child-radio ui-example-child-radio-0">
    <ui-radio name="0" v-model="checked" label="单选项1" />
    <ui-radio name="1" v-model="checked" label="单选项2" />
  </div>
</template>

<script>import {Radio} from '@csii/vx-mobile'

export default {
  name: 'radio-demo',
  components: {
    [Radio.name]: Radio,
  },
  data() {
    return {
      checked: '0',
    }
  },
}
</script>
