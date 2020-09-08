<template>
  <div class="ui-example-child ui-example-child-check ui-example-child-check-4">
    <ui-field title="复选列表">
      <ui-check-list
        :options="fruits"
        v-model="favorites"
      />
    </ui-field>
	</div>
</template>

<script>import {Field, CheckList} from '@csii/vx-mobile'

export default {
  name: 'check-demo',
  components: {
    [Field.name]: Field,
    [CheckList.name]: CheckList,
  },
  data() {
    return {
      favorites: ['apple'],
      fruits: [
        {value: 'watermelon', label: '西瓜'},
        {value: 'apple', label: '苹果'},
        {value: 'banana', label: '香蕉'},
        {value: 'orange', label: '橙子'},
        {value: 'tomato', label: '西红柿', disabled: true},
      ],
    }
  },
}
</script>

<style lang="stylus" scoped>
.ui-example-child
  font-size 28px
</style>
