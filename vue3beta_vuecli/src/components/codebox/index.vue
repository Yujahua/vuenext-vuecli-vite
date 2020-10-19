<template>
  <div class="ui-codebox-wrapper">
    <div
      class="ui-codebox"
      :class="{
        'is-disabled': disabled,
        'is-justify': justify
      }"
      @click="focus"
    >
      <template v-if="maxlength > 0">
        <span
          v-for="i in num"
          :key="i"
          :class="[
            'ui-codebox-box',
            (i === code.length + 1) && focused && 'is-active',
            code.charAt(i-1) !== '' && 'is-filled'
          ]"
        >
          <template v-if="code.charAt(i-1)">
            <template v-if="mask">
              <i class="ui-codebox-dot"></i>
            </template>
            <template v-else>{{code.charAt(i-1)}}</template>
          </template>
          <template v-if="i === code.length + 1 && focused">
            <i class="ui-codebox-blink"></i>
          </template>
        </span>
      </template>
      <template v-else>
        <input
          v-if="mask"
          type="password"
          :maxlength="maxlength"
          :value="code"
          readonly
          disabled
          :class="['ui-codebox-holder', focused && 'is-active']"
        />
        <input
          v-else
          type="text"
          :maxlength="maxlength"
          :value="code"
          readonly
          disabled
          :class="['ui-codebox-holder', focused && 'is-active']"
        />
      </template>
    </div>
    <slot></slot>
    <form action v-show="system" @submit="onSubmit">
      <input
        :value="code"
        :type="mask ? 'password' : 'text'"
        :maxlength="maxlength"
        @input="onInputChange"
        ref="input"
        class="ui-codebox-input"
      />
    </form>
    <ui-number-keyboard
      v-show="!system"
      ref="keyboard"
      class="ui-codebox-keyboard"
      :type="maxlength > 0 ? 'simple' : 'professional'"
      :okText="okText"
      :disorder="disorder"
      :is-view="isView"
      v-model="focused"
      @delete="onDelete"
      @enter="onEnter"
      @confirm="onConfirm"
    ></ui-number-keyboard>
  </div>
</template>

<script>
import {
  ref,
  watchEffect,
  computed,
  onMounted,
  getCurrentInstance,
  nextTick,
  onBeforeUnmount,
} from 'vue'
import NumberKeyboard from '../number-keyboard'

