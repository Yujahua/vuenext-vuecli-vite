<template>
  <div class="ui-example-child ui-example-child-input-item-2">
    <ui-field>
      <ui-input-item
        title="银行卡"
        type="bankCard"
        placeholder="bankCard xxxx xxxx xxxx xxxx"
      ></ui-input-item>
      <ui-input-item
        title="手机号"
        type="phone"
        v-model="phone"
        placeholder="phone xxx xxxx xxxx"
      ></ui-input-item>
      <ui-input-item
        title="金额"
        type="money"
        v-model="money"
        @keydown="onInputKeydown"
        @change="onInputChange"
        placeholder="money xx, xxx.xxxx"
      ></ui-input-item>
      <ui-input-item
        title="数字"
        type="digit"
        v-model="digit"
        placeholder="digit 0123456789"
      ></ui-input-item>
      <ui-input-item
        title="密码"
        type="password"
        placeholder="password *********"
      ></ui-input-item>
      <ui-input-item
        title="邮箱"
        type="email"
        placeholder="其他标准 html input 类型"
      ></ui-input-item>
    </ui-field>
  </div>
</template>

<script>
import {ref} from 'vue'
import {InputItem, Field} from '@csii/vx-mobile'

export default {
  name: 'input-item-demo',
  /* DELETE */
  title: '业务场景输入框',
  titleEnUS: 'Business scenario input',
  /* DELETE */
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
  },
  setup() {
    const phone = ref('13321234431')
    const money = ref('')
    const digit = ref('')
    const onInputKeydown = (name, event) => {
      console.log(`[CSII VX Mobile InputItem keydown] ${event.keyCode}`)
    }
    const onInputChange = (name, value) => {
      console.log(`[CSII VX Mobile InputItem change] ${value}`)
    }
    return {
      phone,
      money,
      digit,
      onInputKeydown,
      onInputChange,
    }
  },
}

</script>