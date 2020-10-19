<template>
  <div class="ui-example-child ui-example-child-drop-menu ui-example-child-drop-menu-0">
    <ui-drop-menu :data="data" />
    <div class="content">正文区域</div>
  </div>
</template>

<script>
import {reactive} from 'vue'
import {DropMenu} from '@csii/vx-mobile'

export default {
  name: 'drop-menu-demo',
  /* DELETE */
  title: '基础下拉菜单',
  titleEnUS: 'Basic drop-down menu',
  height: 250,
  /* DELETE */
  components: {
    [DropMenu.name]: DropMenu,
  },
  setup() {
    const data = reactive([
      {
        text: '一级选项1',
        options: [
          {
            value: '0',
            text: '二级选项1',
          },
          {
            value: '1',
            text: '二级选项2',
          },
        ],
      },
    ])
    return {
      data,
    }
  },
}

</script>
