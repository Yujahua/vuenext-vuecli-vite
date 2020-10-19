<template>
  <nav class="ui-tab-bar">
    <div class="ui-tab-bar-inner" ref="wrapper">
      <template v-if="scrollable">
        <div class="ui-tab-bar-start" v-show="maskStartShown"></div>
        <div class="ui-tab-bar-end" v-show="maskEndShown"></div>
      </template>
      <ui-scroll-view
        ref="scroller"
        :scrolling-x="scrollable"
        :scrolling-y="false"
        :key="scrollerTmpKey"
        @scroll="onScroll"
      >
         <div class="ui-tab-bar-list" :style="{width: contentW + 'px'}">
          <a
            class="ui-tab-bar-item"
            :class="{
              'is-active': currentName === item.name,
              'is-disabled': !!item.disabled
            }"
            v-for="(item, index) in items"
            :key="item.name"
            ref="items"
            @click="onClick(item, index)"
          >
            <slot
              name="item"
              :item="item"
              :items="items"
              :index="index"
              :currentName="currentName"
            >{{ item.label }}</slot>
          </a>
        </div>
        <span
          class="ui-tab-bar-ink"
          :class="{
            'is-disabled': currentTab && currentTab.disabled
          }"
          v-if="hasInk"
          :style="{
            width: inkWidth + 'px',
            transform: 'translateX(' + inkPos + 'px)',
          }"
        ></span>
      </ui-scroll-view>
    </div>
  </nav>
</template>

<script>
import {reactive, computed, toRefs, watch, nextTick, onBeforeUnmount, onMounted, ref} from 'vue'
import ScrollView from '../scroll-view'

export default {
  name: 'ui-tab-bar',
  components: {
    [ScrollView.name]: ScrollView,
  },

  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
    hasInk: {
      type: Boolean,
      default: true,
    },
    inkLength: {
      type: Number,
      default: 100,
    },
    immediate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit, refs}) {
    let state = reactive({
      currentName: '',
      wrapperW: 0,
      contentW: 0,
      inkWidth: 0,
      inkPos: 0,
      scrollerTmpKey: Date.now(),
      maskStartShown: false,
      maskEndShown: true,
    })
    if (state.currentName === '' && props.items.length) {
      state.currentName = props.items[0].name
      emit('change', props.items[0], 0, 0)
    }
    let scrollable = computed(() => state.contentW > state.wrapperW)
    let currentIndex = computed(() => {
      for (let i = 0, len = props.items.length; i < len; i++) {
        if (props.items[i].name === state.currentName) {
          return i
        }
      }
    })
    let currentTab = computed(() => {
      if (currentIndex.value) {
        return props.items[currentIndex.value]
      }
    })
    // MARK: private events
    const onScroll = ({scrollLeft}) => {
      if (scrollLeft > 0) {
        state.maskStartShown = true
      } else {
        state.maskStartShown = false
      }
      if (scrollLeft >= refs.scroller.contentW - refs.scroller.containerW) {
        state.maskEndShown = false
      } else {
        state.maskEndShown = true
      }
    }
    const onClick = (item, index) => {
      if (item.disabled) {
        return
      }
      emit('change', item, index, currentIndex.value)
      state.currentName = item.name
      emit('input', item.name)
    }
    // MARK: public methods
    const reflow = () => {
      if (!refs.items || refs.items.length === 0) {
        return
      }
      state.wrapperW = refs.wrapper.offsetWidth
      let contentWidth = 0
      for (let i = 0, len = props.items.length; i < len; i++) {
        contentWidth += refs.items[i].offsetWidth
      }
      state.contentW = contentWidth
      refs.scroller.reflowScroller()
      nextTick(() => {
        if (!refs.items || !refs.items[currentIndex.value]) {
          return
        }
        const target = refs.items[currentIndex.value]
        state.inkWidth = target.offsetWidth * props.inkLength / 100
        state.inkPos = target.offsetLeft + (target.offsetWidth - state.inkWidth) / 2

        const prevTarget = refs.items[currentIndex.value - 1]
        const nextTarget = refs.items[currentIndex.value + 1]

        if (!prevTarget) {
          refs.scroller.scrollTo(0, 0, true)
          return
        }

        if (!nextTarget) {
          refs.scroller.scrollTo(state.contentW, 0, true)
          return
        }
        const wrapperRect = refs.wrapper.getBoundingClientRect()
        const prevTargetRect = prevTarget.getBoundingClientRect()
        const nextTargetRect = nextTarget.getBoundingClientRect()
        /* istanbul ignore next */
        if (prevTargetRect && prevTargetRect.left < wrapperRect.left) {
          refs.scroller.scrollTo(prevTarget.offsetLeft, 0, true)
        } else if (nextTargetRect && nextTargetRect.right > wrapperRect.right) {
          refs.scroller.scrollTo(nextTarget.offsetLeft + nextTarget.offsetWidth - state.wrapperW, 0, true)
        }
      })
    }

    watch(
      () => ref(props.value),
      val => {
        if (val !== state.currentName) {
          state.currentName = val
        }
      },
      {immediate: true},
    )
    watch(
      () => state.inkWidth,
      () => {
        /* istanbul ignore next */
        nextTick(function() {
          reflow()
        })
      },
    )
    watch(
      () => ref(props.items),
      () => {
        nextTick(function() {
          reflow()
        })
      },
    )
    watch(
      () => currentIndex.value,
      () => {
        nextTick(function() {
          reflow()
        })
      },
    )
    watch(
      () => scrollable.value,
      () => {
        state.scrollerTmpKey = Date.now()
      },
    )
    onMounted(() => {
      window.addEventListener('resize', reflow)
      reflow()
      if (props.immediate) {
        nextTick(() => {
          emit('change', props.items[currentIndex.value], currentIndex.value)
        })
      }
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', reflow)
    })
    return {
      ...toRefs(state),
      scrollable,
      currentIndex,
      currentTab,
      onScroll,
      onClick,
      reflow,
    }
  },
}

