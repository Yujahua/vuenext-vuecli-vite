<template>
  <div class="ui-example activity-indicator">
    <section class="ui-example-section" v-for="(demo, index) in demos" :key="index">
      <div class="ui-example-title" v-html="demo.title"></div>
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

export default {
  ...createDemoModule('activity-indicator', [Demo0, Demo1, Demo2]),
}

</script>

<style lang="stylus">
.ui-example.activity-indicator
  position relative
</style>