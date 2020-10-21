<template>
  <div class="ui-example steps">
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
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'
import Demo4 from './cases/demo4'
import Demo5 from './cases/demo5'
import Demo6 from './cases/demo6'
import Demo7 from './cases/demo7'
import Demo8 from './cases/demo8'

export default {...createDemoModule('steps', [Demo0, Demo1, Demo2, Demo3, Demo4, Demo5, Demo6, Demo7, Demo8])}

</script>

<style lang="stylus" scoped>
.ui-example-content
  background color-bg-base
</style>
