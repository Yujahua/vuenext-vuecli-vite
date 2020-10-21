<template>
  <div class="ui-example-child ui-example-child-tabs ui-example-child-tab-bar-4">
    <ui-tab-bar
      v-model="current"
      :items="items"
      :has-ink="false"
    >
      <template name="item" v-slot="{ item }">
        <div class="custom-item">
          <div class="icon">
            <ui-icon :name="item.icon" />
          </div>
          <div class="text">
            <span v-text="item.label"></span>
          </div>
        </div>
      </template>
    </ui-tab-bar>
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue'
import {TabBar, Icon} from '@csii/vx-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '自定义内容',
  titleEnUS: 'Custom Item',
  /* DELETE */
  components: {
    [TabBar.name]: TabBar,
    [Icon.name]: Icon,
  },
  setup() {
    let state = reactive({
      current: 1,
      items: [{name: 1, label: '首页', icon: 'home'}, {name: 2, label: '我的', icon: 'user'}],
    })
    return {
      ...toRefs(state),
    }
  },
}

</script>

<style lang="stylus">
.ui-example-child-tab-bar-4
  .custom-item
    display flex
    flex-direction column
    align-items center
    justify-content center
    height 100%
    flex 1
    .text
      font-size 20px
</style>

