<template>
  <div class="ui-example-child ui-example-child-cell-item ui-example-child-cell-item-0">
    <ui-field>
      <ui-cell-item title="普通条目" />
      <ui-cell-item title="动作条目" arrow @click="onClick" />
      <ui-cell-item title="禁用条目" disabled no-border/>
    </ui-field>
  </div>
</template>

<script>
import {ref} from 'vue'
import {Field, CellItem, Dialog, Icon} from '@csii/vx-mobile'

export default {
  name: 'cell-item-demo',

  components: {
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [Icon.name]: Icon,
  },
  setup() {
    const onClick = () =>
      Dialog.alert({
        content: '点击了',
      })
    return {
      open: ref(false),
      onClick,
    }
  },
}

</script>
