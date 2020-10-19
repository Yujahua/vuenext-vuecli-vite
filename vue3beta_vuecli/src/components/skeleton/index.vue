<template>
  <div class="ui-skeleton" v-if="loading">
    <div
      v-if="avatar"
      :class="{
        'ui-skeleton-avatar': true,
        'ui-skeleton-avatar-large': avatarSize === 'lg',
        'ui-skeleton-avatar-small': avatarSize === 'sm',
      }"
    ></div>
    <div class="ui-skeleton-content">
      <h4 class="ui-skeleton-title" :style="{ width: getTitleWidth() }" />
      <div
        v-for="index in row"
        class="ui-skeleton-row"
        :style="{width: index === row ? '60%' : getRowWidth(index - 1)}"
        :key="index"
      >
      </div>
    </div>
  </div>
  <div  v-else>
    <slot></slot>
  </div>
</template>
<script>
import {getCurrentInstance} from 'vue'
const DEFUALT_TITLE_WIDTH = '40%'
const DEFUALT_WIDTH = '100%'

export default {
  name: 'ui-skeleton',

  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Number,
      default: 3,
    },
    title: {
      type: Boolean,
      default: false,
    },
    titleWidth: {
      type: [Number, String],
      default: DEFUALT_TITLE_WIDTH,
    },
    rowWidth: {
      type: [Number, String, Array],
      default: DEFUALT_WIDTH,
    },
    avatarSize: {
      type: String,
      default: 'md',
    },
  },
  setup() {
    const isNumber = n => {
      return typeof n === 'number'
    }
    const that = getCurrentInstance()
    const getRowWidth = index => {
      const {rowWidth, isNumber} = that
      if (rowWidth && Array.isArray(rowWidth)) {
        return isNumber(rowWidth[index]) ? `${rowWidth[index]}%` : rowWidth[index]
      } else if (rowWidth) {
        return isNumber(rowWidth) ? `${rowWidth}%` : rowWidth
      }
      return DEFUALT_WIDTH
    }
    const getTitleWidth = () => {
      const {titleWidth, isNumber} = that
      if (titleWidth) {
        return isNumber(titleWidth) ? `${titleWidth}%` : titleWidth
      }
      return DEFUALT_TITLE_WIDTH
    }
    return {
      isNumber,
      getRowWidth,
      getTitleWidth,
    }
  },
}

</script>

<style lang="stylus">
placeHolder()
  animation-duration 2s
  animation-fill-mode forwards
  animation-iteration-count infinite
  animation-name placeHolderShimmer
  animation-timing-function linear
  background linear-gradient(to right, #F3F3F6 8%, #F8FAFF 18%, #F3F3F6 33%)
  background-size 1000px 104px

.ui-skeleton
  box-sizing border-box
  display flex
  .ui-skeleton-avatar
    width 80px
    height 80px
    margin-right 32px
    border-radius 50%
    placeHolder()
    &.ui-skeleton-avatar-large
      width 96px
      height 96px
    &.ui-skeleton-avatar-small
      width 64px
      height 64px
  .ui-skeleton-content
    flex 1
  .ui-skeleton-title, .ui-skeleton-row
    box-sizing border-box
    height 32px
    margin-bottom 24px
    border 0
    border-radius 0
    placeHolder()
    &:last-child
      margin-bottom 0

@keyframes placeHolderShimmer
  0%
    background-position -468px 0
  100%
    background-position 468px 0
</style>
