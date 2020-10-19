<template>
  <div class="ui-number-keyboard" :class="{'in-view': isView}">
    <template v-if="isView">
      <div class="ui-number-keyboard-slot" v-if="$slots.default">
        <slot></slot>
      </div>
      <ui-number-keyboard-container
        ref="keyborad"
        :type="type"
        :disorder="disorder"
        :ok-text="okText"
        :is-view="isView"
        :hide-dot="hideDot"
        :text-render="textRender"
        @enter="onEnter"
        @delete="onDelete"
        @confirm="onConfirm"
        @hide="isKeyboardShow = false"
      ></ui-number-keyboard-container>
    </template>
    <template v-else>
      <ui-popup
        ref="popup"
        v-model="isKeyboardShow"
        position="bottom"
        @show="$emit('show')" 
        @hide="$emit('hide')"
        :has-mask="false"
      >
        <div class="ui-number-keyboard-slot" v-if="$slots.default">
          <slot></slot>
        </div>
        <ui-number-keyboard-container
          ref="keyborad"
          :type="type"
          :disorder="disorder"
          :ok-text="okText"
          :is-view="isView"
          :hide-dot="hideDot"
          :text-render="textRender"
          @enter="onEnter"
          @delete="onDelete"
          @confirm="onConfirm"
          @hide="isKeyboardShow = false"
          @touchmove.native.prevent
        ></ui-number-keyboard-container>
      </ui-popup>
    </template>
  </div>
</template>

<script>
import {ref, watch, onMounted} from 'vue'
import Popup from '../popup'
import Keyborad from './board'

export default {
  name: 'ui-number-keyboard',

  components: {
    [Popup.name]: Popup,
    [Keyborad.name]: Keyborad,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    type: {
      // simple, professional
      type: String,
    },
    isView: {
      type: Boolean,
      default: false,
    },
    hideDot: {
      type: Boolean,
    },
    disorder: {
      type: Boolean,
    },
    isHideConfirm: {
      type: Boolean,
      default: true,
    },
    okText: {
      type: String,
    },
    textRender: {
      type: Function,
    },
  },
  setup(props, {emit}) {
    let isKeyboardShow = ref(false)
    onMounted(() => {
      props.value && (isKeyboardShow.value = props.value)
    })
    watch(
      () => props.value,
      val => {
        isKeyboardShow.value = val
      },
    )
    watch(isKeyboardShow, val => {
      emit('input', val)
    })
    // MARK: public methods
    const show = () => {
      /* istanbul ignore next */
      isKeyboardShow.value = true
    }
    const hide = () => {
      /* istanbul ignore next */
      isKeyboardShow.value = false
    }
    const onEnter = val => {
      emit('enter', val)
    }
    const onDelete = () => {
      emit('delete')
    }
    const onConfirm = () => {
      emit('confirm')
      props.isHideConfirm && hide()
    }
    return {
      isKeyboardShow,
      show,
      hide,
      onEnter,
      onDelete,
      onConfirm,
    }
  },
}

</script>

<style lang="stylus">
.ui-number-keyboard
  .ui-popup
    z-index number-keyboard-zindex
  .ui-popup-box
    padding-top 1px
    background-color color-bg-base
    padding-bottom constant(safe-area-inset-bottom)
</style>
