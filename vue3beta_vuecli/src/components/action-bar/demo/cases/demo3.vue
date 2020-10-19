<template>
  <div class="ui-example-child ui-example-child-action-bar ui-example-child-3">
    <ui-action-bar :actions="data" @click="onBtnClick">
      <span class="price">
        &yen;128.00<small>起</small>
      </span>
    </ui-action-bar>
  </div>
</template>

<script>
import {ActionBar, Dialog} from '@csii/vx-mobile'
import {reactive} from 'vue'

export default {
  name: 'action-bar-demo',
  /* DELETE */
  title: '使用插槽',
  titleEnUS: 'With slot',
  height: 150,
  /* DELETE */
  components: {
    [ActionBar.name]: ActionBar,
  },
  setup() {
    let data = reactive([
      {
        text: '主要按钮',
        round: true,
      },
    ])
    const onBtnClick = (event, action) => {
      action.loading = true
      action.inactive = true
      Dialog.alert({
        content: `${action.text}点击`,
        onConfirm: () => {
          action.loading = false
          action.inactive = false
        },
      })
    }
    return {
      onBtnClick,
      data,
    }
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