export default {
  name: 'ui-codebox',
  components: {
    [NumberKeyboard.name]: NumberKeyboard,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    maxlength: {
      type: [Number, String],
      default: 4,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    justify: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    system: {
      type: Boolean,
      default: false,
    },
    okText: {
      type: String,
    },
    disorder: {
      type: Boolean,
      default: false,
    },
    isView: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const code = ref(0)
    const focused = ref(props.autofocus)
    watchEffect(() => {
      if (props.val !== code.value) {
        code.value = props.value
      }
    })
    const num = computed(() => Math.abs(parseInt(props.maxlength, 10)) || 1)
    const keyboard = ref(null)
    const el = ref(null)
    const handleOutClick = function(e) {
      if (!el.value.contains(e.target)) {
        focused.value = false
      }
    }

    onMounted(() => {
      el.value = getCurrentInstance().$el
      if (props.closable) {
        document.addEventListener('click', handleOutClick)
      }
      if (!props.system && !props.isView) {
        document.body.appendChild(keyboard.value.$el)
      }
    })
    const input = ref(null)
    const blur = function() {
      focused.value = false
      if (props.system) {
        input.value.blur()
      }
    }

    onBeforeUnmount(() => {
      if (props.closable) {
        document.removeEventListener('click', handleOutClick)
      }
      if (focused.value) {
        blur()
      }
      if (!props.system && !props.isView) {
        document.body.removeChild(keyboard.value.$el)
      }
    })
    const onInputChange = function(e) {
      if (props.maxlength < 0 || e.target.value.length <= props.maxlength) {
        code.value = e.target.value
      }

      if (code.value.length === props.maxlength) {
        emit('submit', code.value)
      }

      emit('input', code.value)
    }
    const onSubmit = function(e) {
      e.preventDefault()
      emit('submit', code.value)
    }
    const onEnter = function(val) {
      if ((props.maxlength < 0 || code.value.length < props.maxlength) && val !== '.') {
        code.value += val
      }

      if (code.value.length === props.maxlength) {
        nextTick(function() {
          emit('submit', code.value)
        })
      }

      emit('input', code.value)
    }
    const onDelete = function() {
      code.value = code.value.slice(0, code.value.length - 1)
      emit('input', code.value)
    }
    const onConfirm = function() {
      emit('submit', code.value)
    }
    const focus = function() {
      if (props.disabled) {
        return
      }

      focused.value = true
      if (props.system) {
        input.value.focus()
      }
    }
    return {
      keyboard,
      input,
      code,
      focused,
      num,
      onInputChange,
      onSubmit,
      onEnter,
      onDelete,
      onConfirm,
      focus,
      blur,
    }
  },
}

</script>

<style lang="stylus">
.ui-codebox-wrapper {
  .ui-codebox-input {
    position: absolute;
    left: -9999px;
    opacity: 0;
  }
}

.ui-codebox {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;

  &.is-justify {
    .ui-codebox-box {
      flex: 1 1 0%;
    }
  }
}

.ui-codebox-box {
  position: relative;
  flex: 0 1 codebox-width;
  width: codebox-width;
  height: codebox-height;
  display: flex;
  align-items: center;
  justify-content: center;
  color: codebox-color;
  font-family: font-family-number;
  font-size: codebox-font-size;
  font-weight: normal;
  line-height: 1.2;

  if (codebox-gutter is a 'unit') {
    margin-left: (codebox-gutter / 2);
    margin-right: (codebox-gutter / 2);
  } else {
    margin-left: 'calc(%s / 2)' % codebox-gutter;
    margin-right: 'calc(%s / 2)' % codebox-gutter;
  }

  hairline(bottom, color-border-element);

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  &.is-active, &.is-filled {
    border-color: codebox-border-active-color;
  }
}

.ui-codebox-blink {
  display: block;

  if (tab-height is a 'unit') {
    height: (codebox-height * 0.8);
  } else {
    height: 'calc(%s * 0.8)' % codebox-height;
  }

  width: 2px;
  background-color: codebox-blink-color;
  animation: ui-codebox-flash steps(2) 1s infinite;
}

.ui-codebox-dot {
  display: block;
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: codebox-dot-color;
}

.ui-codebox-holder {
  pointer-events: none;
  height: codebox-height;
  line-height: codebox-height;
  padding: 0 codebox-holder-space;
  width: 100%;
  text-align: center;
  font-size: codebox-font-size;
  outline: none;
  color: codebox-color;
  letter-spacing: 0.1em;
  border-radius: 0;
  border-style: solid;
  border-width: 0 0 codebox-border-width 0;
  border-color: codebox-border-color;
  background: none;
  box-shadow: none;
  box-sizing: border-box;
  -webkit-appearance: none;
  -webkit-text-fill-color: codebox-color;

  &[disabled], &[readonly] {
    opacity: 1;
    color: codebox-color;
    border-color: codebox-border-color;
  }

  &.is-active {
    border-color: codebox-border-active-color;
  }
}

.ui-codebox.is-disabled {
  .ui-codebox-box {
    color: codebox-disabled-color;
    border-color: codebox-disabled-color;
  }

  .ui-codebox-blink {
    display: none;
  }

  .ui-codebox-dot {
    background-color: codebox-disabled-color;
  }

  .ui-codebox-holder {
    color: codebox-disabled-color;
    border-color: codebox-disabled-color;
  }
}

@keyframes ui-codebox-flash {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>

