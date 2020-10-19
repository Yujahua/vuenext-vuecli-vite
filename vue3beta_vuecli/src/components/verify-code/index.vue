<template>
  <div
    class="ui-verify-btn"
    :class="{'is-disabled': clickVerifyBtn}"
    @click="sendVerify"
    slot="right"
  >{{textTemp}}
  </div>
</template>

<script>
import {ref, watch} from 'vue'
export default {
  name: 'ui-verify-code',
  props: {
    text: {
      type: String,
      default: '获取验证码',
    },
    count: {
      type: Number,
      default: 60,
    },
    timerText: {
      type: String,
      default: '重新发送',
    },
  },
  setup(props) {
    const clickVerifyBtn = ref(false)
    const textTemp = ref(props.text)
    const countTemp = ref(props.count)
    const timerTextTemp = ref(props.timerText)
    const sendVerify = () => {
      if (!clickVerifyBtn.value) {
        clickVerifyBtn.value = true
        textTemp.value = `${timerTextTemp.value}(${countTemp.value})`
        let timer = setInterval(() => {
          if (countTemp.value <= 0) {
            textTemp.value = timerTextTemp.value
            clickVerifyBtn.value = false
            countTemp.value = props.count
            clearInterval(timer)
            return
          }
          countTemp.value--
          textTemp.value = `${timerTextTemp.value}(${countTemp.value})`
        }, 1000)
      }
    }
    watch(
      () => props.text,
      val => {
        textTemp.value = val
      },
    )
    watch(
      () => props.count,
      val => {
        countTemp.value = val
      },
    )
    watch(
      () => props.timerText,
      val => {
        props.timerText = val
      },
    )
    return {
      clickVerifyBtn,
      textTemp,
      countTemp,
      timerTextTemp,
      sendVerify,
    }
  },
}

</script>

<style lang="stylus">
.ui-verify-btn
  font-size 14px
  border 1px solid #cc444d
  color #cc444d
  border-radius 4px
  margin-left 5px
  width max-content
  padding 0 5px
  text-align center
  margin-right 10px

  &.is-disabled
    color #808591
    border 1px solid #808591

  .verify-msg > span
    color #ff9e00
</style>
