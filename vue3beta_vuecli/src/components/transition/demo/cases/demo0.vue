<template>
  <div class="ui-example-child ui-example-child-transition ui-example-child-transition-1">
    <ui-button @click="showPopUp(0)">Fade</ui-button>
    <ui-popup
      v-model="isPopupShow[0]"
      transition="ui-fade"
    >
      <div class="ui-example-popup ui-example-popup-center">
        Fade
      </div>
    </ui-popup>

    <ui-button @click="showPopUp(1)">Fade Up</ui-button>
    <ui-popup
      v-model="isPopupShow[1]"
      transition="ui-fade-up"
    >
      <div class="ui-example-popup ui-example-popup-center">
        Fade Up
      </div>
    </ui-popup>

    <ui-button @click="showPopUp(2)">Fade Down</ui-button>
    <ui-popup
      v-model="isPopupShow[2]"
      transition="ui-fade-down"
    >
      <div class="ui-example-popup ui-example-popup-center">
        Fade Down
      </div>
    </ui-popup>

    <ui-button @click="showPopUp(3)">Fade Left</ui-button>
    <ui-popup
      v-model="isPopupShow[3]"
      transition="ui-fade-left"
    >
      <div class="ui-example-popup ui-example-popup-center">
        Fade Left
      </div>
    </ui-popup>

    <ui-button @click="showPopUp(4)">Fade Right</ui-button>
    <ui-popup
      v-model="isPopupShow[4]"
      transition="ui-fade-right"
    >
      <div class="ui-example-popup ui-example-popup-center">
        Fade Right
      </div>
    </ui-popup>

    <ui-button @click="showPopUp(5)">Bounce</ui-button>
    <ui-popup
      v-model="isPopupShow[5]"
      transition="ui-bounce"
    >
      <div class="ui-example-popup ui-example-popup-center">
        Bounce
      </div>
    </ui-popup>

    <ui-button @click="showPopUp(6)">Punch</ui-button>
    <ui-popup
      v-model="isPopupShow[6]"
      transition="ui-punch"
    >
      <div class="ui-example-popup ui-example-popup-center">
        Punch
      </div>
    </ui-popup>

    <ui-button @click="showPopUp(7)">Zoom</ui-button>
    <ui-popup
      v-model="isPopupShow[7]"
      transition="ui-zoom"
    >
      <div class="ui-example-popup ui-example-popup-center">
        Zoom
      </div>
    </ui-popup>

    <ui-button @click="showPopUp(8)">Slide Up</ui-button>
    <ui-popup
      v-model="isPopupShow[8]"
      transition="ui-slide-up"
    >
      <div class="ui-example-popup ui-example-popup-center">
        Slide Up
      </div>
    </ui-popup>

    <ui-button @click="showPopUp(9)">Slide Down</ui-button>
    <ui-popup
      v-model="isPopupShow[9]"
      transition="ui-slide-down"
    >
      <div class="ui-example-popup ui-example-popup-center">
        Slide Down
      </div>
    </ui-popup>

    <ui-button @click="showPopUp(10)">Slide Left</ui-button>
    <ui-popup
      v-model="isPopupShow[10]"
      transition="ui-slide-left"
    >
      <div class="ui-example-popup ui-example-popup-center">
        Slide Left
      </div>
    </ui-popup>

    <ui-button @click="showPopUp(11)">Slide Right</ui-button>
    <ui-popup
      v-model="isPopupShow[11]"
      transition="ui-slide-right"
    >
      <div class="ui-example-popup ui-example-popup-center">
        Slide Right
      </div>
    </ui-popup>
  </div>
</template>

<script>
import {Popup, Button} from '@csii/vx-mobile'
import {reactive, set} from 'vue'

export default {
  name: 'transition-demo',
  /* DELETE */
  title: '动画',
  titleEnUS: 'Transition',
  /* DELETE */
  components: {
    [Popup.name]: Popup,
    [Button.name]: Button,
  },
  setup() {
    let isPopupShow = reactive([])
    const showPopUp = type => {
      // isPopupShow[type] = true
      set(isPopupShow, type, true)
    }
    return {
      isPopupShow,
      showPopUp,
    }
  },
}

</script>

<style lang="stylus">
.ui-example-child-transition-1
  float left
  width 100%
  .ui-button
    margin-bottom 20px
  .ui-example-popup
    position relative
    font-size 28px
    font-family DINAlternate-Bold
    font-weight 500
    box-sizing border-box
    text-align center
    background-color #FFF
  .ui-example-popup-center
    padding 50px
    border-radius radius-normal
</style>
