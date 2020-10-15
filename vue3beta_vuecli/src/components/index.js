/* eslint comma-dangle: ["error", "always-multiline"] */
const path = require('path')
const pk = path.resolve(__dirname, '../package.json')

// Import components core
import './_style/global.styl'
import {transformCamelCase, warn} from './_util'
import Icon from './icon'
import ActivityIndicator from './activity-indicator'
// import ActionBar from './action-bar'
// import ActionSheet from './action-sheet'
// import NumberKeyboard from './number-keyboard'
import Button from './button'
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
// import Bill from './bill'
// import WaterMark from './water-mark'
// import DetailItem from './detail-item'
// import Codebox from './codebox'
// import Captcha from './captcha'
// import GraphicList from './graphic-list'
// import BankList from './bank-list'
// import BottomTab from './bottom-tab'
// import ImageReader from './image-reader'
// import Cashier from './cashier'
// import Swiper from './swiper'
// import SwiperItem from './swiper-item'
// import Chart from './chart'
// import Check from './check'
// import CheckBox from './check-box'
// import CheckGroup from './check-group'
// import CheckList from './check-list'
// import DatePicker from './date-picker'
// import Picker from './picker'
// import Col from './col'
// import Radio from './radio'
// import RadioGroup from './radio-group'
// import RadioBox from './radio-box'
// import RadioList from './radio-list'
// import DropMenu from './drop-menu'
// import Landscape from './landscape'
// import TabBar from './tab-bar'
// import NoticeBar from './notice-bar'
// import InputItem from './input-item'
// import LoadMore from './load-more'
// import VerifyCode from './verify-code'
// import Tip from './tip'
// import TextareaItem from './textarea-item'
// import Steps from './steps'
// import Slider from './slider'
// import Skeleton from './skeleton'
// import Row from './row'
// import ResultPage from './result-page'
// import Progress from './progress'
// import Tabs from './tabs'
// import TabPane from './tab-pane'
// import Ruler from './ruler'
// import TabPicker from './tab-picker'
// import ScrollView from './scroll-view'
// import ScrollViewRefresh from './scroll-view-refresh'
// import ScrollViewMore from './scroll-view-more'
// import Selector from './selector'
// import SelectorGidc from './selector-gidc'
// import Refresh from './refresh'
// import More from './more'
// import ImageViewer from './image-viewer'
/* @init<%import ${componentNameUpper} from './${componentName}'%> */

// Totally importing reminder
warn(
  'You are using a whole package of csii-vx-mobile, ' +
    'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.',
  'warn',
)

const version = pk
// /* global MAN_VERSION */
// const version = /* @echo MAN_VERSION */ MAN_VERSION

export const components = {
  Icon,
  ActivityIndicator,
  Button,
  // NumberKeyboard,
  // ActionBar,
  // ActionSheet,
  // Popup,
  // PopupTitleBar,
  // Dialog,
  // Toast,
  // Transition,
  // Tag,
  // Stepper,
  // Field,
  // FieldItem,
  // CellItem,
  // Switch,
  // Agree,
  // Amount,
  // Bill,
  // WaterMark,
  // DetailItem,
  // Codebox,
  // Captcha,
  // GraphicList,
  // BankList,
  // BottomTab,
  // ImageReader,
  // Cashier,
  // Swiper,
  // SwiperItem,
  // Chart,
  // Check,
  // CheckBox,
  // CheckGroup,
  // CheckList,
  // DatePicker,
  // Picker,
  // Col,
  // Radio,
  // RadioGroup,
  // RadioBox,
  // RadioList,
  // DropMenu,
  // Landscape,
  // TabBar,
  // NoticeBar,
  // InputItem,
  // LoadMore,
  // VerifyCode,
  // Tip,
  // TextareaItem,
  // Steps,
  // Slider,
  // Skeleton,
  // Row,
  // ResultPage,
  // Progress,
  // Tabs,
  // TabPane,
  // Ruler,
  // TabPicker,
  // ScrollView,
  // ScrollViewRefresh,
  // ScrollViewMore,
  // Selector,
  // SelectorGidc,
  // Refresh,
  // More,
  // ImageViewer,
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
  ActivityIndicator,
  Button,
  // NumberKeyboard,
  // ActionBar,
  // ActionSheet,
  // Popup,
  // PopupTitleBar,
  // Dialog,
  // Toast,
  // Transition,
  // Tag,
  // Stepper,
  // Field,
  // FieldItem,
  // CellItem,
  // Switch,
  // Agree,
  // Amount,
  // Bill,
  // WaterMark,
  // DetailItem,
  // Codebox,
  // Captcha,
  // GraphicList,
  // BankList,
  // BottomTab,
  // ImageReader,
  // Cashier,
  // Swiper,
  // SwiperItem,
  // Chart,
  // Check,
  // CheckBox,
  // CheckGroup,
  // CheckList,
  // DatePicker,
  // Picker,
  // Col,
  // Radio,
  // RadioGroup,
  // RadioBox,
  // RadioList,
  // DropMenu,
  // Landscape,
  // TabBar,
  // NoticeBar,
  // InputItem,
  // LoadMore,
  // VerifyCode,
  // Tip,
  // TextareaItem,
  // Steps,
  // Slider,
  // Skeleton,
  // Row,
  // ResultPage,
  // Progress,
  // Tabs,
  // TabPane,
  // Ruler,
  // TabPicker,
  // ScrollView,
  // ScrollViewRefresh,
  // ScrollViewMore,
  // Selector,
  // SelectorGidc,
  // Refresh,
  // More,
  // ImageViewer,
  /* @init<%${componentNameUpper},%> */
}

export default {
  install,
  version,
}
