<template>
  <div class="ui-example-child ui-example-child-check ui-example-child-check-4">
    <ui-field title="复选列表">
      <ui-check-list
        v-model="favorites"
        iconPosition="left"
        :options="fruits"
      />
    </ui-field>
  </div>
</template>

<script>import {Field, CheckList} from '@csii/vx-mobile'

export default {
  name: 'check-demo',
  /* DELETE */
  title: '复选列表',
  titleEnUS: 'Check list',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [CheckList.name]: CheckList,
  },
  data() {
    return {
      favorites: ['apple'],
      fruits: [
        {value: 'watermelon', label: '西瓜', brief: '选项摘要描述'},
        {value: 'apple', label: '苹果', brief: '选项摘要描述'},
        {value: 'banana', label: '香蕉', brief: '选项摘要描述'},
        {value: 'orange', label: '橙子', brief: '选项摘要描述'},
        {value: 'tomato', label: '西红柿', brief: '选项摘要描述', disabled: true},
      ],
    }
  },
}
</script>

<style lang="stylus" scoped>
  .ui-example-child
    font-size 28px
</style>
