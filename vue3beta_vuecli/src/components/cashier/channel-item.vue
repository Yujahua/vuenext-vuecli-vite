<template>
  <div class="ui-cashier-channel-item">
    <div class="item-icon" :class="data.icon" v-if="data.icon">
      <ui-icon :name="data.icon" size="lg"></ui-icon>
    </div>
    <div class="item-image" v-else-if="data.img">
      <img :src="data.img">
    </div>
    <div class="item-label">
      <p class="title">
        <span v-html="data.text || data"></span>
        <span
          v-if="data.action"
          class="title-active"
          v-html="data.action.text"
          @click.stop="data.action.handler"
        ></span>
      </p>
      <p
        class="desc"
        v-if="data.desc"
        v-html="data.desc"
      ></p>
    </div>
    <div class="item-check-icon">
      <ui-icon
        v-if="data.disabled"
        name="check-disabled"
      ></ui-icon>
      <ui-icon
        v-else-if="active"
        name="checked"
      ></ui-icon>
      <ui-icon
        v-else
        name="check"
      ></ui-icon>
    </div>
  </div>
</template>

<script>import Icon from '../icon'
export default {
  name: 'ui-cashier-channel-item',

  components: {
    [Icon.name]: Icon,
  },

  props: {
    data: {
      type: Object,
      default() {
        /* istanbul ignore next */
        return {}
      },
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="stylus">
.ui-cashier-channel-item
  block()
  position relative
  padding 20px 40px 20px 0
  box-sizing border-box
  // display flex
  // align-items center
  .item-icon, .item-image
    position relative
    float left
    width 32px
    height 32px
    margin 6px 0
  .item-image img
    block() 
  .item-label
    float left
    margin-left h-gap-sm
    .title
      font-size cashier-choose-channel-title-font-size
      color cashier-choose-channel-title-color
      .title-active
        padding-left h-gap-sm
        font-size cashier-choose-channel-title-action-font-size
        color cashier-choose-channel-title-action-color
    .desc
      margin-top v-gap-xs
      font-size cashier-choose-channel-desc-font-size
      color cashier-choose-channel-desc-color
  .item-check-icon
    position absolute
    top 50%
    right 0
    transform translateY(-50%)
    .ui-icon
      display flex
      color color-text-placeholder
      &.ui-icon-checked
        color cashier-choose-channel-icon-color
</style>