</script>

<style lang="stylus">
.ui-tab-bar
  position relative
  padding-left tab-offset
  padding-right tab-offset
  background-color tab-bg

.ui-tab-bar-inner
  position relative
  width 100%
  // line-height 0

.ui-tab-bar-list
  display flex
  justify-content space-between
  min-width 100%

.ui-tab-bar-item
  flex auto
  flex-shrink 0
  position relative
  display inline-flex
  align-items center
  justify-content center
  color tab-text-color
  font-size tab-font-size
  font-weight tab-font-weight
  min-height tab-height
  padding 0 tab-item-gap
  margin 0 auto
  box-sizing border-box
  -webkit-user-select none
  -webkit-tap-highlight-color transparent
  &.is-active
    color tab-active-color
  &.is-disabled
    color tab-disabled-color

.ui-tab-bar-ink
  position absolute
  bottom 0
  left 0
  display block
  height tab-ink-height
  background-color tab-active-color
  transition all 300ms
  &.is-disabled
    background-color tab-disabled-color

.ui-tab-bar-start,
.ui-tab-bar-end
  position absolute
  top 0
  left 0
  width 14px
  height tab-height
  overflow hidden
  &::after
    content ''
    display block
    position absolute
    left -14px
    top 50%
    width 14px
    if tab-height is a 'unit'
      margin-top 0 - tab-height * 0.4
      height tab-height * 0.8
    else
      margin-top "calc(0 - %s * 0.4)" % tab-height
      height "calc(%s * 0.8)" % tab-height
    border-radius 50%
    box-shadow: -1px 0 12px 0 rgba(0,0,0,0.2)
.ui-tab-bar-end
  left auto
  right 0
  transform rotate(180deg)

.ui-tab-bar
  .ui-scroll-view
    display block
  .scroll-view-container
    min-width 100%
</style>
