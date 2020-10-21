<template>
  <div class="ui-cashier">
    <ui-popup
      class="inner-popup"
      v-model="isCashierShow"
      position="bottom"
      :mask-closable="false"
      prevent-scroll-exclude=".choose-channel"
      prevent-scroll
      @show="onPopupShow"
      @hide="onPopupHide"
    >
      <ui-popup-title-bar
        :title="title"
        :describe="describe"
        :large-radius="largeRadius"
        only-close
        @cancel="onPopupCancel"
      ></ui-popup-title-bar>
      <div class="ui-cashier-container">
        <slot name="header" :scene="scene"></slot>

        <!-- Choose pay channel -->
        <div v-if="scene === 'choose'" class="ui-cashier-block ui-cashier-choose" :key="sceneKey">
          <ui-cashier-channel
            ref="channel"
            :payment-title="paymentTitle"
            :payment-amount="paymentAmount"
            :payment-describe="paymentDescribe"
            :more-button-text="moreButtonText"
            :pay-button-text="payButtonText"
            :pay-button-disabled="payButtonDisabled"
            :channels="channels"
            :channelLimit="channelLimit"
            :default-index="defaultIndex"
          >
            <slot name="channel"></slot>
            <slot name="button">
              <slot name="payButton"></slot>
            </slot>
          </ui-cashier-channel>
        </div>

        <!-- Captcha -->
        <div
          v-else-if="scene === 'captcha'"
          class="ui-cashier-block ui-cashier-captcha"
          :key="sceneKey"
        >
          <ui-captcha
            ref="captcha"
            :maxlength="sceneOption.captcha.maxlength"
            :count="sceneOption.captcha.count"
            :countNormalText="sceneOption.captcha.countNormalText"
            :countActiveText="sceneOption.captcha.countActiveText"
            :auto-countdown="sceneOption.captcha.autoCountdown"
            :brief="sceneOption.captcha.brief"
            is-view
            @send="sceneOption.captcha.onSend"
            @submit="sceneOption.captcha.onSubmit"
          >
            <div v-text="sceneOption.captcha.text"></div>
          </ui-captcha>
        </div>

        <!-- Loaing, Success -->
        <div
          v-else-if="scene === 'loading' || scene === 'success'"
          class="ui-cashier-block"
          :class="{
            'ui-cashier-loading': scene === 'loading',
            'ui-cashier-success': scene === 'success'
          }"
          :key="sceneKey"
        >
          <div class="ui-cashier-block-icon">
            <ui-activity-indicator-rolling-success ref="rolling" :is-success="scene === 'success'"></ui-activity-indicator-rolling-success>
          </div>
          <div
            class="ui-cashier-block-text"
          >{{ scene === 'success' ? sceneOption.success.text : sceneOption.loading.text }}</div>
          <ui-cashier-channel-button
            v-if="scene === 'success'"
            :actions="
              sceneOption.success.actions ||
              [{
                buttonText: sceneOption.success.buttonText,
                handler: sceneOption.success.handler
              }]
            "
          />
        </div>

        <!-- Fail -->
        <div v-else-if="scene === 'fail'" class="ui-cashier-block ui-cashier-fail" :key="sceneKey">
          <div class="ui-cashier-block-icon">
            <ui-icon name="warn-color"></ui-icon>
          </div>
          <div class="ui-cashier-block-text" v-text="sceneOption.fail.text"></div>
          <ui-cashier-channel-button
            :actions="
              sceneOption.fail.actions ||
              [{
                buttonText: sceneOption.fail.buttonText,
                handler: sceneOption.fail.handler
              }]
            "
          />
        </div>

        <!-- Custom -->
        <div
          v-else-if="scene === 'custom'"
          class="ui-cashier-block ui-cashier-custom"
          :key="sceneKey"
        >
          <slot name="scene"></slot>
        </div>

        <slot name="footer" :scene="scene"></slot>
      </div>
    </ui-popup>
  </div>
</template>

<script>
import {ref, reactive, watch} from 'vue'
import Popup from '../popup'
import PopupTitlebar from '../popup/title-bar'
import popupMixin from '../popup/mixins'
import popupTitleBarMixin from '../popup/mixins/title-bar'
import Captcha from '../captcha'
import Icon from '../icon'
import RollerSuccess from '../activity-indicator/roller-success'
import {noop, extend} from '../_util'
import Channel from './channel'
import ChannelButton from './channel-button'

