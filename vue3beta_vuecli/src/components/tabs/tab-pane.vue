<template>
  <transition :name="transitionName">
    <div
      class="ui-tab-pane"
      v-show="active"
      role="tabpanel"
      :tab="name"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import {inject, computed, watch, getCurrentInstance, onUnmounted} from 'vue'
export default {
  name: 'ui-tab-pane',

  props: {
    label: {
      type: String,
    },
    name: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
  },
  setup(props, {parent}) {
    const that = getCurrentInstance()
    const rootTabs = inject('rootTabs', parent)
    const active = computed(() => rootTabs.currentName === props.name)
    const transitionName = computed(
      () => (rootTabs.prevIndex > rootTabs.currentIndex ? 'ui-tab-slide-right' : 'ui-tab-slide-left'),
    )
    watch(
      () => props.label,
      () => {
        rootTabs.$forceUpdate()
      },
    )
    watch(
      () => props.disabled,
      () => {
        rootTabs.$forceUpdate()
      },
    )
    rootTabs.addPane(that)
    onUnmounted(() => {
      rootTabs.removePane(that)
    })
    return {
      rootTabs,
      active,
      transitionName,
    }
  },
}

</script>

<style lang="stylus">
.ui-tab-pane
  position relative
  width 100%

.ui-tab-slide-left,
.ui-tab-slide-right
  &-enter
    opacity 0.01
  &-enter-active
    transition all 300ms
  &-leave-active
    position absolute
    top 0
    transition all 300ms
  &-leave-to
    opacity 0.01

.ui-tab-slide-left
  &-enter
    transform translateX(100%)
  &-leave-to
    transform translateX(-100%)
.ui-tab-slide-right
  &-enter
    transform translateX(-100%)
  &-leave-to
    transform translateX(100%)
</style>
