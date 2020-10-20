<template>
  <div class='ui-refresh'>
    <slot>
      <span v-if='refreshStatus===2' class='refresh-status refresh-start'></span>
      <span v-if='refreshStatus===1' class='refresh-status refresh-active'></span>
      <span v-if='refreshStatus===0' class='refresh-status refreshing'></span>
      <p class='refresh-tip'>
        <span class='refresh-text'>{{ refreshTip }}</span>
        <span class='refresh-date'>{{ date }}</span>
      </p>
    </slot>
  </div>
</template>
<script>
import {computed, ref} from 'vue'
export default {
  name: 'ui-refresh',
  props: {
    refreshText: {
      type: String,
      default: '下拉刷新',
    },
    refreshActiveText: {
      type: String,
      default: '释放刷新',
    },
    refreshingText: {
      type: String,
      default: '刷新中...',
    },
    refreshActive: {
      type: Boolean,
      default: false,
    },
    refreshing: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    let currentDate = ref(new Date())
    let refreshTip = computed(() => {
      if (props.refreshing) {
        return props.refreshingText
      }
      if (props.refreshActive) {
        return props.refreshActiveText
      }
      return props.refreshText
    })
    let refreshStatus = computed(() => {
      currentDate.value = new Date()
      if (props.refreshing) {
        return 0
      } else if (props.refreshActive) {
        return 1
      } else {
        return 2
      }
    })
    let date = computed(() => {
      if (!currentDate.value) {
        return
      }
      const M = (currentDate.value.getMonth() + 1).toString().padStart(2, '0')
      const D = currentDate.value
        .getDate()
        .toString()
        .padStart(2, '0')
      const h = currentDate.value
        .getHours()
        .toString()
        .padStart(2, '0')
      const m = currentDate.value
        .getMinutes()
        .toString()
        .padStart(2, '0')
      return `${M}-${D} ${h}:${m}`
    })
    return {
      currentDate,
      refreshTip,
      refreshStatus,
      date,
    }
  },
}

</script>
<style lang='stylus'>
.ui-refresh
  width 100%
  // height 100px
  display flex
  font-size 24px
  justify-content center
  align-items center
  overflow hidden
  // background-color #f00
  .refresh-status
    width 32px
    height 36px
    background-repeat no-repeat
    background-position center
    background-size 24px 100%
    display inline-block
    &.refresh-start
      background-image url('../_style/images/arrow-down.svg')
    &.refresh-active
      background-image url('../_style/images/arrow-up.svg')
    &.refreshing
      animation spinners-animation 1200ms linear infinite
      background-image url('../_style/images/loading.svg')
  .refresh-tip
    // margin-left 15px
    font-size 24px
    color #9E98A7
    display flex
    flex-direction column
    padding 30px 20px
    span
      text-align center
      ine-height 28px
      letter-spacing 0.82px
      &.refresh-date
        font-size 24px
        line-height 34px
        letter-spacing 0.7px
@keyframes spinners-animation
  from
    transform rotate(0deg)
  to
    transform rotate(360deg)
</style>
