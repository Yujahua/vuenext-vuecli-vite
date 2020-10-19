<template>
  <ui-field-item
    class="ui-input-item"
    :class="[
      isHighlight ? 'is-highlight' : '',
      isTitleLatent ? 'is-title-latent' : '',
      isInputActive ? 'is-active' : '',
      isInputFocus ? 'is-focus' : '',
      isInputError() ? 'is-error' : '',
      isInputBrief() && !isInputError() ? 'with-brief' : '',
      isDisabled ? 'is-disabled': '',
      isAmount ? 'is-amount': '',
      clearable ? 'is-clear' : '',
      align,
      size
    ]"
    :title="title"
    :solid="solid && !isTitleLatent"
  >
    <template slot="left">
      <slot name="left"></slot>
    </template>
    <!-- ------------ -->
    <!--    INPUT     -->
    <!-- ------------ -->
    <!-- Native Input -->
    <template v-if="!isVirtualKeyboard">
      <input
        class="ui-input-item-input"
        :type="inputType"
        :name="name"
        v-model="inputBindValue"
        :placeholder="inputPlaceholder"
        :disabled="isDisabled"
        :readonly="readonly"
        :maxlength="isInputFormative ? '' : maxlength"
        autocomplete="off"
        @focus="onFocus"
        @blur="onBlur"
        @keyup="onKeyup"
        @keydown="onKeydown"
        @input="onInput"
      />
    </template>
    <!-- Fake Input -->
    <template v-else>
      <div
        class="ui-input-item-fake"
        :class="{
          'is-focus': isInputFocus,
          'is-waiting': !isInputEditing,
          'disabled': isDisabled,
          'readonly': readonly
        }"
        @click="onFakeInputClick"
      >
        <span v-text="inputValue"></span>
        <span
          class="ui-input-item-fake-placeholder"
          v-if="inputValue === '' && inputPlaceholder !== ''"
          v-text="inputPlaceholder"></span>
      </div>
    </template>

    <template slot="right">
      <!-- ------------ -->
      <!--  CLEART BTN  -->
      <!-- ------------ -->
      <div
        class="ui-input-item-clear"
        v-if="clearable && !isDisabled && !readonly"
        v-show="!isInputEmpty && isInputFocus"
        @click="clearInput"
      >
        <ui-icon name="clear"></ui-icon>
      </div>

      <!-- ------------ -->
      <!--  RIGHT SLOT  -->
      <!-- ------------ -->
      <slot name="right"></slot>
    </template>

    <template slot="children">
      <!-- -------------------- -->
      <!-- BRIEF/ERROR TIP -->
      <!-- -------------------- -->
      <div
        v-if="isInputError()"
        class="ui-input-item-msg"
      >
        <p v-if="error !== ''" v-text="error"></p>
        <slot name="error" v-else></slot>
      </div>
      <div
        v-if="isInputBrief() && !isInputError()"
        class="ui-input-item-brief"
      >
        <p v-if="brief !== ''" v-text="brief"></p>
        <slot name="brief" v-else></slot>
      </div>
      <!-- ------------ -->
      <!--   KEYBORARD  -->
      <!-- ------------ -->
      <ui-number-keyboard
        v-if="isVirtualKeyboard && !virtualKeyboardVm"
        ref="number-keyboard"
        :id="`${name}-number-keyboard`"
        class="ui-input-item-number-keyboard"
        :ok-text="virtualKeyboardOkText"
        :disorder="virtualKeyboardDisorder"
      ></ui-number-keyboard>
    </template>
  </ui-field-item>
</template>

<script>
import {
  reactive,
  toRefs,
  computed,
  inject,
  watch,
  onMounted,
  nextTick,
  getCurrentInstance,
  onBeforeUnmount,
} from 'vue'
import Icon from '../icon'
import FieldItem from '../field-item'
import NumberKeyboard from '../number-keyboard'
import {getCursorsPosition, setCursorsPosition} from './cursor'
import {noop, randomId, debounce} from '../_util'
import {formatValueByGapRule, formatValueByGapStep, trimValue} from '../_util/formate-value'

