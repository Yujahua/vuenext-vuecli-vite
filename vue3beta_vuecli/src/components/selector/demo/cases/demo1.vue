<template>
  <div class="ui-example-child ui-example-child-selector ui-example-child-selector-1">
    <ui-field>
      <ui-field-item
        title="自定义"
        :content="selectorValue"
        @click="showSelector"
        arrow
        solid
      />
    </ui-field>
    <ui-selector
      v-model="isSelectorShow"
      :data="data[0]"
      hide-title-bar
      large-radius
      is-check
      iconSize="lg"
      @choose="onSelectorChoose"
    >
      <template class="selector-header" v-slot:header>
        Header Slot
      </template>
      <template v-slot="{ option, index, selected }">
        <!-- <div class="ui-selector-custom-brief">{{ option.text }}使用v-slot</div> -->
        <div class="selector-item-body" :class="{disabled: option.disabled, selected}">
          <div class="selector-item-left">
            <span class="holder" v-text="option.value"></span>
          </div>
          <div class="selector-item-content">
            <p class="selector-item-title" v-text="option.text"></p>
            <p class="selector-item-brief" v-text="`${option.describe}-${index}`"></p>
          </div>
        </div>
      </template>
      <template class="selector-footer" v-slot:footer>
        Footer Slot
      </template>
    </ui-selector>
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue'
import {Selector, Field, FieldItem} from '@csii/vx-mobile'

export default {
  name: 'selector-demo',
  /* DELETE */
  title: '自定义选项',
  titleEnUS: 'Custom options',
  height: 550,
  /* DELETE */
  components: {
    [Selector.name]: Selector,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
  },
  setup() {
    const state = reactive({
      isSelectorShow: false,
      data: [
        [
          {
            value: 'A',
            text: '选项一',
            describe: '使用v-slot',
          },
          {
            value: 'B',
            text: '选项二',
            describe: '使用v-slot',
          },
          {
            value: 'C',
            text: '选项三',
            describe: '使用v-slot',
            disabled: true,
          },
          {
            value: 'D',
            text: '选项四',
            describe: '使用v-slot',
          },
        ],
      ],
      selectorValue: '',
    })
    const showSelector = () => {
      state.isSelectorShow = true
    }
    const onSelectorChoose = ({text}) => {
      state.selectorValue = text
    }
    return {
      ...toRefs(state),
      showSelector,
      onSelectorChoose,
    }
  },
}

</script>

<style lang="stylus">
.ui-example-child-selector-1
  .selector-header, .selector-footer
    padding 15px 40px
    font-size 16px
    color #ccc
  .selector-item-body
    display flex
    align-items center
    &.selected
      .selector-item-content
        color #2f86f6
    &.disabled
      opacity .3
    .selector-item-left
      flex-shrink 0
      margin-right 32px
      .holder
        display block
        width 88px
        height 88px
        border-radius 44px
        background-color #e6e6e6
        font-size 32px
        font-weight 500
        color #2f86f6
        text-align center
        line-height 88px
    .selector-item-content
      flex 1
      color #111a34
      font-size 32px
      line-height 1.2
      .selector-item-title
        line-height 1.2
      .selector-item-brief
        color #858b9c
        font-size 24px
        line-height 1.4
        margin-top 8px
</style>
