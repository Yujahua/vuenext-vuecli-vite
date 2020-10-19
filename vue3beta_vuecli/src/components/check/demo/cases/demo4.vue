<template>
  <div class="ui-example-child ui-example-child-check ui-example-child-check-4">
    <ui-field title="复选列表">
      <ui-check-list
        v-model="favorites"
        icon="right"
        icon-inverse=""
        :options="fruits"
      />
    </ui-field>
	</div>
</template>

<script>
import {Field, CheckList} from '@csii/vx-mobile'
import {reactive, toRefs} from 'vue'

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
  setup() {
    const state = reactive({
      favorites: ['apple'],
      fruits: [
        {value: 'watermelon', label: '西瓜'},
        {value: 'apple', label: '苹果'},
        {value: 'banana', label: '香蕉'},
        {value: 'orange', label: '橙子'},
        {value: 'tomato', label: '西红柿', disabled: true},
      ],
    })
    return {
      ...toRefs(state),
    }
  },
}

</script>

<style lang="stylus" scoped>
.ui-example-child
  font-size 28px
</style>
