<template>
  <div class="ui-example-child ui-example-child-action-bar ui-example-child-3">
    <ui-action-bar :actions="data" @click="onBtnClick">
      <span class="price">&yen;128.00<small>起</small></span>
    </ui-action-bar>
  </div>
</template>

<script>import {ActionBar, Dialog} from '@csii/vx-mobile'

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
        },
      ],
    }
  },
  methods: {
    onBtnClick(event, action) {
      Dialog.alert({
        content: `${action.text}点击`,
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
.price
  font-weight 500
  font-size 48px
  color #FF823A
  small
    margin-left 10px
    font-size 32px
    color #858B9C
</style>

