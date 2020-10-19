<template>
  <div class="ui-radio-group">
    <slot></slot>
  </div>
</template>

<script>
import {provide, getCurrentInstance} from 'vue'
export default {
  name: 'ui-radio-group',

  props: {
    value: {
      type: String,
      default: '',
    },
    max: {
      type: Number,
      default: 0,
    },
  },
  setup(props, {emit}) {
    provide('rootGroup', getCurrentInstance())
    const check = name => {
      emit('input', name)
    }
    return {
      check,
    }
  },
}

</script>