export default {
  name: 'ui-cashier',

  mixins: [popupMixin, popupTitleBarMixin],

  components: {
    [Popup.name]: Popup,
    [PopupTitlebar.name]: PopupTitlebar,
    [Captcha.name]: Captcha,
    [Icon.name]: Icon,
    [RollerSuccess.name]: RollerSuccess,
    [Channel.name]: Channel,
    [ChannelButton.name]: ChannelButton,
  },

  props: {
    channels: {
      type: Array,
      default() {
        return []
      },
    },
    channelLimit: {
      type: Number,
      default: 2,
    },
    defaultIndex: {
      type: Number,
      default: 0,
    },
    paymentTitle: {
      type: String,
      default: '\u652f\u4ed8\u91d1\u989d\u0028\u5143\u0029', // 支付金额
    },
    paymentAmount: {
      type: String,
      default: '0.00',
    },
    paymentDescribe: {
      type: String,
      default: '',
    },
    payButtonText: {
      type: String,
      default: '\u786e\u5b9a\u652f\u4ed8', // 确定支付
    },
    payButtonDisabled: {
      type: Boolean,
      default: false,
    },
    moreButtonText: {
      type: String,
      default: '\u66f4\u591a\u652f\u4ed8\u65b9\u5f0f', // 更多支付方式
    },
    title: {
      default: '\u652f\u4ed8', // 支付
    },

    // Mixin Props
    // value: {
    //   type: Boolean,
    //   default: false,
    // },
    // describe: {
    //   type: String,
    //   default: '',
    // },
  },
  setup(props, {emit}) {
    const isCashierShow = ref(false)
    const scene = ref('choose') // choose, captcha, loading, success, fail
    const sceneKey = ref(Date.now())
    const sceneOption = reactive({
      loading: {
        text: '\u652f\u4ed8\u7ed3\u679c\u67e5\u8be2\u4e2d\u002e\u002e\u002e', // 支付结果查询中...
      },
      success: {
        text: '\u652f\u4ed8\u6210\u529f', // 支付成功
        buttonText: '\u6211\u77e5\u9053\u4e86', // 我知道了
        handler: null,
      },
      fail: {
        text: '\u652f\u4ed8\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5', // 支付失败，请稍后重试
        buttonText: '\u6211\u77e5\u9053\u4e86', // 我知道了
        handler: null,
      },
      captcha: {
        text: '',
        brief: '',
        maxlength: 4,
        count: 60,
        autoCountdown: true,
        onSend: noop,
        onSubmit: noop,
      },
    })
    const initialCashier = () => {
      isCashierShow.value = props.value
    }
    initialCashier()
    const isChannelShow = ref(null)
    const isChannelActive = ref(null)
    if (props.channels.length < 3) {
      isChannelShow.value = true
      isChannelActive.value = true
    }
    const resetCashier = () => {
      scene.value = 'choose'
      isChannelShow.value = false
      isChannelActive.value = false
    }
    const onPopupShow = () => {
      emit('show')
    }
    const onPopupHide = () => {
      resetCashier()
      emit('hide')
    }
    const onPopupCancel = () => {
      isCashierShow.value = false
      emit('cancel')
    }
    // MARK: public methods
    const next = (toScene, option = {}) => {
      if (sceneOption[toScene]) {
        extend(sceneOption[toScene], option)
      }
      scene.value = toScene
      sceneKey.value = Date.now()
    }
    watch(
      () => props.value,
      val => {
        isCashierShow.value = val
      },
    )
    watch(isCashierShow, val => {
      emit('input', val)
    })
    return {
      isCashierShow,
      scene,
      sceneKey,
      sceneOption,
      initialCashier,
      resetCashier,
      onPopupShow,
      onPopupHide,
      onPopupCancel,
      next,
    }
  },
}

</script>

<style lang="stylus">
.ui-cashier {
  .ui-popup-title-bar .ui-popup-cancel {
    .ui-icon {
      align-self: flex-start;
      margin-left: h-gap-lg;
    }
  }

  .ui-popup-box {
    background-color: color-bg-inverse;
    border-radius: popup-title-bar-radius popup-title-bar-radius 0 0;
  }

  .ui-cashier-container {
    block();
    position: relative;
    background: cashier-bg;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    transition: all 0.3s;
    overflow: hidden;

    .ui-cashier-block {
      clearfix();

      .ui-cashier-block-icon {
        position: relative;
        left: 50%;
        float: left;
        width: 100px;
        height: 100px;
        margin-top: 75px;
        transform: translateX(-50%);

        .ui-activity-indicator-svg {
          width: 100px !important;
          height: 100px !important;
        }
      }

      .ui-cashier-block-text {
        block();
        margin-top: 20px;
        margin-bottom: 180px;
        font-size: font-minor-large;
        color: color-text-minor;
        text-align: center;
      }

      .ui-cashier-block-btn {
        block();
        padding: 0 40px 40px;
        box-sizing: border-box;
      }

      // &.ui-cashier-choose
      &.ui-cashier-captcha {
        .ui-captcha {
          block();
        }

        .ui-captcha-content {
          margin-top: 44px;
          margin-bottom: 20px;
          color: color-text-caption;
        }

        .ui-codebox {
          margin-bottom: 26px;
        }

        .ui-captcha-content, .ui-captcha-message, .ui-codebox, .ui-captcha-footer {
          margin-left: 40px;
          margin-right: 40px;
        }

        .ui-captcha-footer {
          margin-bottom: 44px;
        }
      }

      &.ui-cashier-fail {
        .ui-cashier-block-icon {
          position: relative;
          text-align: center;
          line-height: 100px;

          .ui-icon-warn-color {
            position: relative;
            z-index: 2;
            color: #FFF6F1;
            width: 100px;
            height: 100px;
          }
        }
      }
    }
  }
}
</style>
