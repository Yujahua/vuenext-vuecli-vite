/* eslint comma-dangle: ["error", "always-multiline"] */

// Import components core
// import './_style/global.styl'
import {transformCamelCase, warn} from './_util'
import Icon from './icon'
// import ActivityIndicator from './activity-indicator'
// import ActionBar from './action-bar'
// import ActionSheet from './action-sheet'
// import InputItem from './input-item'
// import NumberKeyboard from './number-keyboard'
// import Button from './button'
// import Popup from './popup'
// import PopupTitleBar from './popup-title-bar'
// import Toast from './toast'
// import Dialog from './dialog'
// import Transition from './transition'
// import Tag from './tag'
// import Stepper from './stepper'
// import Field from './field'
// import FieldItem from './field-item'
// import CellItem from './cell-item'
// import Switch from './switch'
// import Agree from './agree'
// import Amount from './amount'
/* @init<%import ${componentNameUpper} from './${componentName}'%> */

// Totally importing reminder
warn(
  'You are using a whole package of csii-vx-mobile, ' +
    'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.',
  'warn',
)

/* global MAN_VERSION */
const version = /* @echo MAN_VERSION */ MAN_VERSION

export const components = {
  Icon,
//   ActivityIndicator,
//   Button,
//   NumberKeyboard,
//   ActionBar,
//   ActionSheet,
//   InputItem,
//   Popup,
//   PopupTitleBar,
//   Dialog,
//   Toast,
//   Transition,
//   Tag,
//   Stepper,
//   Field,
//   FieldItem,
//   CellItem,
//   Switch,
//   Agree,
//   Amount,
  /* @init<%${componentNameUpper},%> */
}

// Define plugin installation method
const install = function(Vue) {
  if (!Vue || install.installed) {
    return
  }

  // Register global components
  const componentsNames = Object.keys(components)
  componentsNames.forEach(name => {
    const component = components[name]
    if (component.name) {
      Vue.component(component.name, component) // kebab-case
      Vue.component(transformCamelCase(`-${component.name}`), component) // PascalCase
    }
  })

  // Mount to prototype
  // Vue.prototype.$toast = Toast
  // Vue.prototype.$dialog = Dialog
  // Vue.prototype.$actionsheet = ActionSheet
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// xport components
export {
  install,
  version,
  Icon,
//   ActivityIndicator,
//   Button,
//   NumberKeyboard,
//   ActionBar,
//   ActionSheet,
//   InputItem,
//   Popup,
//   PopupTitleBar,
//   Dialog,
//   Toast,
//   Transition,
//   Tag,
//   Stepper,
//   Field,
//   FieldItem,
//   CellItem,
//   Switch,
//   Agree,
//   Amount,
  /* @init<%${componentNameUpper},%> */
}

export default {
  install,
  version,
}
