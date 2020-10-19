<template>
  <div class="ui-example-child ui-example-child-textarea ui-example-child-textarea-0">
    <ui-field>
      <ui-textarea-item
        ref="demo1"
        title="错误提示"
        class="example"
        v-model="value"
        @blur="blur"
        @change="change"
        @keyup="keyup"
        @keydown="keydown"
        @focus="focus"
        placeholder=""
        error="输入信息有误!"
      />

    </ui-field>
  </div>
</template>

<script>
import {ref} from 'vue'
import {TextareaItem, Field} from '@csii/vx-mobile'

export default {
  name: 'tips-demo',
  /* DELETE */
  title: '错误提示',
  titleEnUS: 'Error tips',
  /* DELETE */
  components: {
    [TextareaItem.name]: TextareaItem,
    [Field.name]: Field,
  },
  setup() {
    const value = ref('申请理赔xxx')
    const blur = () => {
      console.log('blur')
    }
    const keyup = e => {
      console.log('keyup', e)
    }
    const focus = () => {
      console.log('focus')
    }
    const keydown = e => {
      console.log('keydown', e)
    }
    const change = v => {
      console.log('change', v)
    }
    return {
      value,
      blur,
      keyup,
      focus,
      keydown,
      change,
    }
  },
}

</script>
