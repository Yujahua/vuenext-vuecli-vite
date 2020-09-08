<template>
  <div class="ui-example-child ui-example-child-popup ui-example-child-popup-0">
    <ui-popup value>
      <div class="ui-example-popup ui-example-popup-center">
        Popup Center
      </div>
    </ui-popup>

]   <ui-popup value position="bottom">
      <ui-popup-title-bar
        title="Popup Title"
        describe="Popup Description"
        ok-text="ok"
        cancel-text="cancel"
      ></ui-popup-title-bar>
      <div class="ui-example-popup ui-example-popup-bottom">
        Popup Bottom
      </div>
    </ui-popup>

    <ui-popup
      value
      :hasMask="false"
      position="top"
    >
      <div class="ui-example-popup ui-example-popup-top">
        Popup Top
        <ui-icon
          name="close"
        ></ui-icon>
      </div>
    </ui-popup>

    <ui-popup
      value
      position="left"
    >
      <div class="ui-example-popup ui-example-popup-left">
        Popup Left
      </div>
    </ui-popup>

    <ui-popup
      value
      position="right"
    >
      <div class="ui-example-popup ui-example-popup-right">
        Popup Right
      </div>
    </ui-popup>
  </div>
</template>

<script>import {Popup, PopupTitleBar} from '@csii/vx-mobile'

export default {
  name: 'popup-demo',
  components: {
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
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
