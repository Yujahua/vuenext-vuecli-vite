<template>
  <div class='ui-example-child ui-example-child-single-component'>
    <ui-bottom-tab :data="options"></ui-bottom-tab>
	</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { BottomTab } from '@csii/vx-mobile'

export default {
  name: 'bottom-tab-demo',
  /* DELETE */
  title: '基本/Basic',
  describe: 'wap端配置底部菜单或者底部导航栏',
  height: 150,
  /* DELETE */
  components: {
    [BottomTab.name]: BottomTab
  },
  setup(){
    const state=reactive({
      options: [
        {
          'ActivatedImage': 'http://118.144.87.37/group1/M00/00/0C/rBAj6F2IKQKAIxyXAAAYK4uXIRg928.png',
          'path': '',
          'textContent': '首页',
          'defaultImage': 'http://118.144.87.37/group1/M00/00/0C/rBAj6F2IKQKAEA9tAAAX8keLFB4567.png'
        },
        {
          'ActivatedImage': 'http://118.144.87.37/group1/M00/00/0C/rBAj6F2IKQKAUYBwAAAvjkmzY8w525.png',
          'path': '',
          'textContent': '理财',
          'defaultImage': 'http://118.144.87.37/group1/M00/00/0C/rBAj6F2IKQKAdHpUAAAvJ8VDyj4588.png'
        },
        {
          'ActivatedImage': 'http://118.144.87.37/group1/M00/00/0C/rBAj6F2IKQKAW4cYAAAcvrINXsI629.png',
          'path': '',
          'textContent': '生活',
          'defaultImage': 'http://118.144.87.37/group1/M00/00/0C/rBAj6F2IKQKAPBSOAAAcSdcRWbk781.png'
        },
        {
          'ActivatedImage': 'http://118.144.87.37/group1/M00/00/0C/rBAj6F2IKQKASKzMAAA6rl2oSsA819.png',
          'path': '',
          'textContent': '我的',
          'defaultImage': 'http://118.144.87.37/group1/M00/00/0C/rBAj6F2IKQKAOxf4AAA5vIFjw0A639.png'
        }
      ]
    })
    return{
      ...toRefs(state)
    }
  },
}
</script>

<style lang='stylus' scoped>
</style>
