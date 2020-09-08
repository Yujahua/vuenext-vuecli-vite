<template>
  <div class="ui-example-child ui-example-child-drop-menu ui-example-child-drop-menu-0">
    <ui-drop-menu :data="data" />
    <div class="content">正文区域</div>
  </div>
</template>

<script>import {DropMenu} from '@csii/vx-mobile'

export default {
  name: 'drop-menu-demo',
  components: {
    [DropMenu.name]: DropMenu,
  },
  data() {
    return {
      data: [
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
      ],
    }
  },
}
</script>
