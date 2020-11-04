// import Vue from 'vue'
import {createApp} from 'vue'
import ToastOptions from './toast'
/**
 * Toast factory
 *
 * @param {Object} props
 * @return {Toast}
 */
const Toast = function({
  content = '',
  icon = '',
  iconSvg = false,
  duration = 3000,
  position = 'center',
  hasMask = false,
  parentNode = document.body,
}) {
  let vm = Toast._instance
  if (!vm) {
    // const ToastConstructor = Vue.extend(ToastOptions)
    vm = Toast._instance = createApp(ToastOptions, {
      content,
      icon,
      iconSvg,
      duration,
      position,
      hasMask,
    }).mount(document.createElement("span"))
  }
  if (!vm.$el.parentNode.parentNode) {
    parentNode.appendChild(vm.$el)
  }
  vm.show()

  return vm
}

// There is only one toast singleton
Toast._instance = null

/**
 * Hide toast
 */
Toast.hide = () => {
  // const ToastConstructor = Vue.extend(ToastOptions)
  if (Toast._instance instanceof Proxy && Toast._instance.visible) {
    Toast._instance.hide()
  }
}

/**
 * Show info toast
 * @param {string} content
 * @param {number=} [duration=3000]
 * @param {boolean=} [hasMask=false]
 * @param {node=} [parentNode=document.body]
 * @returns {Toast}
 */

Toast.info = (content = '', duration = 3000, hasMask = false, parentNode = document.body) => {
  return Toast({
    icon: '',
    content,
    duration,
    hasMask,
    parentNode,
  })
}

/**
 * Show succeed toast
 * @param {string} content
 * @param {number=} [duration=3000]
 * @param {boolean=} [hasMask=false]
 * @param {node=} [parentNode=document.body]
 * @returns {Toast}
 */

Toast.succeed = (content = '', duration = 3000, hasMask = false, parentNode = document.body) => {
  return Toast({
    icon: 'success',
    content,
    duration,
    hasMask,
    parentNode,
  })
}

/**
 * Show failed toast
 * @param {string} content
 * @param {number=} [duration=3000]
 * @param {boolean=} [hasMask=true]
 * @param {node=} [parentNode=document.body]
 * @returns {Toast}
 */

Toast.failed = (content = '', duration = 3000, hasMask = false, parentNode = document.body) => {
  return Toast({
    icon: 'fail',
    content,
    duration,
    hasMask,
    parentNode,
  })
}

/**
 * Show loading toast
 * @param {string} content
 * @param {number=} [duration=0]
 * @param {boolean=} [hasMask=false]
 * @param {node=} [parentNode=document.body]
 * @returns {Toast}
 */
Toast.loading = (content = '', duration = 0, hasMask = true, parentNode = document.body) => {
  return Toast({
    icon: 'spinner',
    iconSvg: true,
    content,
    duration,
    hasMask,
    parentNode,
  })
}

Toast.component = ToastOptions

export default Toast
