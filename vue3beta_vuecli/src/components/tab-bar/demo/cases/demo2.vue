<template>
  <div class="ui-example-child ui-example-child-tabs ui-example-child-tab-bar-2">
    <ui-tab-bar
      v-model="current"
      :items="items"
      :maxLength="5"
    />
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue'
import {TabBar} from '@csii/vx-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '滚动',
  titleEnUS: 'Scroll',
  /* DELETE */
  components: {
    [TabBar.name]: TabBar,
  },

  setup() {
    let state = reactive({
      current: 1,
      items: [
        {name: 1, label: '精选'},
        {name: 2, label: '全部'},
        {name: 3, label: '满减券'},
        {name: 4, label: '立减券'},
        {name: 5, label: '免息券'},
        {name: 6, label: '校园专享'},
        {name: 7, label: '夜间优惠'},
        {name: 8, label: '红包'},
      ],
    })
    return {
      ...toRefs(state),
    }
  },
}

</script>
