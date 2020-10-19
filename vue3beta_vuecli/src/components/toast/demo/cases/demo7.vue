<template>
  <div class="ui-example-child ui-example-child-toast ui-example-child-toast-7">
    <ui-toast ref="toast">
      <ui-activity-indicator
        :size="20"
        :text-size="16"
        color="yellow"
        text-color="white"
      >loading...</ui-activity-indicator>
    </ui-toast>
    <ui-button @click="showTextToast">定制Toast</ui-button>
  </div>
</template>

<script>
import {ref} from 'vue'
import {Toast, Button, ActivityIndicator} from '@csii/vx-mobile'

export default {
  name: 'toast-demo',
  /* DELETE */
  title: '定制Toast',
  titleEnUS: 'Customize toast',
  /* DELETE */
  components: {
    [Toast.component.name]: Toast.component,
    [Button.name]: Button,
    [ActivityIndicator.name]: ActivityIndicator,
  },
  setup(props, {refs}) {
    let isShow = ref(false)
    const showTextToast = () => {
      if (isShow.value) {
        refs.toast.hide()
        isShow.value = false
      } else {
        refs.toast.show()
        isShow.value = true
      }
    }
    return {
      isShow,
      showTextToast,
    }
  },
}

</script>
