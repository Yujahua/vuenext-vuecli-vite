<template>
  <div class="ui-captcha" v-show="isView || value || visible">
    <template v-if="isView">
      <div class="ui-captcha-content">
        <h2 class="ui-captcha-title" v-if="title" v-text="title"></h2>
        <div class="ui-captcha-message">
          <slot></slot>
        </div>
      </div>
      <ui-codebox
        ref="codebox"
        v-model="code"
        :maxlength="maxlength"
        :system="system"
        :mask="mask"
        @submit="onSubmit"
        :closable="false"
        :isView="true"
        :justify="true"
        :autofocus="false"
      >
        <footer class="ui-captcha-footer">
          <div class="ui-captcha-error" v-if="errorMsg" v-text="errorMsg"></div>
          <div class="ui-captcha-brief" v-else v-text="brief"></div>
          <button
            class="ui-captcha-btn"
            v-if="count"
            v-text="countBtnText"
            :disabled="this.isCounting"
            @click="onResend"
          ></button>
        </footer>
      </ui-codebox>
    </template>
    <template v-else>
      <ui-dialog
        :value="value"
        :closable="true"
        :appendTo="false"
        position="center"
        @input="onInput"
        @show="onShow"
        @hide="onHide"
      >
        <div class="ui-captcha-content">
          <h2 class="ui-captcha-title" v-if="title" v-text="title"></h2>
          <div class="ui-captcha-message">
            <slot></slot>
          </div>
        </div>
        <ui-codebox
          ref="codebox"
          v-model="code"
          :maxlength="maxlength"
          :system="system"
          :closable="false"
          :mask="mask"
          :justify="true"
          :autofocus="false"
          @submit="onSubmit"
        >
          <footer class="ui-captcha-footer">
            <div class="ui-captcha-error" v-if="errorMsg" v-text="errorMsg"></div>
            <div class="ui-captcha-brief" v-else v-text="brief"></div>
            <button
              class="ui-captcha-btn"
              v-if="count"
              v-text="countBtnText"
              :disabled="this.isCounting"
              @click="onResend"
            ></button>
          </footer>
        </ui-codebox>
      </ui-dialog>
    </template>
  </div>
</template>

<script>
import {ref, watch, onMounted, getCurrentInstance, onBeforeUnmount, nextTick} from 'vue'
import Dialog from '../dialog'
import Codebox from '../codebox'
import Button from '../button'
import {mdDocument} from '../_util'

export default {
  name: 'ui-captcha',

  components: {
    [Dialog.name]: Dialog,
    [Codebox.name]: Codebox,
    [Button.name]: Button,
  },

  props: {
    title: {
      type: String,
    },
    brief: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: [Number, String],
      default: 4,
    },
    mask: {
      type: Boolean,
      default: false,
    },
    system: {
      type: Boolean,
      default: false,
    },
    autoCountdown: {
      type: Boolean,
      default: true,
    },
    appendTo: {
      default: () => mdDocument.body,
    },
    count: {
      type: Number,
      default: 60,
    },
    countNormalText: {
      type: String,
      default: '发送验证码',
    },
    countActiveText: {
      type: String,
      default: '{$1}秒后重发',
    },
    isView: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const code = ref('')
    const visible = ref(false)
    const errorMsg = ref('')
    const isCounting = ref(false)
    const firstShown = ref(false)
    const countBtnText = ref(props.countNormalText)
    const __counter__ = ref(null)
    function resetcount() {
      isCounting.value = false
      countBtnText.value = props.countNormalText
      clearInterval(__counter__.value)
    }
    function countdown() {
      if (!props.count) {
        return
      }
      clearInterval(__counter__.value)
      const timestamp = Date.now()
      let i = props.count
      isCounting.value = true
      countBtnText.value = props.countActiveText.replace('{$1}', i)
      /* istanbul ignore next */
      __counter__.value = setInterval(() => {
        if (i <= 1) {
          resetcount()
        } else {
          i = props.count - Math.floor((Date.now() - timestamp) / 1000)
          countBtnText.value = props.countActiveText.replace('{$1}', i)
        }
      }, 1000)
    }
    const onResend = function() {
      if (props.autoCountdown) {
        countdown()
      }
      emit('send', countdown)
    }
    onMounted(() => {
      if (props.appendTo && !props.isView) {
        props.appendTo.appendChild(getCurrentInstance().$el)
      }
      if (props.value || props.isView) {
        firstShown.value = true
        onResend()
      }
    })

    onBeforeUnmount(() => {
      if (props.appendTo && !props.isView && props.appendTo.contains(getCurrentInstance().$el)) {
        props.appendTo.removeChild(getCurrentInstance().$el)
      }
    })
    watch(
      () => props.value,
      val => {
        if (val) {
          code.value = ''
          if (!firstShown.value) {
            firstShown.value = true
            onResend()
          }
        }
      },
    )
    watch(code, val => {
      if (val && errorMsg.value) {
        errorMsg.value = ''
      }
    })
    const onInput = function(val) {
      emit('input', val)
    }
    const codebox = ref(null)
    const onShow = function() {
      visible.value = true
      codebox.value.focus()
      emit('show')
    }
    const onHide = function() {
      visible.value = false
      codebox.value.blur()
      emit('hide')
    }
    const onSubmit = function(code) {
      emit('submit', code)
    }
    const setError = function(msg) {
      nextTick(() => {
        errorMsg.value = msg
        // this.code = ''
      })
    }
    return {
      code,
      visible,
      errorMsg,
      isCounting,
      countBtnText,
      onResend,
      onInput,
      onShow,
      onHide,
      onSubmit,
      setError,
      codebox,
    }
  },
}

</script>

<style lang="stylus">
.ui-captcha {
  .ui-dialog {
    .ui-popup {
      z-index: captcha-zindex;
    }

    .ui-dialog-body {
      padding: 60px 60px 30px 60px;
    }

    .ui-dialog-content {
      margin-bottom: number-keyboard-height;
    }
  }

  .ui-codebox {
    margin-bottom: 28px;
  }
}

.ui-captcha-content {
  font-size: captcha-font-size;
  color: captcha-color;
  text-align: center;
  line-height: 1.2;
  margin-bottom: 50px;
}

.ui-captcha-title {
  color: captcha-title-color;
  font-size: captcha-title-font-size;
  font-weight: normal;
  line-height: 1.15;
  margin: 0 0 16px 0;
}

.ui-captcha-footer {
  margin: 28px 0;
  display: flex;
  font-size: captcha-footer-font-size;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}

.ui-captcha-error, .ui-captcha-brief {
  flex: 1 1 0%;
}

.ui-captcha-error {
  color: captcha-error-color;
}

.ui-captcha-brief {
  color: captcha-brief-color;
}

.ui-captcha-btn {
  display: inline-block;
  color: captcha-btn-color;
  font-size: captcha-footer-font-size;
  padding: 0;
  margin: 0 0 0 12px;
  border: 0;
  border-radius: 0;
  background: none;

  &:disabled {
    color: color-text-disabled;
  }
}
</style>
