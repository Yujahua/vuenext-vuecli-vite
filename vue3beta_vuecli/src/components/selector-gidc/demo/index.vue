<template>
  <div class="ui-example selecotor-gidc">
    <section class="ui-example-section" v-for="(demo, index) in demos" :key="index">
      <div class="ui-example-title" v-html="demo.title || '基础'"></div>
      <div class="ui-example-describe" v-html="demo.describe"></div>
      <div class="ui-example-content">
        <component :is="demo"></component>
      </div>
    </section>
	</div>
</template>

<script>
import createDemoModule from '../../../../examples/create-demo-module'
import Demo0 from './cases/demo0'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import Demo4 from './cases/demo4'

export default {...createDemoModule('selecotor-gidc', [Demo0, Demo2, Demo3, Demo4])}

</script>
<style>
.selecotor-gidc .ui-example-section .ui-example-content{
  background-color: #fff;
  padding: .4rem;
}
</style>
