<template>
  <div class="ui-example-child ui-example-child-textarea ui-example-child-textarea-0">
    <ui-field>
      <ui-textarea-item
        ref="demo0"
        title="普通"
        autosize
        class="example"
        v-model="value"
        placeholder="普通文本域"
      />
      <ui-textarea-item
        ref="demo0"
        title="自动适应"
        class="example"
        v-model="value"
        :autosize="true"
        :rows="1"
        placeholder="最大高度100px 超过出现滚动条"
        :max-height="150"
      />
      <ui-textarea-item
        ref="demo0"
        title="禁用"
        class="example"
        :autosize="true"
        value="禁用文本域, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述"
        placeholder="500字以内"
        :max-height="150"
        disabled
      />
      <ui-textarea-item
        ref="demo0"
        title="只读"
        class="example"
        :autosize="true"
        value="只读文本域, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述"
        placeholder="500字以内"
        :max-height="150"
        readonly
      />
    </ui-field>
  </div>
</template>

<script>
import {TextareaItem, Field} from '@csii/vx-mobile'
import {ref} from 'vue'

export default {
  name: 'tips-demo',
  /* DELETE */
  title: '普通文本域',
  /* DELETE */
  setup() {
    const value = ref('')
    return {
      value,
    }
  },
  components: {
    [TextareaItem.name]: TextareaItem,
    [Field.name]: Field,
  },
}

</script>
