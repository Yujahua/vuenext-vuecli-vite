<template>
  <div class="ui-cashier-block-btn">
    <ui-button
      v-for="(action, index) in actions"
      :type="index === actions.length - 1 ? 'primary': 'default'"
      :inline="actions.length > 1"
      :key="index"
      v-html="action.buttonText"
      @click="() => {
        action.handler && action.handler()
      }"
    >
    </ui-button>
  </div>
</template>

<script>import Button from '../button'
export default {
  name: 'ui-cashier-channel-button',

  components: {
    [Button.name]: Button,
  },

  props: {
    actions: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
  },
}
</script>

<style lang="stylus">
.ui-cashier-block-btn
  display flex
  .ui-button
    flex 1
    margin-right h-gap-md
    &:last-of-type
      margin 0
</style>