export default {
  name: 'ui-input-item',

  components: {
    [Icon.name]: Icon,
    [FieldItem.name]: FieldItem,
    [NumberKeyboard.name]: NumberKeyboard,
  },

  props: {
    type: {
      // text, bankCard, password, phone, money, digit
      type: String,
      default: 'text',
    },
    previewType: {
      type: String,
      default: '',
    },
    name: {
      type: [String, Number],
      default() {
        return randomId('input-item')
      },
    },
    title: {
      type: String,
      default: '',
    },
    brief: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    maxlength: {
      type: [String, Number],
      default: '',
    },
    size: {
      // large, normal
      type: String,
      default: 'normal',
    },
    align: {
      // left, center, right
      type: String,
      default: 'left',
    },
    error: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    solid: {
      type: Boolean,
      default: true,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    isVirtualKeyboard: {
      type: Boolean,
      default: false,
    },
    virtualKeyboardDisorder: {
      type: Boolean,
    },
    virtualKeyboardOkText: {
      type: String,
    },
    virtualKeyboardVm: {
      type: [Object, String],
      default: null,
    },
    isTitleLatent: {
      type: Boolean,
      default: false,
    },
    isFormative: {
      type: Boolean,
      default: false,
    },
    isHighlight: {
      type: Boolean,
      default: false,
    },
    isAmount: {
      type: Boolean,
      default: false,
    },
    formation: {
      type: Function,
      default: noop,
    },
  },
  setup(props, {emit, refs, slots}) {
    const state = reactive({
      inputValue: '',
      inputBindValue: '',
      inputNumberKeyboard: '',
      isInputFocus: false,
      isInputEditing: false,
      isPreview: false,
    })
    const that = getCurrentInstance()
    const inputItemType = computed(() => (state.isPreview ? props.previewType : props.type) || 'text')
    const inputType = computed(() => {
      let inputType = inputItemType.value || 'text'
      if (inputType === 'bankCard' || inputType === 'phone' || inputType === 'digit') {
        inputType = 'tel'
      } else if (inputType === 'money') {
        inputType = 'text'
      }
      return inputType
    })
    const inputMaxLength = computed(() => {
      if (inputItemType.value === 'phone') {
        return 11
      } else {
        return props.maxlength
      }
    })
    const isInputEmpty = computed(() => !state.inputValue.length)
    const isInputActive = computed(() => !isInputEmpty.value || state.isInputFocus)
    const inputPlaceholder = computed(() => (props.isTitleLatent && isInputActive.value ? '' : props.placeholder))
    const isInputFormative = computed(() => {
      const type = inputItemType.value
      return props.isFormative || (type === 'bankCard' || type === 'phone' || type === 'money' || type === 'digit')
    })
    const rootField = inject('rootField', () => ({}))
    const isDisabled = computed(() => rootField.disabled || props.disabled)
    // 原trimValue
    const getTrimValue = val => {
      return trimValue(val, '\\s|,')
    }
    const subValue = val => {
      const len = inputMaxLength.value
      if (len !== '') {
        return val.substring(0, len)
      } else {
        return val
      }
    }
    const formateValue = (curValue, curPos = 0) => {
      const type = inputItemType.value
      const name = props.name
      const oldValue = state.inputValue
      const isAdd = oldValue.length > curValue.length ? -1 : 1

      let formateValue = {value: curValue, range: curPos}

      // no format
      if (!isInputFormative.value || curValue === '') {
        return formateValue
      }

      // custom format by user
      const customValue = props.formation(name, curValue, curPos)

      if (customValue) {
        return customValue
      }

      // default format by component
      let gap = ' '
      switch (type) {
        case 'bankCard':
          curValue = subValue(trimValue(curValue.replace(/\D/g, '')))
          formateValue = formatValueByGapStep(4, curValue, gap, 'left', curPos, isAdd, oldValue)
          break
        case 'phone':
          curValue = subValue(trimValue(curValue.replace(/\D/g, '')))
          formateValue = formatValueByGapRule('3|4|4', curValue, gap, curPos, isAdd)
          break
        case 'money':
          gap = ','
          curValue = subValue(trimValue(curValue.replace(/[^\d.]/g, '')))
          // curValue = curValue.replace(/\D/g, '')
          const dotPos = curValue.indexOf('.')
          // format if no dot or new add dot or insert befor dot
          const moneyCurValue = curValue.split('.')[0]
          const moneyCurDecimal = ~dotPos ? `.${curValue.split('.')[1]}` : ''

          formateValue = formatValueByGapStep(
            3,
            trimValue(moneyCurValue, gap),
            gap,
            'right',
            curPos,
            isAdd,
            oldValue.split('.')[0],
          )
          formateValue.value += moneyCurDecimal
          break
        case 'digit':
          curValue = subValue(trimValue(curValue.replace(/\D/g, '')))
          formateValue.value = curValue
          break
        /* istanbul ignore next */
        default:
          break
      }

      return formateValue
    }

    const blurFakeInput = () => {
      state.isInputFocus = false
      document.removeEventListener('click', blurFakeInput, false)
    }
    const removeBlurListener = () => {
      document.removeEventListener('click', blurFakeInput, false)
    }
    const addBlurListener = () => {
      document.addEventListener('click', blurFakeInput, false)
    }
    const focusFakeInput = () => {
      state.isInputFocus = true

      setTimeout(() => {
        addBlurListener()
      }, 0)
    }
    const onFakeInputClick = event => {
      if (isDisabled.value || props.readonly) {
        return
      }

      blurFakeInput()

      if (!state.isInputFocus) {
        focusFakeInput(event)
      }
    }
    const focus = () => {
      if (props.isVirtualKeyboard) {
        onFakeInputClick()
      } else {
        that.$el.querySelector('.ui-input-item-input').focus()
        setTimeout(() => {
          state.isInputFocus = true
        }, 200)
      }
    }
    const clearInput = () => {
      state.inputValue = ''
      !props.isTitleLatent && focus()
      state.isPreview = false
    }
    const stopPreview = () => {
      clearInput()
      emit('update:previewType', '')
    }
    const stopEditInput = debounce(function() {
      state.isInputEditing = false
    }, 500)
    const startEditInput = () => {
      state.isInputEditing = true
      stopEditInput()
    }
    const onNumberKeyBoardEnter = val => {
      if (state.isPreview) {
        stopPreview()
      }
      if (inputMaxLength.value > 0 && getTrimValue(state.inputValue).length >= inputMaxLength.value) {
        return
      }
      state.inputValue = formateValue(state.inputValue + val).value
      startEditInput()
    }
    const onNumberKeyBoardDelete = () => {
      const inputValue = state.inputValue
      if (inputValue === '') {
        return
      }
      state.inputValue = formateValue(inputValue.substring(0, inputValue.length - 1)).value
      startEditInput()
      if (state.isPreview) {
        stopPreview()
      }
    }
    const onNumberKeyBoardConfirm = () => {
      emit('confirm', props.name, state.inputValue)
    }
    const initNumberKeyBoard = () => {
      let keyboard =
        (typeof props.virtualKeyboardVm === 'object'
          ? props.virtualKeyboardVm
          : that.$vnode.context.$refs[props.virtualKeyboardVm]) || refs['number-keyboard']

      if (Array.isArray(keyboard)) {
        keyboard = keyboard[0]
      }

      keyboard.$on('enter', onNumberKeyBoardEnter)
      keyboard.$on('delete', onNumberKeyBoardDelete)
      keyboard.$on('confirm', onNumberKeyBoardConfirm)
      state.inputNumberKeyboard = keyboard
      document.body.appendChild(keyboard.$el)
    }

    onMounted(() => {
      state.inputValue = formateValue(subValue(props.value + '')).value // created
      props.isVirtualKeyboard &&
        nextTick(() => {
          initNumberKeyBoard()
        })
    })
    onBeforeUnmount(() => {
      const keyboard = state.inputNumberKeyboard
      if (keyboard && keyboard.$el && keyboard.$el.parentElement === document.body) {
        document.body.removeChild(keyboard.$el)
      }
    })
    watch(
      () => props.value,
      val => {
        // Filter out two-way binding
        if (val !== getTrimValue(state.inputValue)) {
          state.inputValue = formateValue(subValue(val + '')).value
        }
      },
    )
    watch(
      () => props.previewType,
      val => {
        state.isPreview = !!val
      },
      {immediate: true},
    )
    watch(
      () => state.inputValue,
      val => {
        state.inputBindValue = val
        val = isInputFormative.value ? getTrimValue(val) : val
        if (val !== props.value) {
          emit('input', val)
          emit('change', props.name, val)
        }
      },
    )
    watch(
      () => state.isInputFocus,
      val => {
        if (!props.isVirtualKeyboard || !state.inputNumberKeyboard) {
          return
        }
        if (val) {
          state.inputNumberKeyboard.show()
          emit('focus', props.name)
        } else {
          state.inputNumberKeyboard.hide()
          emit('blur', props.name)
        }
      },
    )
    const isInputError = () => {
      // return slots.error || props.error !== ''
      return that.$slots.error || props.error !== ''
    }
    const isInputBrief = () => {
      return slots.brief || props.brief !== ''
    }
    const onInput = event => {
      const getFormateValue = formateValue(
        event.target.value,
        isInputFormative.value ? getCursorsPosition(event.target) : 0,
      )

      state.inputValue = getFormateValue.value
      state.inputBindValue = getFormateValue.value

      if (isInputFormative.value) {
        nextTick(() => {
          setCursorsPosition(event.target, getFormateValue.range)
        })
      }
    }
    const onKeyup = event => {
      emit('keyup', props.name, event)
      if (+event.keyCode === 13 || +event.keyCode === 108) {
        emit('confirm', props.name, state.inputValue)
      }
    }
    const onKeydown = event => {
      emit('keydown', props.name, event)
      if (!(+event.keyCode === 13 || +event.keyCode === 108)) {
        startEditInput()
        state.isPreview && stopPreview()
      }
    }
    const onFocus = () => {
      state.isInputFocus = true
      emit('focus', props.name)
    }
    const onBlur = () => {
      setTimeout(() => {
        state.isInputFocus = false
        emit('blur', props.name)
      }, 100)
    }
    const blur = () => {
      if (props.isVirtualKeyboard) {
        blurFakeInput()
      } else {
        that.$el.querySelector('.ui-input-item-input').blur()
        state.isInputFocus = false
      }
    }
    const getValue = () => {
      return state.inputValue
    }
    return {
      ...toRefs(state),
      inputItemType,
      inputType,
      inputMaxLength,
      isInputEmpty,
      isInputActive,
      inputPlaceholder,
      isInputFormative,
      rootField,
      isDisabled,
      getTrimValue,
      formateValue,
      subValue,
      initNumberKeyBoard,
      stopPreview,
      onNumberKeyBoardEnter,
      onNumberKeyBoardDelete,
      onNumberKeyBoardConfirm,
      clearInput,
      focus,
      onFakeInputClick,
      blurFakeInput,
      removeBlurListener,
      focusFakeInput,
      addBlurListener,
      startEditInput,
      stopEditInput,
      isInputError,
      isInputBrief,
      onInput,
      onKeyup,
      onKeydown,
      onFocus,
      onBlur,
      blur,
      getValue,
    }
  },
}

</script>

<style lang="stylus">
.ui-input-item
  .ui-field-item-content
    padding-top 0
    padding-bottom 0
  .ui-field-item-control
    display flex
    align-items center

.ui-input-item-clear
  padding 10px 0
  color input-item-icon
  .ui-icon
    display flex
    background color-bg-base
    border-radius radius-circle

.ui-input-item-input,
.ui-input-item-fake
  // display flex
  width 100%
  height input-item-height
  color input-item-color
  font-size input-item-font-size
  font-weight input-item-font-weight
  font-family font-family-normal
  line-height 1
  -webkit-appearance none
  border none
  background transparent
  outline none
  box-sizing border-box
  -webkit-tap-highlight-color transparent
  appearance none

.ui-input-item-input
  &:disabled, &[disabled]
    opacity 1
  &::-webkit-input-placeholder
    color input-item-placeholder
    font-weight font-weight-normal
  &::-webkit-outer-spin-button, &::-webkit-inner-spin-button
    -webkit-appearance none

.ui-input-item-fake
  line-height input-item-height
  word-ellipsis()
  cursor text
  &::after
    position relative
    z-index 2
    display none
    content " "
    height input-item-font-size-large
    border-right solid 1.5px color-text-base
  &.is-focus:after
    display inline
  &.is-waiting:after
    animation keyboard-cursor infinite 1s step-start

.ui-input-item-fake-placeholder
  position absolute
  top 0
  left 0
  width 100%
  color input-item-placeholder
  font-weight font-weight-normal

.ui-input-item-msg,
.ui-input-item-brief
  word-break()
  &:not(:last-child)
    margin-bottom 10px

.ui-input-item-brief
  font-size input-item-font-size-brief
  color input-item-color-brief

.ui-input-item-msg
  font-size input-item-font-size-error
  color input-item-color-error

.ui-input-item
  &.left
    .ui-input-item-input,
    .ui-input-item-fake
      text-align left

  &.center
    .ui-input-item-input,
    .ui-input-item-fake
      text-align center

  &.right
    .ui-input-item-input,
    .ui-input-item-fake
      text-align right

  &.is-title-latent
    .ui-field-item-title
      position absolute
      top 50%
      left 0
      height auto
      font-size input-item-title-latent-font-size
      color input-item-title-latent-color
      transform translate3d(0, -50%, 0)
      transition all .3s ease
      opacity 0
      will-change auto
    .ui-field-item-content
      min-height 115px
    .ui-field-item-content,
    .ui-field-item-left,
    .ui-field-item-right,
    .ui-input-item-input,
    .ui-input-item-fake
      padding-top 20px
    &.is-active
      .ui-field-item-title
        opacity 1
        top 20px
        transform translate3d(0, 0, 0)

  &.is-highlight
    &.is-focus
      .ui-field-item-content
        hairline(bottom, input-item-color-highlight, 0, 4px)

  &.is-disabled
    .ui-input-item-input,
    .ui-input-item-fake,
    .ui-input-item-fake-placeholder
      -webkit-text-fill-color input-item-color-disabled
      color input-item-color-disabled

  &.is-amount
    .ui-input-item-input,
    .ui-input-item-fake
      font-family font-family-number
    &.large
      .ui-input-item-input,
      .ui-input-item-fake
        padding-top v-gap-xs

  &.large
    .ui-input-item-input,
    .ui-input-item-fake
      padding-bottom 15px
      font-size input-item-font-size-large
    .ui-input-item-input::-webkit-input-placeholder
        font-size 60px
        line-height 100px

  &.is-error
    .ui-field-item-content
      hairline(bottom, input-item-color-error, 0, 4px)

  &.is-ios
    .ui-input-item-input::-webkit-input-placeholder
      position relative
      top 3px
      overflow visible
    .ui-input-item-fake::after
      border-right solid 6px #2C6CF5
      border-radius 2px
  &.is-android
    .ui-input-item-fake::after
      border-right solid 4px color-text-base
    .ui-input-item-input,
    .ui-input-item-fake
      font-weight input-item-font-weight-android

@-webkit-keyframes keyboard-cursor
  0%
    opacity 1
  50%
    opacity 0
  to
    opacity 1
@keyframes keyboard-cursor
  0%
    opacity 1
  50%
    opacity 0
  to
    opacity 1
</style>
