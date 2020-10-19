<template>
  <div
    class="ui-radio-list"
    :class="{ 'is-align-center': alignCenter }"
  >
    <ui-cell-item
      v-for="(item, index) in options"
      :key="index"
      class="ui-radio-item"
      :class="{
        'is-selected': selectedValue === item.value && !inputSelected,
      }"
      :title="hasSlot ? '' : (item.text || item.label)"
      :brief="hasSlot ? '' : item.brief"
      :disabled="item.disabled"
      :noBorder="index === options.length - 1"
      @click="selected(item, index)"
    >
      <template v-if="hasSlot">
        <slot :option="item" :index="index" :selected="currentValue === item.value"></slot>
      </template>
      <ui-radio
        v-if="!alignCenter && !inputSelected && !withoutIcon"
        :name="item.value"
        v-model="selectedValue"
        :disabled="item.disabled"
        :size="iconSize"
        :icon="icon"
        :icon-inverse="iconInverse"
        :icon-disabled="iconDisabled"
        :icon-svg="iconSvg"
        :slot="iconPosition === 'right' ? 'right' : 'left'"
      />
    </ui-cell-item>
    <ui-input-item
      v-if="hasInput"
      ref="inputItem"
      class="ui-radio-item"
      :class="{
        'is-selected': inputSelected,
      }"
      :title="inputLabel"
      :placeholder="inputPlaceholder"
      v-model="inputValue"
      @focus="inputSelected = true"
    />
  </div>
</template>

<script>
import {ref, computed, watch, watchEffect} from 'vue'
import Radio from './index'
import Field from '../field'
import CellItem from '../cell-item'
import InputItem from '../input-item'
import radioMixin from './mixins'

export default {
  name: 'ui-radio-list',

  mixins: [radioMixin],

  components: {
    [Radio.name]: Radio,
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [InputItem.name]: InputItem,
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
      default: '',
    },
    hasInput: {
      type: Boolean,
      default: false,
    },
    inputLabel: {
      type: String,
      default: '',
    },
    inputPlaceholder: {
      type: String,
      default: '',
    },
    alignCenter: {
      type: Boolean,
      default: false,
    },
    isSlotScope: {
      type: Boolean,
      default: undefined,
    },
    // Mixin Props
    // icon: {
    //   type: String,
    //   default: 'checked',
    // },
    // iconInverse: {
    //   type: String,
    //   default: 'check',
    // },
    // iconDisabled: {
    //   type: String,
    //   default: 'check-disabled',
    // },
    // iconSvg: {
    //   type: Boolean,
    //   default: false,
    // },
    // iconSize: {
    //   type: String,
    //   default: 'md',
    // },
    // iconPosition: {
    //   type: String,
    //   default: 'left',
    // },
  },
  setup(props, {emit, slots}) {
    const selectedValue = ref(props.value)
    const inputSelected = ref(false)
    const inputValue = ref('')

    const hasSlot = computed(() => (props.isSlotScope !== undefined ? props.isSlotScope : !!slots.default))
    const withoutIcon = computed(() => props.isSlotScope && !props.icon)

    const currentValue = computed(() => {
      if (inputSelected.value) {
        return inputValue.value
      } else {
        return selectedValue.value
      }
    })
    watch(currentValue, val => {
      emit('input', val)
    })
    watchEffect(
      () => props.value,
      val => {
        if (val !== selectedValue.value) {
          selectedValue.value = val
        }
      },
    )
    const selected = (option, index) => {
      selectedValue.value = option.value
      inputSelected.value = false
      inputValue.value && (inputValue.value = '')
      emit('change', option, index)
    }
    const select = value => {
      selectedValue.value = value
      inputSelected.value = false
    }
    const selectByIndex = index => {
      const item = props.options[index]
      if (item) {
        select(item.value)
      }
    }
    return {
      selectedValue,
      inputSelected,
      inputValue,
      currentValue,
      hasSlot,
      withoutIcon,
      selected,
      select,
      selectByIndex,
    }
  },
}

</script>

<style lang="stylus">
.ui-radio-item
  .ui-radio
    margin-top 0
    margin-bottom 0

.ui-radio-list
  .ui-cell-item-body.multilines .ui-cell-item-title
    font-weight font-weight-medium
  &.is-align-center
    .ui-cell-item-content
      text-align center
    .ui-cell-left,
    .ui-cell-right
      display none
</style>

