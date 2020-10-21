<template>
  <div class="ui-example tag">
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

export default {...createDemoModule('tag', [Demo0, Demo1, Demo2, Demo3, Demo4])}

</script>

<style lang="stylus">
.ui-example-child-tag
  display flex
  align-items center
  padding v-gap-md h-gap-lg
  background color-bg-base
  .ui-tag
    margin-right h-gap-sm
</style>
