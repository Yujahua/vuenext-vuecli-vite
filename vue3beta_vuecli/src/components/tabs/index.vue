<template>
  <div class="ui-tabs">
    <ui-tab-bar
      ref="tabBar"
      :items="menus"
      :value="currentName"
      :has-ink="hasInk"
      :ink-length="inkLength"
      :immediate="immediate"
      @change="handleTabClick"
    />
    <div class="ui-tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {ref, reactive, watch, computed, toRefs, provide, getCurrentInstance, onMounted} from 'vue'
import TabBar from '../tab-bar'

export default {
  name: 'ui-tabs',

  components: {
    [TabBar.name]: TabBar,
  },

  props: {
    value: String,
    hasInk: {
      type: Boolean,
      default: true,
    },
    inkLength: {
      type: Number,
      default: 80,
    },
    immediate: Boolean,
  },
  setup(props, {emit, refs}) {
    const currentName = ref(props.value)
    const prevIndex = ref(0)
    const state = reactive({
      panes: [],
    })
    const that = getCurrentInstance()

    watch(
      () => props.value,
      val => {
        if (val !== currentName.value) {
          currentName.value = val
        }
      },
    )
    const menus = computed(() => {
      return state.panes.map(pane => {
        return {
          name: pane.name,
          label: pane.label,
          disabled: pane.disabled,
        }
      })
    })
    const currentIndex = computed(() => {
      for (let i = 0, len = menus.value.length; i < len; i++) {
        if (menus.value[i].name === currentName.value) {
          return i
        }
      }
      return 0
    })
    provide('rootTabs', that)
    onMounted(() => {
      if (!currentName.value && menus.value.length) {
        currentName.value = menus.value[0].name
      }
    })
    const handleTabClick = (tab, index, prevInd) => {
      currentName.value = tab.name
      prevIndex.value = prevInd
      emit('input', tab.name)
      emit('change', tab)
    }
    const addPane = pane => {
      if (state.panes.indexOf(pane) === -1) {
        state.panes.push(pane)
      }
    }
    const removePane = pane => {
      const index = state.panes.indexOf(pane)
      if (index >= 0) {
        state.panes.splice(index, 1)
      }
    }
    const reflowTabBar = () => {
      refs.tabBar.reflow()
    }
    const {panes} = toRefs(state)
    return {
      currentName,
      prevIndex,
      panes,
      menus,
      currentIndex,
      handleTabClick,
      addPane,
      removePane,
      reflowTabBar,
    }
  },
}

</script>

<style lang="stylus">
.ui-tabs-content
  position relative
  width 100%
  overflow hidden
</style>
