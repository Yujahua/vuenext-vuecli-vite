<template>
  <div class="ui-example-child ui-example-child-action-bar ui-example-child-0">
    <ui-action-bar :actions="data"></ui-action-bar>
  </div>
</template>

<script>import {ActionBar, Toast} from '@csii/vx-mobile'

export default {
  name: 'action-bar-demo',
  components: {
    [ActionBar.name]: ActionBar,
  },
  data() {
    return {
      data: [
        {
          text: '主要按钮',
          onClick: this.handleClick,
        },
      ],
    }
  },
  methods: {
    handleClick() {
      Toast.succeed('Click')
    },
  },
}
</script>
