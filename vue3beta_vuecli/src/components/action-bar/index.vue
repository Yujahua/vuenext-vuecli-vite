<template>
  <div class="ui-action-bar">
    <div class="ui-action-bar-container">
      <div class="ui-action-bar-text" v-if="hasSlots">
        <slot></slot>
      </div>
      <div class="ui-action-bar-group">
        <template>
          <ui-button v-for="(item, index) in coerceActions"
            :key=index
            class="ui-action-bar-button"
            :type="item.type || (!!item.disabled ? 'disabled' : 'primary')"
            :plain="item.plain || index !== coerceActions.length - 1"
            :round="item.round"
            :inactive="item.inactive"
            :loading="item.loading"
            :icon="item.icon"
            :icon-svg="item.iconSvg"
            
            @click="onBtnClick($event, item)"
          >
            {{ item.text }}
          </ui-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {computed} from 'vue'

import Button from '../button'
import {isEmptyObject} from '../_util'

export default {
  name: 'ui-action-bar',

  components: {
    [Button.name]: Button,
  },

  props: {
    actions: {
      type: Array,
      default() {
        return []
      },
    },
  },
  setup(props, {emit, slots}) {
    // MARK: events handler
    const onBtnClick = (event, action) => {
      // 改写 && 表达式 eslint语法报错
      if (action.onClick) {
        action.onClick(event, action)
      }
      emit('click', event, action)
    }
    const coerceActions = computed(() => props.actions.slice(0, 2))
    const hasSlots = computed(() => !isEmptyObject(slots))
    return {
      onBtnClick,
      coerceActions,
      hasSlots,
    }
  },
}

</script>

<style lang="stylus">
.ui-action-bar
  position fixed
  z-index action-bar-zindex
  left 0
  bottom 0
  right 0
  display flex
  padding action-bar-padding-v action-bar-padding-h
  background color-bg-inverse
  clearfix()

.ui-action-bar-container
  display flex
  flex 1
  padding-bottom constant(safe-area-inset-bottom)

.ui-action-bar-text
  display flex
  flex 1
  height action-bar-slot-height
  margin-right action-bar-button-gap
  align-items center
  overflow hidden

.ui-action-bar-group
  display flex
  flex 1
  height 100%

.ui-action-bar-button
  display flex
  float right
  align-items center
  justify-content center
  flex 1
  &:nth-of-type(2)
    margin-left action-bar-button-gap
</style>
