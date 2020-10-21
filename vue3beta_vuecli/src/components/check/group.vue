<template>
  <div class="ui-check-group">
    <slot></slot>
  </div>
</template>

<script>
import {provide, getCurrentInstance} from 'vue'
import Check from './index'

export default {
  name: 'ui-check-group',

  components: {
    [Check.name]: Check,
  },

  props: {
    value: {
      type: Array,
      default: () => {
        /* istanbul ignore next */
        return []
      },
    },
    max: {
      type: Number,
      default: 0,
    },
  },
  setup(props, {emit}) {
    provide('rootGroup', getCurrentInstance())
    const check = name => {
      const index = props.value.indexOf(name)
      if (index === -1 && (props.max < 1 || props.value.length < props.max)) {
        emit('input', props.value.concat(name))
      }
    }
    const uncheck = name => {
      const index = props.value.indexOf(name)
      if (index !== -1) {
        emit('input', props.value.slice(0, index).concat(props.value.slice(index + 1)))
      }
    }
    const toggle = name => {
      const index = props.value.indexOf(name)
      if (index === -1) {
        check(name)
      } else {
        uncheck(name)
      }
    }
    return {
      check,
      uncheck,
      toggle,
    }
  },
}

</script>

