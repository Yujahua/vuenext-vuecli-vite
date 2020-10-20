import {createApp, onMounted, ref, getCurrentInstance, onBeforeUnmount} from 'vue'
// import Vue from 'vue'
import TipOptions from './tip'
import {randomId} from '../_util'
// const Tip = Vue.extend(TipOptions)

export default {
  name: 'ui-tip',

  props: {
    placement: {
      type: String,
      default: 'top',
    },
    name: {
      type: [String, Number],
      default() {
        return randomId('tip')
      },
    },
    icon: {
      type: String,
    },
    iconSvg: {
      type: Boolean,
      default: false,
    },
    content: {
      type: [String, Number],
      default: '',
    },
    closable: {
      type: Boolean,
      default: true,
    },
    fill: {
      type: Boolean,
      default: false,
    },
    offset: {
      type: Object,
      default() {
        return {top: 0, left: 0}
      },
    },
  },
  setup(props, {emit}) {
    const wrapperEl = ref(null)
    const that = getCurrentInstance()
    const getFirstScrollWrapper = node => {
      if (node === null || node === document.body) {
        return node
      }

      const overflowY = window.getComputedStyle(node).overflowY
      const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden'

      if (isScrollable && node.scrollHeight > node.clientHeight) {
        return node
      } else {
        return getFirstScrollWrapper(node.parentNode)
      }
    }
    onMounted(() => {
      wrapperEl.value = getFirstScrollWrapper(that.$el)
    })
    const tipVM = ref(null)
    const hide = () => {
      if (tipVM.value && tipVM.value.$el.parentNode !== null) {
        tipVM.value.$el.parentNode.removeChild(tipVM.value.$el)
        emit('hide', props.name)
      }
    }
    const getOrNewTip = () => {
      if (tipVM.value) {
        return tipVM.value
      }
      const newTipVM = (tipVM.value = createApp(
        Object.assign(TipOptions, {
          propsData: {
            icon: props.icon,
            iconSvg: props.iconSvg,
            placement: props.placement,
            content: props.content,
            closable: props.closable,
            name: props.name,
          },
        }),
      ).mount())
      newTipVM.$on('close', hide)

      return newTipVM
    }
    onBeforeUnmount(() => {
      if (tipVM.value) {
        const el = tipVM.value.$el
        const parent = el.parentNode
        if (parent) {
          parent.removeChild(el)
        }
        tipVM.value.$destroy()
      }
    })
    const addEventHandle = (old, fn) => {
      if (!old) {
        return fn
      } else if (Array.isArray(old)) {
        return old.indexOf(fn) > -1 ? old : old.concat(fn)
      } else {
        return old === fn ? old : [old, fn]
      }
    }
    const getSize = node => {
      return {
        width: node.offsetWidth,
        height: node.offsetHeight,
      }
    }
    const getPosition = (node, wrapper) => {
      let x = 0
      let y = 0
      let el = node

      while (el) {
        x += el.offsetLeft
        y += el.offsetTop

        if (el === wrapper || el === document.body || el === null) {
          break
        }

        el = el.offsetParent
      }

      return {x, y}
    }
    const layout = () => {
      if (!tipVM.value) {
        return
      }

      const tipEl = tipVM.value.$el
      const referenceEl = that.$el
      const delta = getPosition(that.$el, wrapperEl.value)
      const size = getSize(that.$el, wrapperEl.value)
      const offsetTop = props.offset.top || 0
      const offsetLeft = props.offset.left || 0

      let tipElWidth = tipEl.offsetWidth
      let tipElHeight = tipEl.offsetHeight
      let cssText = ''

      if (props.fill && (props.placement === 'top' || props.placement === 'bottom')) {
        tipElWidth = size.width
        cssText += `width: ${tipElWidth}px;`
      }

      if (props.fill && (props.placement === 'left' || props.placement === 'right')) {
        tipElHeight = size.height
        cssText += `height: ${tipElHeight}px;`
      }

      switch (props.placement) {
        case 'left':
          delta.y += (referenceEl.offsetHeight - tipElHeight) / 2
          delta.x -= tipElWidth + 10
          break

        case 'right':
          delta.y += (referenceEl.offsetHeight - tipElHeight) / 2
          delta.x += referenceEl.offsetWidth + 10
          break

        case 'bottom':
          delta.y += referenceEl.offsetHeight + 10
          delta.x += (referenceEl.offsetWidth - tipElWidth) / 2
          break

        default:
          delta.y -= tipElHeight + 10
          delta.x += (that.$el.offsetWidth - tipElWidth) / 2
          break
      }

      cssText += `position: absolute; top: ${delta.y + offsetTop}px; left: ${delta.x + offsetLeft}px;`
      tipVM.value.$el.style.cssText = cssText
    }
    const show = () => {
      const getTipVM = getOrNewTip()

      if (getTipVM.$el.parentNode !== wrapperEl.value) {
        wrapperEl.value.appendChild(getTipVM.$el)
      }

      layout()
      emit('show', props.name)
    }
    return {
      wrapperEl,
      getOrNewTip,
      tipVM,
      hide,
      addEventHandle,
      getSize,
      getPosition,
      show,
      layout,
    }
  },

  /**
   * Only render the first node of slots
   * and add tip tirgger handler on it
   */
  render() {
    // eslint-disable-line no-unused-vars
    if (!this.$slots.default || !this.$slots.default.length) {
      return this.$slots.default
    }

    let firstNode = null
    this.$slots.default.some(node => {
      firstNode = node
      return !!node.data
    })

    if (firstNode) {
      const on = (firstNode.data.on = firstNode.data.on || {})
      const nativeOn = (firstNode.data.nativeOn = firstNode.data.nativeOn || {})

      on.click = this.addEventHandle(on.click, this.show)
      nativeOn.click = this.addEventHandle(nativeOn.click, this.show)
    }

    return firstNode
  },
}
