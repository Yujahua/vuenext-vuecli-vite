<template>
  <ui-check-base-box
    class="ui-radio-box"
    :label="label"
    :is-checked="isChecked"
    :disabled="disabled"
    @click.native="onClick"
  >
    <slot>{{label}}</slot>
  </ui-check-base-box>
</template>

<script>
import {inject, computed} from 'vue'
import CheckBaseBox from '../check-base/box'

export default {
  name: 'ui-radio-box',

  components: {
    [CheckBaseBox.name]: CheckBaseBox,
  },

  props: {
    name: {
      default: true,
    },
    value: {
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const rootGroup = inject('rootGroup', null)
    const isChecked = computed(() => props.value === props.name || (rootGroup && rootGroup.value === props.name))
    const onClick = () => {
      if (!props.disabled) {
        emit('input', props.name)
        if (rootGroup) {
          rootGroup.check(props.name)
        }
      }
    }
    return {
      isChecked,
      onClick,
    }
  },
}

</script>
