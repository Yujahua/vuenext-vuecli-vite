<template>
  <div class='ui-graphic-list'>
    <div :class='[{"ui-graphic-list-box": true, "arrow": arrow}, iconTextAlign]'>
      <div :class='["left-icon", imageAlign]' v-if='imageUrl'>
        <img
          :src='imageUrl'
          :style='{ "width": iconWidth ? iconWidth + "px" : "auto", "height": iconHeight ? iconHeight + "px" : "auto"}'
        />
      </div>
      <div :class='["center-content", arrowAlign]'>
        <div :class='{"main-text": true, "block": isVertical}'>
          <ul class='text-list'>
            <li
              v-for='(item, ind) in columns'
              :key='ind'
              :style='{"color":item.color, "font-size":item.fontSize + "px"}'
            >{{item.content}}</li>
          </ul>
        </div>
        <div class='duplicate-text'>
          <span
            v-for='item in briefList'
            :style='{"color":item.briefColor, "font-size": item.fontSize + "px"}'
            :key='item.key'
          >{{ item.brief }}</span>
        </div>
      </div>
      <div :class='["right-icon", arrowAlign]' v-if='arrow'>
        <!--<i class='md-icon icon-font md-icon-arrow-right arrow-right md'></i>-->
        <ui-icon name='arrow-right'></ui-icon>
      </div>
    </div>
  </div>
</template>

<script>import Icon from '../icon'
export default {
  name: 'ui-graphic-list',
  components: {
    [Icon.name]: Icon,
  },
  props: {
    imageUrl: {
      type: String,
      default: '',
    },
    imageAlign: {
      type: String,
      default: 'top',
    },
    columns: {
      type: Array,
      default: () => {
        return [
          {
            content: '文本',
            color: '#000',
            fontSize: '14',
          },
        ]
      },
    },
    isVertical: {
      type: Boolean,
      default: false,
    },
    arrow: {
      type: Boolean,
      default: true,
    },
    arrowAlign: {
      type: String,
      default: 'top',
    },
    briefList: {
      type: Array,
      default: () => {
        return [
          {
            brief: '',
            briefColor: '',
            fontSize: '14',
          },
        ]
      },
    },
    iconWidth: {
      type: String,
      default: '24',
    },
    iconHeight: {
      type: String,
      default: '',
    },
    iconTextAlign: {
      type: String,
      default: 'left',
    },
  },
}
</script>

<style lang='stylus'>
.ui-graphic-list
  .ui-graphic-list-box
    min-height 24px
    line-height 24px
    background-color #fff
    padding 10px
    display flex
    flex-flow row nowrap
    position relative
    &.right
      flex-direction row-reverse
      .left-icon
        padding 0 0 0 5px
    &.left
      flex-direction row
      .left-icon
        padding 0 10px 0 0
    .left-icon
      img
        display block
        max-width 100%
        border-radius 3px
        position relative
      &.top
        img
          top 0
          transform translateY(0%)
      &.middle
        img
          top 50%
          transform translateY(-50%)
      &.bottom
        img
          top 100%
          transform translateY(-100%)
    .center-content
      position relative
      flex 1
      display flex
      flex-flow row nowrap
      &.top
        align-items flex-start
      &.middle
        align-items center
      &.bottom
        align-items flex-end
      .main-text
        flex 1
        .text-list
          display flex
          width 100%
          flex-flow row nowrap
          li
            display block
            padding 0 5px 0 0
            line-height 24px
            flex 1
        &.block
          .text-list
            display block
      .duplicate-text
        padding-left 5px
        position relative
        z-index 2
        line-height 24px
        text-align right
        span
          display block
    &.arrow
      padding-right 30px
      .right-icon
        position absolute
        top 10px
        right 10px
        width 16px
        height 24px
        &.top
          top 10px
          transform translateY(0)
        &.middle
          top 50%
          transform translateY(-50%)
        &.bottom
          top 100%
          margin-top -34px
  &::after
    content ''
    display block
    height 1px
    background-color #e2e4ea
    margin-left 50px
</style>
