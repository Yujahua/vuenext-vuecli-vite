<template>
  <div>
    <ui-field-item
        :title="title"
        :content="selectorValue"
        :addon="addon"
        :solid="solid"
        :disablod="disabled"
        :arrow="arrow"
        @click="isSelectorShow=true"
    />
    <ui-selector v-model="isSelectorShow"
                 :data="data"
                 :default-value="defaultValue"
                 :title="selectorTitle"
                 :describe="describe"
                 :ok-text="okText"
                 :cancel-text="cancelText"
                 :large-radius="largeRadius"
                 :hide-title-bar="hideTitleBar"
                 :mask-closable="maskClosable"
                 :is-check="isCheck"
                 :max-height="maxHeight"
                 :min-height="minHeight"
                 :icon="icon"
                 :icon-inverse="iconInverse"
                 :icon-disabled="iconDisabled"
                 :icon-size="iconSize"
                 :icon-svg="iconSvg"
                 :icon-position="iconPosition"
                 :multi="multi"
                 @choose="onSelectorChoose"
                 @confirm="onSelectorConfirm"
    />
  </div>
</template>

<script>
import {ref, watch} from 'vue'
import FieldItem from '../field-item'
import Selector from '../selector'
export default {
  name: 'ui-selector-gidc',
  mixins: [FieldItem],
  components: {
    [FieldItem.name]: FieldItem,
    [Selector.name]: Selector,
  },
  props: {
    // title: {
    //   type: String,
    //   default: ''
    // },
    // content: {
    //   type: String,
    //   default: ''
    // },
    // addon: {
    //   type: String,
    //   default: ''
    // },
    // disabled: {
    //   type: Boolean,
    //   default: false
    // },
    // solid: {
    //   type: Boolean,
    //   default: false
    // },
    // arrow: {
    //   type: Boolean,
    //   default: false
    // },
    value: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default() {
        return []
      },
    },
    defaultValue: {
      default: '',
    },
    selectorTitle: {
      type: String,
      default: '',
    },
    describe: {
      type: String,
      default: '',
    },
    okText: {
      type: String,
      default: '',
    },
    isCheck: {
      type: Boolean,
      default: false,
    },
    maxHeight: {
      type: [Number, String],
      default: 'auto',
    },
    minHeight: {
      type: [Number, String],
      default: 'auto',
    },
    cancelText: {
      default() {
        return this.okText ? '取消' : ''
      },
    },
    largeRadius: {
      type: Boolean,
      default: false,
    },
    hideTitleBar: {
      type: Boolean,
      default: false,
    },
    maskClosable: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: 'checked',
    },
    iconPosition: {
      default: 'right',
    },
    iconInverse: {
      type: String,
      default: 'check',
    },
    iconDisabled: {
      type: String,
      default: 'check-disabled',
    },
    iconSize: {
      type: String,
      default: 'lg',
    },
    iconSvg: {
      type: Boolean,
      default: false,
    },
    multi: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const isSelectorShow = ref(false)
    const selectorValue = ref(props.value)
    const onSelectorChoose = item => {
      selectorValue.value = item.text
      emit('choose', item)
    }
    const onSelectorConfirm = array => {
      // 不是多选时终止confirm事件
      if (props.multi) {
        selectorValue.value = props.data
          .filter(item => array.includes(item.value))
          .map(item => item.text)
          .join(',')
        emit('confirm', array)
      } else {
        selectorValue.value = array.text
        emit('confirm', array)
      }
    }
    watch(
      () => props.value,
      val => {
        selectorValue.value = val
      },
    )
    watch(selectorValue, val => {
      emit('input', val)
    })
    return {
      isSelectorShow,
      selectorValue,
      onSelectorChoose,
      onSelectorConfirm,
    }
  },
}

</script>
