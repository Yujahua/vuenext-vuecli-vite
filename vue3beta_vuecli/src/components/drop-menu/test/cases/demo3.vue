<template>
  <div class="ui-example-child ui-example-child-drop-menu ui-example-child-drop-menu-3">
    <ui-drop-menu :data="data">
      <template v-slot="{ option }">
        <div class="ui-drop-menu-custom-title" v-text="option.text"></div>
        <div class="ui-drop-menu-custom-brief">{{ option.text }}【可使用slot-scope进行自定义描述】</div>
      </template>
    </ui-drop-menu>
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

<style lang="stylus">
.ui-example-child-drop-menu-3
  .ui-drop-menu-custom-title
    font-size 28px
    text-align center
  .ui-drop-menu-custom-brief
    font-size 20px
    color #999
    text-align center
</style>
