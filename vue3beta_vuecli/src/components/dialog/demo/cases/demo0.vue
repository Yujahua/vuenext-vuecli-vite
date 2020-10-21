<template>
  <div class="ui-example-child ui-example-child-dialog ui-example-child-dialog-0">
    <ui-button @click="basicDialog.open = true">基本</ui-button>
    <ui-button @click="iconDialog.open = true">带图标</ui-button>
    <ui-button @click="warnDialog.open = true">警示操作</ui-button>
    <ui-button @click="asyncDialog.open = true">异步操作</ui-button>
    <ui-button @click="actDialog.open = true">多操作</ui-button>
    <ui-button @click="slotDialog.open = true">插槽</ui-button>

    <ui-dialog
      title="窗口标题"
      :closable="true"
      v-model="basicDialog.open"
      :btns="basicDialog.btns"
    >
      人生的刺，就在这里，留恋着不肯快走的，偏是你所不留恋的东西。
    </ui-dialog>

    <ui-dialog
      icon="location"
      :closable="true"
      v-model="iconDialog.open"
      :btns="iconDialog.btns"
    >
      围在城里的人想逃出来，城外的人想冲进去，对婚姻也罢，职业也罢，人生的愿望大都如此。
    </ui-dialog>

    <ui-dialog
      title="警示操作"
      :closable="false"
      v-model="warnDialog.open"
      :btns="warnDialog.btns"
    >
      或是因为习惯了孤独，我们渴望被爱；又或是害怕爱而不得，我们最后仍然选择孤独。
    </ui-dialog>

    <ui-dialog
      :closable="false"
      v-model="asyncDialog.open"
      :btns="asyncDialog.btns"
    >
      每个人都有属于自己的一片森林，也许我们 从来不曾去过，但它一直在那里，总会在那里。迷失的人迷失了，相逢的人会再相逢。
    </ui-dialog>

    <ui-dialog
      title="窗口标题"
      :closable="false"
      layout="column"
      v-model="actDialog.open"
      :btns="actDialog.btns"
    >
      据说每个人需要一面镜子，可以常常自照，知道自己是个什么东西。不过，能自知的人根本不用照镜子；不自知的东西，照了镜子也没有用。
    </ui-dialog>

    <ui-dialog
      title="家"
      :closable="false"
      v-model="slotDialog.open"
      :btns="slotDialog.btns"
    >
      <solt name="header">
        <div class="dialog-banner">
        <img src="http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a" alt="">
      </div></solt>
      虽然其中有一些争吵、不愉快、曲折，但重要的是一家人整整齐齐。
    </ui-dialog>
  </div>
</template>

<script>
import {Dialog, Button, Toast} from '@csii/vx-mobile'
import {reactive, toRefs} from 'vue'

export default {
  name: 'dialog-demo',
  components: {
    [Dialog.name]: Dialog,
    [Button.name]: Button,
  },
  setup() {
    // 提前声明方法名，因为state和方法互相调用了，提前声明方法名，使eslint检查通过
    let onBasicConfirm, onBasicCancel, onIconConfirm, onActConfirm, onWarnConfirm, onAsyncConfirm
    let state = reactive({
      basicDialog: {
        open: false,
        btns: [
          {
            text: '取消',
            handler: onBasicCancel,
          },
          {
            text: '确认操作',
            handler: onBasicConfirm,
          },
        ],
      },
      iconDialog: {
        open: false,
        btns: [
          {
            text: '确认操作',
            handler: onIconConfirm,
          },
        ],
      },
      warnDialog: {
        open: false,
        btns: [
          {
            text: '取消',
          },
          {
            text: '警示操作',
            warning: true,
            handler: onWarnConfirm,
          },
        ],
      },
      asyncDialog: {
        open: false,
        btns: [
          {
            text: '开始搜索',
            icon: 'search',
            handler: onAsyncConfirm,
          },
        ],
      },
      actDialog: {
        open: false,
        btns: [
          {
            text: '操作一',
            type: 'danger',
            handler: onActConfirm,
          },
          {
            text: '操作二',
            handler: onActConfirm,
            disabled: true,
          },
          {
            text: '操作三',
            handler: onActConfirm,
          },
        ],
      },
      slotDialog: {
        open: false,
        btns: [
          {
            text: '好的',
          },
        ],
      },
    })
    onBasicConfirm = () => {
      Toast({
        content: '你点击了确认',
      })
      state.basicDialog.open = false
    }
    onBasicCancel = () => {
      Toast({
        content: '你点击了取消',
      })
      state.basicDialog.open = false
    }
    onIconConfirm = () => {
      Toast({
        content: '你点击了确认',
      })
      state.iconDialog.open = false
    }
    onActConfirm = () => {
      state.actDialog.open = false
    }
    onWarnConfirm = () => {
      state.warnDialog.open = false
    }

    onAsyncConfirm = btn => {
      btn.loading = true
      btn.text = '搜索中'
      setTimeout(() => {
        state.asyncDialog.open = false
        btn.loading = false
        btn.text = '开始搜索'
        Toast({
          content: '搜索成功',
        })
      }, 1500)
    }
    return {
      ...toRefs(state),
      onBasicConfirm,
      onBasicCancel,
      onIconConfirm,
      onActConfirm,
      onWarnConfirm,
      onAsyncConfirm,
    }
  },
}

</script>

<style lang="stylus" scoped>
.dialog-banner
  img
    display block
    width 100%
</style>
