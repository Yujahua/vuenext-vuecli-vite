<template>
  <div class="ui-example drop-menu">
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
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'

export default {...createDemoModule('drop-menu', [Demo0, Demo1, Demo2, Demo3])}

</script>

<style lang="stylus">
.ui-example.drop-menu
  .ui-example-section
    position relative
    .ui-example-child
      position relative
      height 400px
      background color-bg-base
      overflow hidden
      .ui-drop-menu
        position absolute
        float left
        width 100%
        height 100%
        .ui-drop-menu-bar
          height drop-menu-height
        .ui-popup
          position absolute
      .content
        font-size font-body-normal
        text-align center
        line-height 400px
</style>