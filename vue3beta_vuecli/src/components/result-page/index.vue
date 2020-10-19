<template>
  <div class="ui-result">
    <div class="ui-result-image">
      <img :src="actualImgUrl" :class="!imgUrl && type"/>
    </div>
    <div class="ui-result-text" v-if="actualText">{{actualText}}</div>
    <div class="ui-result-subtext" v-if="actualSubText">{{actualSubText}}</div>
    <div class="ui-result-buttons" v-if="buttons.length">
      <ui-button
        v-for="(button, index) of buttons"
        :type="button.type"
        :plain="button.plain === undefined || button.plain"
        :round="button.round"
        :inactive="button.inactive"
        :loading="button.loading"
        :icon="button.icon"
        :icon-svg="button.iconSvg"
        size="small"
        inline
        :key="index"
        @click="button.handler">
        {{button.text}}
      </ui-button>
    </div>
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue'
import Button from '../button'

export default {
  name: 'ui-result-page',

  components: {
    [Button.name]: Button,
  },

  props: {
    type: {
      type: String,
      default: 'empty',
    },
    imgUrl: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    subtext: {
      type: String,
      default: '',
    },
    buttons: {
      type: Array,
      default() {
        return []
      },
    },
  },
  setup(props) {
    const pre = '//manhattan.didistatic.com/static/manhattan/mand-mobile/result-page/2.1/'
    const state = reactive({
      actualImgUrl: props.imgUrl || `${pre}${props.type}.png`,
      actualText:
        props.text ||
        {
          // 网络连接异常
          network: '\u7f51\u7edc\u8fde\u63a5\u5f02\u5e38',
          // 暂无信息
          empty: '\u6682\u65e0\u4fe1\u606f',
        }[props.type] ||
        '',
      actualSubText:
        props.subtext ||
        {
          // 您要访问的页面已丢失
          lost: '\u60a8\u8981\u8bbf\u95ee\u7684\u9875\u9762\u5df2\u4e22\u5931',
        }[props.type] ||
        '',
    })
    return {
      ...toRefs(state),
    }
  },
}

</script>

<style lang="stylus">
.ui-result
  display flex
  align-items center
  justify-content center
  flex-direction column
  width 100%
  height 100%
  text-align center

.ui-result-image
  width result-page-image-size
  img
    width 100%
    margin-bottom 40px

.ui-result-text
  margin 20px 20px 0
  color result-page-title-color
  font-size result-page-title-font-size

.ui-result-subtext
  margin-top 16px
  color result-page-describe-color
  font-size result-page-describe-font-size

.ui-result-buttons
  display flex
  .ui-button
    margin 10px
</style>
