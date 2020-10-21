<template>
  <div class="ui-example-child ui-example-child-popup ui-example-child-popup-0">
    <ui-button @click="showPopUp('center')">屏幕中弹出</ui-button>
    <ui-popup v-model="isPopupShow.center">
      <div class="ui-example-popup ui-example-popup-center">
        Popup Center
      </div>
    </ui-popup>

    <ui-button @click="showPopUp('bottom')">底部弹出</ui-button>
    <ui-popup
      v-model="isPopupShow.bottom"
      position="bottom"
    >
      <ui-popup-title-bar
        title="Popup Title"
        describe="Popup Description"
        ok-text="ok"
        cancel-text="cancel"
        large-radius
        @confirm="hidePopUp('bottom')"
        @cancel="hidePopUp('bottom')"
      ></ui-popup-title-bar>
      <div class="ui-example-popup ui-example-popup-bottom">
        Popup Bottom
      </div>
    </ui-popup>

    <ui-button @click="showPopUp('top')">顶部弹出</ui-button>
    <ui-popup
      v-model="isPopupShow.top"
      :hasMask="false"
      position="top"
    >
      <div class="ui-example-popup ui-example-popup-top">
        Popup Top
        <ui-icon
          name="close"
          @click.enter="hidePopUp('top')"
        ></ui-icon>
      </div>
    </ui-popup>

    <ui-button @click="showPopUp('left')">左侧弹出</ui-button>
    <ui-popup
      v-model="isPopupShow.left"
      position="left"
    >
      <div class="ui-example-popup ui-example-popup-left">
        Popup Left
      </div>
    </ui-popup>

    <ui-button @click="showPopUp('right')">右侧弹出</ui-button>
    <ui-popup
      v-model="isPopupShow.right"
      position="right"
    >
      <div class="ui-example-popup ui-example-popup-right">
        Popup Right
      </div>
    </ui-popup>
  </div>
</template>

<script>
import {reactive, set} from 'vue'
import {Popup, PopupTitleBar, Button, Icon} from '@csii/vx-mobile'

export default {
  name: 'popup-demo',
  /* DELETE */
  title: '不同位置',
  titleEnUS: 'Different positions',
  /* DELETE */
  components: {
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
  setup() {
    let isPopupShow = reactive({})
    const showPopUp = type => {
      set(isPopupShow, type, true)
    }
    const hidePopUp = type => {
      set(isPopupShow, type, false)
    }
    return {
      isPopupShow,
      showPopUp,
      hidePopUp,
    }
  },
}

</script>

<style lang="stylus">
.ui-example-child-popup-0
  float left
  width 100%
  .ui-button
    margin-bottom 20px
  .ui-example-popup
    position relative
    font-size 28px
    font-family DINPro
    font-weight 500
    box-sizing border-box
    text-align center
    background-color #FFF
  .ui-example-popup-center
    padding 50px
    border-radius radius-normal
  .ui-example-popup-top
    width 100%
    height 75px
    line-height 75px
    background #4a4c5b
    color #fff
    .ui-icon
      position absolute
      right 20px
      top 50%
      transform translateY(-50%)
  .ui-example-popup-bottom
    width 100%
    padding 100px 0
    p
      line-height 50px
  .ui-example-popup-left, .ui-example-popup-right
    height 100%
    padding 0 150px
    display flex
    align-items center
</style>
