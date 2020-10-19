<!--<template>
  <div :class='[clazz]'>
    <slot></slot>
  </div>
</template>-->

<script>
import {ref, computed} from 'vue'
export default {
  name: 'ui-col',
  props: {
    span: {
      type: Number,
      default: 0,
    },
  },
  setup(props, {parent}) {
    const clazz = ref('ui-col-' + props.span)
    const gutter = computed(() => {
      let parentObj = parent
      if (parentObj && parentObj.$options.componentName !== 'UiRow') {
        parentObj = parentObj.$parent
      }
      return parentObj ? parentObj.gutter : 0
    })
    return {
      clazz,
      gutter,
    }
  },
  render(h) {
    let style = {}

    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + 'px'
      style.paddingRight = style.paddingLeft
    }
    return h(
      'div',
      {
        class: [this.clazz],
        style,
      },
      this.$slots.default,
    )
  },
}

</script>

<style scoped>
  [class*=ui-col-] {
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box
  }
  .ui-col-0{
    display: none;
    width: 0%
  }
  .ui-col-1{
    width: 4.16667%
  }
  .ui-col-2{
    width: 8.33333%
  }
  .ui-col-3{
    width: 12.5%
  }
  .ui-col-4{
    width: 16.66667%
  }
  .ui-col-5{
    width: 20.83333%
  }
  .ui-col-6{
    width: 25%
  }
  .ui-col-7{
    width: 29.16667%
  }
  .ui-col-8{
    width: 33.33333%
  }
  .ui-col-9{
    width: 37.5%
  }
  .ui-col-10{
    width: 41.66667%
  }
  .ui-col-11{
    width: 45.83333%
  }.ui-col-12{
     width: 50%
   }
  .ui-col-13{
    width: 54.16667%
  }
  .ui-col-14{
    width: 58.33333%
  }
  .ui-col-15{
    width: 62.5%
  }
  .ui-col-16{
    left: 62.5%
  }
  .ui-col-17{
    width: 70.83333%
  }
  .ui-col-18{
    width: 75%
  }
  .ui-col-19{
    width: 79.16667%
  }
  .ui-col-20{
    width: 83.33333%
  }
  .ui-col-21{
    width: 87.5%
  }
  .ui-col-22{
    width: 91.66667%
  }
  .ui-col-23{
    width: 95.83333%
  }
  .ui-col-24{
    width: 100%
  }


</style>
