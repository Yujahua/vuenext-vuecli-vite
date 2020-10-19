<template>
  <li
    v-if="noTouch"
    :class="[active ? 'active' : '']"
    @click="onFocus"
  >
    <span v-text="value"></span>
  </li>
  <li
    v-else
    :class="[active ? 'active' : '']"
    @touchstart="onFocus"
    @touchmove="onBlur"
    @touchend="onBlur"
    @touchcancel="onBlur"
    @click="onFocus"
  >
    <span v-text="value"></span>
  </li>
</template>

<script>
import {ref} from 'vue'
export default {
  name: 'ui-number-key',

  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    noTouch: {
      type: Boolean,
      default: false,
    },
    noPrevent: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, {emit}) {
    let active = ref(false)
    const onFocus = event => {
      if (!props.noPrevent) {
        event.preventDefault()
        event.stopImmediatePropagation()
      }
      if (!props.noTouch) {
        active.value = true
      }
      emit('press', props.value)
    }
    const onBlur = () => {
      active.value = false
    }
    return {
      active,
      onFocus,
      onBlur,
    }
  },
}

</script>
