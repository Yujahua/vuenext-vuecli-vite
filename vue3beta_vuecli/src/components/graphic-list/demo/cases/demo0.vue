<template>
  <div class='md-example-child md-example-child-graphic-list'>
    <ui-graphic-list
      :arrow='arrow'
      :arrowAlign='arrowAlign'
      :iconTextAlign='iconTextAlign'
      :iconWidth='iconWidth'
      :iconHeight='iconHeight'
      :briefList='briefList'
      :columns='columns'
      :isVertical='isVertical'
      :imageUrl='imageUrl'
      :imageAlign='imageAlign'
      :isDel='isDel'></ui-graphic-list>
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue'
import {GraphicList} from '@csii/vx-mobile'

export default {
  name: 'graphic-list-demo',
  /* DELETE */
  title: '基本/Basic',
  describe: '基本/Basic',
  /* DELETE */
  components: {
    [GraphicList.name]: GraphicList,
  },
  setup() {
    let state = reactive({
      arrowAlign: 'middle',
      iconHeight: '',
      iconWidth: '24',
      arrow: true,
      columns: [
        {
          color: '#000',
          fontSize: 14,
          content: '显示文本',
        },
      ],
      iconTextAlign: 'left',
      path: '',
      isVertical: false,
      imageUrl: 'https://os.alipayobjects.com/rmsportal/OhSzVdRBnfwiuCK.png',
      briefList: [
        {
          brief: '',
          briefColor: '#000',
          fontSize: 14,
        },
      ],
      imageAlign: 'middle',
      isDel: false,
    })
    return {
      ...toRefs(state),
    }
  },
}

</script>

<style lang='stylus' scoped></style>
