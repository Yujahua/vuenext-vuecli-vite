<template>
  <div class='ui-bank-list'>
    <div class='ui-list-thumb' :style='{"width": logWidth+"px","height":logWidth+"px"}'><img :src='log'></div>
    <div class='ui-list-content' :style='{"flex-direction":direction,"justify-content":justifyContent,"align-items":alignItems}'>
      <div v-for='(item,index) in options' :key='index' :style='{"font-size":item.fontSize+"px","color":item.color}'>{{item.content}}</div>
    </div>
    <div class='ui-list-arrow' aria-hidden='true'><ui-icon name='arrow-right'></ui-icon></div>
  </div>
</template>

<script>import Icon from '../icon'
export default {
  name: 'ui-bank-list',
  components: {
    [Icon.name]: Icon,
  },
  props: {
    log: {
      // log
      type: String,
      default: 'https://os.alipayobjects.com/rmsportal/OhSzVdRBnfwiuCK.png',
    },
    logWidth: {
      // log框
      type: String | Number,
      default: 34,
    },
    direction: {
      // 排列方式
      type: String,
      default: 'row',
    },
    justifyContent: {
      // 水平排列位置
      type: String,
      default: 'flex-start',
    },
    alignItems: {
      // 垂直排列位置
      type: String,
      default: 'stretch',
    },
    options: {
      // 所有内容数据
      type: Array,
      default: function() {
        return {
          content: '内容',
          fontSize: 16,
          color: '#000',
        }
      },
    },
  },
}
</script>

<style lang='stylus'>
.ui-bank-list
  display flex
  min-height 50px
  align-items center
  padding 10px 16px
  position: relative
  line-height 24px
  overflow auto
  &:after
    content: ''
    background-color: #eee
    position: absolute
    left: 15px
    height: 1px
    width: auto
    right: 0
    bottom: 0
  .ui-list-thumb
    img
      height 100%
      width 100%
  .ui-list-content
    display flex
    margin 0px 16px
    flex-grow 1
  .ui-list-arrow
    margin-left: 10px
    font-size 14px
    color #333
</style>
