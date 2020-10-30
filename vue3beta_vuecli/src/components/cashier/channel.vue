<template>
  <div class="ui-cashier-channel">
    <div class="choose-text">
      <p class="choose-title" v-if="paymentTitle" v-html="paymentTitle"></p>
      <p class="choose-number" v-if="paymentAmount" v-html="paymentAmount"></p>
      <p class="choose-describe" v-if="paymentDescribe" v-html="paymentDescribe"></p>
    </div>
    <div class="choose-channel" :class="{active: isChannelActive}">
      <slot></slot>
      <div class="choose-channel-list" v-if="isChannelShow || isSingle">
          <ui-cashier-channel-item
            v-for="(item, index) in channels"
            :class="{default: index === defaultIndex}"
            :key="index"
            :data="item"
            :active="index === activeChannelIndex"
            @click.native="onChannelItemClick(item, index)"
          />
      </div>
      <div class="choose-channel-list" v-else-if="channels[defaultIndex]">
        <ui-cashier-channel-item
          class="default"
          :data="channels[defaultIndex]"
          active
          @click.native="onChannelItemClick(channels[defaultIndex], defaultIndex)"
        />
      </div>
      <div
        v-if="!isSingle"
        class="choose-channel-more"
        :class="{disabled: isChannelActive}"
        v-html="moreButtonText"
        @click="onChannelMoreClick"
      ></div>
    </div>
    <div class="ui-cashier-block-btn">
      <ui-button
        class="ui-cashier-pay-button"
        :type="payButtonDisabled ? 'disabled': 'primary'"
        @click="onChannelBtnClick"
      >
        <slot name="button">{{ payButtonText }}</slot>
      </ui-button>
    </div>
  </div>
</template>

<script>
import {ref, computed, nextTick} from 'vue'
import Button from '../button'
import Icon from '../icon'
import ChannelItem from './channel-item'

export default {
  name: 'ui-cashier-channel',

  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [ChannelItem.name]: ChannelItem,
  },

  props: [
    'paymentTitle',
    'paymentAmount',
    'paymentDescribe',
    'moreButtonText',
    'payButtonText',
    'payButtonDisabled',
    'channels',
    'channelLimit',
    'defaultIndex',
  ],
  setup(props, {emit}) {
    const isChannelShow = ref(false)
    const isChannelActive = ref(false)
    const activeChannelIndex = ref(-1)
    activeChannelIndex.value = props.defaultIndex
    const isSingle = computed(() => {
      if (props.channelLimit < 1) {
        return true
      }
      return !(props.channels.length > props.channelLimit)
    })
    const onChannelItemClick = (item, index) => {
      if (item.disabled) {
        return
      }
      activeChannelIndex.value = index
      emit('select', item)
    }
    const onChannelMoreClick = () => {
      if (isChannelActive.value) {
        return
      }
      isChannelShow.value = true
      nextTick(() => {
        isChannelActive.value = true
      })
    }
    const onChannelBtnClick = () => {
      const item = props.channels[activeChannelIndex.value]
      emit('pay', item)
    }
    return {
      isChannelShow,
      isChannelActive,
      activeChannelIndex,
      isSingle,
      onChannelItemClick,
      onChannelMoreClick,
      onChannelBtnClick,
    }
  },
}

</script>

<style lang="stylus">
.ui-cashier-channel
  .choose-text
    clearfix()
    position relative
    padding 65px 0 25px
    hairline(bottom, color-border-minor)
    p
      block()
      text-align center
      &.choose-title
        font-size cashier-choose-title-font-size
        color cashier-choose-title-color
      &.choose-number
        margin-top 20px
        font-size cashier-choose-amount-font-size
        font-family font-family-number
        color cashier-choose-amount-color
        letter-spacing -2px
      &.choose-describe
        font-size cashier-choose-describe-font-size
        color cashier-choose-describe-color
  .choose-channel
    clearfix()
    max-height 500px
    padding 40px 60px
    box-sizing border-box
    overflow auto
    .choose-channel-list
      clearfix()
      // max-height 64px
      transition all .5s ease-in
      overflow hidden
      
    .choose-channel-more
      margin-top 10px
      font-size cashier-choose-more-font-size
      color cashier-choose-more-color
      text-align center
      &:after
        content ""
        position relative
        top 20px
        width 0
        height 0
        margin-left 10px
        border-left solid 8px transparent
        border-right solid 8px transparent
        border-top solid 8px color-text-caption
      &.disabled
        visibility hidden
    &.active
      .choose-channel-list .choose-channel-item
        display block
      .choose-channel-list
        max-height 1000px !important
</style>
