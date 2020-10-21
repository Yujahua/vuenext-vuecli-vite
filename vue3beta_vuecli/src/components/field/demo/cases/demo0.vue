<template>
  <div class="ui-example-child ui-example-child-field ui-example-child-field-0">
    <ui-field title="区域标题" brief="区域描述性文本，可根据具体场景配置">
      <slot name="action">
        <div class="action-container" @click="onClick">
          操作 <ui-icon name="rectangle"></ui-icon>
        </div>
      </slot>
      <slot name="footer">
        <p>区域页脚区域内容插槽</p>
      </slot>
      <ui-field-item solid title="标题区域" placeholder="提示文本" />
      <ui-field-item solid title="标题区域" content="内容文本" addon="次要信息" />
      <ui-field-item solid title="附加内容" content="正文内容">
        <slot name="children">
          <p>这是子内容区域</p>
        </slot>
      </ui-field-item>
      <ui-field-item solid title="动作条目" arrow @click="onClick" />
      <ui-field-item solid title="禁用条目" content="内容禁用状态" arrow disabled />
    </ui-field>
  </div>
</template>

<script>
import {ref} from 'vue'
import {Field, FieldItem, Dialog, Icon} from '@csii/vx-mobile'

export default {
  name: 'field-demo',

  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Icon.name]: Icon,
  },
  setup() {
    const open = ref(false)
    function onClick() {
      Dialog.alert({
        content: '点击了',
      })
    }
    return {
      open,
      onClick,
    }
  },
}

</script>

<style lang="stylus">
.ui-example-child-field-0
  .ui-field-action
    height 36px
    align-items flex-end
    .action-container
      display flex
      align-items center
      .ui-icon
        margin-left 10px
        color #C5CAD5
        font-size 16px
        width auto
        height auto
        line-height normal
</style>

