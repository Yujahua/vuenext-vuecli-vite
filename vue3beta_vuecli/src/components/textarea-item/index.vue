<template>
  <ui-field-item
    class="ui-textarea-item"
    :class="[
      isDisabled ? 'is-disabled' : '',
      errorInfo ? 'is-error' : ''
    ]"
    :title="title"
    :solid="solid"
  >
    <textarea
      class="ui-textarea-item__textarea"
      ref="textarea"
      v-model="inputValue"
      :disabled="isDisabled"
      :readonly="readonly"
      :maxlength="maxLength"
      :placeholder="placeholder"
      :rows="rows"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @keyup="onKeyup"
      @keydown="onKeydown"
    ></textarea>
    <slot name="footer"></slot>
    <template slot="children">
      <div v-if="errorInfo" class="ui-textarea-item-msg">
        <p>{{ errorInfo }}</p>
      </div>
    </template>
  </ui-field-item>
</template>
<script>
import {ref, computed, watch, onMounted, nextTick} from 'vue'
import FieldItem from '../field-item'

export default {
  name: 'ui-textarea-item',
  components: {
    [FieldItem.name]: FieldItem,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    maxLength: {
      type: [String, Number],
      default: '',
    },
    maxHeight: {
      type: [String, Number],
      default: '',
    },
    solid: {
      type: Boolean,
      default: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: [String, Number],
      default: '3',
    },
    autosize: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      defalut: '',
    },
  },
  setup(props, {refs, emit}) {
    const maxHeightInner = ref(props.maxHeight)
    const inputValue = ref(props.value)
    const isDisabled = computed(() => props.disabled)
    const errorInfo = computed(() => props.error)
    const calcTextareaHeight = textarea => {
      // Triggers the textarea to repaint
      textarea.style.height = 'auto'

      let scrollHeight = textarea.scrollHeight
      if (maxHeightInner.value && scrollHeight > maxHeightInner.value) {
        scrollHeight = maxHeightInner.value
      }

      textarea.style.height = scrollHeight + 'px'
    }
    const resizeTextarea = () => {
      if (props.autosize) {
        calcTextareaHeight(refs.textarea)
      }
    }
    watch(
      () => props.value,
      val => {
        inputValue.value = val
        resizeTextarea()
      },
    )
    watch(inputValue, val => {
      emit('input', val)
      emit('change', val)
    })
    watch(
      () => props.maxHeight,
      val => {
        maxHeightInner.value = val
        resizeTextarea()
      },
    )
    onMounted(() => {
      resizeTextarea()
    })
    const onInput = event => {
      inputValue.value = event.target.value

      nextTick(() => {
        resizeTextarea()
      })
    }
    const onKeyup = event => {
      emit('keyup', event)
    }
    const onKeydown = event => {
      emit('keydown', event)
    }
    const onFocus = () => {
      emit('focus')
    }
    const onBlur = () => {
      setTimeout(() => {
        emit('blur')
      }, 100)
    }
    const focus = () => {
      refs.textarea.focus()
    }
    const blur = () => {
      refs.textarea.blur()
    }
    const getValue = () => {
      return inputValue.value
    }
    return {
      maxHeightInner,
      inputValue,
      isDisabled,
      errorInfo,
      resizeTextarea,
      calcTextareaHeight,
      onInput,
      onKeyup,
      onKeydown,
      onFocus,
      onBlur,
      focus,
      blur,
      getValue,
    }
  },
}

</script>
<style lang="stylus">
.ui-textarea-item
  &-msg
    color textarea-item-color-error
  .ui-field-item-content
    align-items normal
  &.is-disabled
    .ui-textarea-item__textarea
      -webkit-text-fill-color textarea-item-color-disabled
      color textarea-item-color-disabled
  &__textarea
    color textarea-item-color
    font-weight textarea-item-font-weight
    width 100%
    -webkit-appearance none
    border none
    background transparent
    outline none
    resize none
    box-sizing border-box
    -webkit-tap-highlight-color transparent
    appearance none
    line-height textarea-item-line-height
    font-size textarea-item-font-size
    &::-webkit-input-placeholder
      color textarea-item-placeholder-color
      font-weight textarea-item-placeholder-weight
  &.is-error
    .ui-field-item-content
      hairline(bottom, textarea-item-color-error, 0, 4px)
</style>
