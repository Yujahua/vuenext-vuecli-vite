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

<script>import {TextareaItem, Field} from '@csii/vx-mobile'

export default {
  name: 'tips-demo',
  title: '错误提示',
  titleEnUS: 'error-tip',
  data() {
    return {
      value: '申请理赔xxx',
    }
  },
  components: {
    [TextareaItem.name]: TextareaItem,
    [Field.name]: Field,
  },
  mounted() {
    // this.$refs.demo1.focus()
  },
  methods: {
    blur() {
      console.log('blur')
    },
    keyup(e) {
      console.log('keyup', e)
    },
    focus() {
      console.log('focus')
    },
    keydown(e) {
      console.log('keydown', e)
    },
    change(v) {
      console.log('change', v)
    },
  },
}
</script>
