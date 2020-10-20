/* eslint comma-dangle: ["error", "always-multiline"] */
const path = require('path')
const pk = path.resolve(__dirname, '../package.json')

// Import components core
import './_style/global.styl'
import {transformCamelCase, warn} from './_util'
import ActionBar from './action-bar'
import ActionSheet from './action-sheet'
import ActivityIndicator from './activity-indicator'
import Agree from './agree'
import Amount from './amount'
import BankList from './bank-list'
import Bill from './bill'
import BottomTab from './bottom-tab'
import Button from './button'
import Captcha from './captcha'
import Cashier from './cashier'
import CellItem from './cell-item'
import Chart from './chart'
import Check from './check'
import CheckBox from './check-box'
import CheckGroup from './check-group'
import CheckList from './check-list'
import Codebox from './codebox'
import Col from './col'
import DatePicker from './date-picker'
import DetailItem from './detail-item'
import Dialog from './dialog'
import DropMenu from './drop-menu'
import Field from './field'
import FieldItem from './field-item'
import GraphicList from './graphic-list'
import Icon from './icon'
import ImageReader from './image-reader'
import ImageViewer from './image-viewer'
import InputItem from './input-item'
import Landscape from './landscape'
import LoadMore from './load-more'
import More from './more'
import NumberKeyboard from './number-keyboard'
import NoticeBar from './notice-bar'
import Popup from './popup'
import PopupTitleBar from './popup-title-bar'
import Picker from './picker'
import Progress from './progress'
import Radio from './radio'
import RadioBox from './radio-box'
import RadioGroup from './radio-group'
import RadioList from './radio-list'
import Refresh from './refresh'
import ResultPage from './result-page'
import Row from './row'
import Ruler from './ruler'
import ScrollView from './scroll-view'
import ScrollViewMore from './scroll-view-more'
import ScrollViewRefresh from './scroll-view-refresh'
import Selector from './selector'
import SelectorGidc from './selector-gidc'
import Skeleton from './skeleton'
import Slider from './slider'
import Stepper from './stepper'
import Steps from './steps'
import Swiper from './swiper'
import SwiperItem from './swiper-item'
import Switch from './switch'
import TabBar from './tab-bar'
import TabPane from './tab-pane'
import TabPicker from './tab-picker'
import Tabs from './tabs'
import Tag from './tag'
import TextareaItem from './textarea-item'
import Tip from './tip'
import Toast from './toast'
import Transition from './transition'
import VerifyCode from './verify-code'
import WaterMark from './water-mark'
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
  ActionBar,//测
  ActionSheet,//测
  ActivityIndicator,//测
  Agree,//测
  Amount,//测
  BankList,//测
  Bill,//测
  BottomTab,//测
  Button,//测
  Captcha,//测
  Cashier,//测
  CellItem,//测
  Chart,//测
  Check,//测
  CheckBox,//测
  CheckGroup,//测
  CheckList,//测
  Codebox,//测
  Col,//测
  DatePicker,//测
  DetailItem,//测
  Dialog,//测
  DropMenu,//测
  Field,//测
  FieldItem,//测
  GraphicList,//测
  Icon,//测
  ImageReader,//测
  ImageViewer,
  InputItem,//测
  Landscape,//测
  LoadMore,//测
  More,
  NoticeBar,//测
  NumberKeyboard,//测
  Picker,//测
  Popup,//测
  PopupTitleBar,//测
  Progress,
  Radio,//测
  RadioGroup,//测
  RadioBox,//测
  RadioList,//测
  Refresh,
  ResultPage,
  Row,
  Ruler,
  ScrollView,
  ScrollViewRefresh,
  ScrollViewMore,
  Selector,
  SelectorGidc,
  Skeleton,//测
  Slider,//测
  Stepper,//测
  Steps,//测
  Swiper,//测
  SwiperItem,//测
  Switch,//测
  TabBar,//测
  TabPane,
  TabPicker,
  Tabs,
  Tag,//测
  TextareaItem,//测
  Tip,//测
  Toast,//测
  Transition,//测
  VerifyCode,//测
  WaterMark,//测
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

// export components
export default{
  install,
  version,
  Button,
  ...components,
}

// export default {
//   install,
//   version,
// }
