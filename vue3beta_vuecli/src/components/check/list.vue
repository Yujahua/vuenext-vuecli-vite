<template>
  <ui-check-group
    ref="group"
    class="ui-check-list"
    :class="{ 'is-align-center': alignCenter }"
    :value="value"
    @input="onInput"
  >
    <ui-cell-item
      v-for="(item, index) in options"
      :key="index"
      class="ui-check-item"
      :class="{
        'is-checked': value.indexOf(item.value) !== -1,
      }"
      :title="hasSlot ? '' : (item.text || item.label)"
      :brief="hasSlot ? '' : item.brief"
      :disabled="item.disabled"
      @click="check(item, index)"
    >
      <template v-if="hasSlot">
        <slot :option="item" :index="index" :selected="value.indexOf(item.value) > -1"></slot>
      </template>
      <ui-check
        v-if="!alignCenter"
        :name="item.value"
        :disabled="item.disabled"
        :size="iconSize"
        :icon="icon"
        :icon-inverse="iconInverse"
        :icon-disabled="iconDisabled"
        :icon-svg="iconSvg"
        :slot="iconPosition === 'right' ? 'right' : 'left'"
      />
    </ui-cell-item>
  </ui-check-group>
</template>

<script>
import {computed} from 'vue'
import Check from './index'
import CheckGroup from './group'
import CellItem from '../cell-item'
import checkMixin from './mixin'

export default {
  name: 'ui-check-list',

  mixins: [checkMixin],

  components: {
    [Check.name]: Check,
    [CheckGroup.name]: CheckGroup,
    [CellItem.name]: CellItem,
  },

  props: {
    options: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
    value: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
    alignCenter: {
      type: Boolean,
      default: false,
    },
    isSlotScope: {
      type: Boolean,
      default: undefined,
    },
  },
  setup(props, {slots, refs, emit}) {
    const hasSlot = computed(() => (props.isSlotScope !== undefined ? props.isSlotScope : !!slots.default))
    // MARK: private methods
    const check = option => {
      refs.group.toggle(option.value)
    }
    // MARK: private events
    const onInput = value => {
      emit('input', value)
    }
    return {
      hasSlot,
      check,
      onInput,
    }
  },
}

</script>

<style lang="stylus">
.ui-check-item
  .ui-check
    margin-top 0
    margin-bottom 0
    pointer-events none
  .ui-cell-item-body.multilines .ui-cell-item-title
    font-weight font-weight-medium

.ui-check-list.is-align-center
  .ui-cell-item-content
    text-align center
  .ui-cell-left,
  .ui-cell-right
    display none
</style>

