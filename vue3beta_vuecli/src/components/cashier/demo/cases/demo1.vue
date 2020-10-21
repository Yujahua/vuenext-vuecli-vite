<template>
  <div class="ui-example-child ui-example-child-cashier">
    <ui-button @click="isCashierhow = !isCashierhow">{{ isCashierhow ? '收起收银台' : '唤起收银台' }}</ui-button>
    <ui-cashier
      ref="cashier"
      v-model="isCashierhow"
      :channels="cashierChannels"
      :payment-amount="cashierAmount"
      payment-describe="关于支付金额的特殊说明"
      large-radius
      @show="onCashierShow"
      @select="onCashierSelect"
      @pay="onCashierPay"
      @cancel="onCashierCancel"
    >
      <template v-slot:header="{ scene }">
        <ui-notice-bar
          v-if="scene === 'choose'"
          mode="closable"
          icon="warn"
          type="warning"
        >
          该银行3:00-12:00系统维护，请更换其他银行卡
        </ui-notice-bar>
      </template>
      <template v-slot:footer="{ scene }">
        <div v-if="scene === 'choose' && !isCashierInitialed" class="cashier-loading">
          <ui-activity-indicator :size="30" vertical>加载中...</ui-activity-indicator>
        </div>
      </template>
      <template v-slot:payButton style="display:flex;">
        <ui-icon name="checked"></ui-icon>发起支付
      </template>
      <template v-slot:scene class="custom-scene">
        Custom Scene
      </template>
    </ui-cashier>
	</div>
</template>

<script>
import {ref, reactive} from 'vue'
import {Button, Icon, Cashier, Toast, ActivityIndicator, NoticeBar} from '@csii/vx-mobile'

export default {
  name: 'cashier-demo',
  /* DELETE */
  height: 700,
  title: '使用插槽及其他配置',
  titleEnUS: 'Using slots and other configurations',
  /* DELETE */
  components: {
    [Button.name]: Button,
    [Cashier.name]: Cashier,
    [Icon.name]: Icon,
    [NoticeBar.name]: NoticeBar,
    [ActivityIndicator.name]: ActivityIndicator,
  },
  setup() {
    const isCashierhow = ref(false)
    const isCashierInitialed = ref(false)
    const isCashierCaptcha = ref(false)
    const cashierAmount = ref('100.00')
    const cashierResult = ref('success')
    const cashierResults = reactive([
      {
        text: '支付成功',
        value: 'success',
      },
      {
        text: '支付失败',
        value: 'fail',
      },
    ])
    const cashierChannels = reactive([
      {
        img: 'https://pt-starimg.didistatic.com/static/starimg/img/rZBbFoIJEJ1546934427562.png',
        text: 'XX银行(1234)',
        desc: '当前银行维护中',
        value: '001',
        disabled: true,
        action: {
          text: '更换',
          handler: () => {
            Toast.info('点击更换银行卡')
          },
        },
      },
    ])
    const cashier = ref(null)
    const timer = ref(null)
    const createPay = () => {
      cashier.value.next('loading')
      return new Promise(resolve => {
        timer.value = setTimeout(() => {
          resolve()
        }, 3000)
      })
    }
    // Create a captcha sending request
    const sendCaptcha = () => {
      return new Promise(resolve => {
        timer.value = setTimeout(() => {
          resolve()
        }, 200)
      })
    }
    // Create a captcha checking request
    const checkCaptcha = code => {
      return new Promise(resolve => {
        timer.value = setTimeout(() => {
          resolve(!!code)
        }, 200)
      })
    }
    const onCashierShow = () => {
      setTimeout(() => {
        isCashierInitialed.value = true
      }, 2000)
    }
    const doPay = () => {
      if (isCashierCaptcha.value) {
        cashier.value.next('captcha', {
          text: 'Verification code sent to 156 **** 8965',
          autoCountdown: false,
          countNormalText: 'Send Verification code',
          countActiveText: 'Retransmission after {$1}s',
          onSend: countdown => {
            console.log('[CSII VX Mobile] Send Captcha')
            sendCaptcha().then(() => {
              countdown()
            })
          },
          onSubmit: code => {
            console.log(`[CSII VX Mobile] Send Submit ${code}`)
            checkCaptcha(code).then(res => {
              if (res) {
                createPay().then(() => {
                  cashier.value.next(cashierResult.value)
                })
              }
            })
          },
        })
      } else {
        createPay().then(() => {
          cashier.value.next(cashierResult.value, {
            actions: [
              {
                buttonText: '返回',
                handler: () => {
                  cashier.value.next('choose')
                },
              },
              {
                buttonText: '重试',
                handler: () => {
                  cashier.value.next('custom')
                },
              },
            ],
          })
        })
      }
    }
    const onCashierSelect = item => {
      console.log(`[CSII VX Mobile] Select ${JSON.stringify(item)}`)
    }
    const onCashierPay = item => {
      console.log(`[CSII VX Mobile] Pay ${JSON.stringify(item)}`)
      doPay()
    }
    const onCashierCancel = () => {
      // Abort pay request or checking request
      timer.value && clearTimeout(timer.value)
    }
    return {
      isCashierhow,
      isCashierInitialed,
      isCashierCaptcha,
      cashierAmount,
      cashierResult,
      cashierResults,
      cashierChannels,
      cashier,
      createPay,
      sendCaptcha,
      checkCaptcha,
      onCashierShow,
      onCashierSelect,
      onCashierPay,
      onCashierCancel,
      doPay,
    }
  },
}

</script>

<style lang="stylus">
.ui-example-child-cashier
  .ui-field
    margin-bottom 30px
  .custom-scene
    min-height 300px
    display flex
    justify-content center
    align-items center
    font-size 32px
  .cashier-loading
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background rgba(255, 255, 255, 0.95)
    z-index 1400
    display flex
    align-items center
    justify-content center
</style>
