<template>
  <div class="ui-example water-mark">
    <section class="ui-example-section" v-for="(demo, index) in demos" :key="index">
      <div class="ui-example-title" v-html="demo.title || '基础'"></div>
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

export default {
  ...createDemoModule('water-mark', [Demo0, Demo1]),
}

</script>

<style lang="stylus">
.ui-example.water-mark
  position relative
</style>