<template>
  <div class="ui-example-child ui-example-child-icon ui-example-child-icon-0">
    <div
      class="ui-example-item"
      v-for="icon in iconList"
      :key="icon"
    >
      <ui-icon
        :name="icon.split('/')[0]"
        size="lg"
      ></ui-icon>
      <p>{{ icon }}</p>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import {Icon} from '@csii/vx-mobile'

export default {
  name: 'icon-demo',
  /* DELETE */
  title: '字体图标',
  titleEnUS: 'Icon Font',
  align: 'center',
  background: '#fff',
  /* DELETE */
  components: {
    [Icon.name]: Icon,
  },
  setup() {
    return {
      iconList: ref([
        'rectangle',
        'right',
        'wrong',
        'arrow-left',
        'arrow-right',
        'arrow-up',
        'arrow-down',
        'invisible',
        'visible',
        'service',
        'setting',
        'close',
        'refresh',
        'edit',
        'sort',
        'info',
        'question',
        'security',
        'rmb',
        'wait',
        'check',
        'checked/success',
        'check-disabled',
        'clear/fail',
        'warn',
        'info-solid',
        'scan',
        'share',
        'back',
        'card-bag',
        'message',
        'order',
        'balance',
        'coupon',
        'address-book',
        'mobile-phone',
        'calendar',
        'home',
        'discovery',
        'switch',
        'time',
        'search',
        'user',
        'camera',
        'clock',
        'delete',
        'profession',
        'id-card',
        'authentication',
        'location',
        'filter',
        'motor-vehicle',
        'phone',
        'volumn',
      ]),
    }
  },
}

</script>
