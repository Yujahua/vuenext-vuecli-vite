<template>
  <div class="ui-example verify-code">
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

export default {
  ...createDemoModule('verify-code', [Demo0]),
}

</script>

<style lang="stylus">
.ui-example.single-component
  position relative
</style>
