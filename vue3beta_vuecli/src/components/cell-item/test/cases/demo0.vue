<template>
  <div class="ui-example-child ui-example-child-cell-item ui-example-child-cell-item-0">
    <ui-field>
      <ui-cell-item title="普通条目" />
      <ui-cell-item title="动作条目" arrow />
      <ui-cell-item title="禁用条目" disabled />
    </ui-field>
  </div>
</template>

<script>import {Field, CellItem} from '@csii/vx-mobile'

export default {
  name: 'cell-item-demo',

  components: {
    [Field.name]: Field,
    [CellItem.name]: CellItem,
  },

  data() {
    return {
      open: false,
    }
  },
}
</script>
