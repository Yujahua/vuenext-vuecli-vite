<template>
  <div class="ui-example load-more">
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

export default {...createDemoModule('load-more', [Demo0])}

</script>
<style>
.selecotor-gidc .ui-example-section .ui-example-content{
  background-color: #fff;
  padding: .4rem;
}
</style>
