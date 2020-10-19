<template>
  <div class="ui-date-picker" :class="[type]">
    <ui-picker
      ref="picker"
      v-model="isPickerShow"
      :data="columnData"
      :cols="columnData.length"
      :default-value="columnDataDefault"
      :line-height="lineHeight"
      :title="title"
      :describe="describe"
      :ok-text="okText"
      :cancel-text="cancelText"
      :large-radius="largeRadius"
      :is-view="isView"
      :mask-closable="maskClosable"
      :keep-index="keepIndex"
      @initialed="$emit('initialed')"
      @change="onPickerChange"
      @confirm="onPickerConfirm"
      @cancel="onPickerCancel"
      @show="onPickerShow"
      @hide="onPickerHide"
    ></ui-picker>
  </div>
</template>

<script>
import {ref, reactive, computed, watch, onMounted, getCurrentInstance, set} from 'vue'
import Picker from '../picker'
import pickerMixin from '../picker/mixins'
import {toObject, toArray, warn} from '../_util'

// yyyy-MM-dd hh:mm:ss => Year-Month-Date Hour:Minute
const TYPE_FORMAT = {
  yyyy: 'Year',
  MM: 'Month',
  dd: 'Date',
  HH: 'Hour',
  hh: 'Hour',
  mm: 'Minute',
}

const TYPE_FORMAT_INVERSE = toObject(
  Object.keys(TYPE_FORMAT).map(item => {
    return {
      [TYPE_FORMAT[item]]: item,
    }
  }),
)

const TYPE_METHODS = {
  Year: 'getFullYear',
  Month: 'getMonth',
  Date: 'getDate',
  Hour: 'getHours',
  Minute: 'getMinutes',
}
/**
 * Determine whether year, month, date, etc of
 * the current date are equal to the given value
 * @params Date
 * @params year, month, date ...
 */
function isDateTimeEqual() {
  const methods = Object.keys(TYPE_METHODS).map(key => {
    return TYPE_METHODS[key]
  })
  const args = toArray(arguments)
  const date = args[0]

  let res = true
  if (!date) {
    res = false
    return res
  }
  for (let i = 1; i < args.length; i++) {
    const methodName = methods[i - 1]
    const curVal = date[methodName]() + Number(methodName === 'getMonth')
    const targetVal = +args[i]

    if (curVal !== targetVal) {
      res = false
      break
    }
  }

  return res
}
export default {
  name: 'ui-date-picker',

  mixins: [pickerMixin],

  components: {
    [Picker.name]: Picker,
  },

  props: {
    type: {
      // date, time, datetime， custom
      type: String,
      default: 'date',
    },
    customTypes: {
      // yyyy, MM, dd, hh, mm
      type: Array,
      default() {
        return []
      },
      validator(val) {
        let res = true
        val.forEach(type => {
          type = TYPE_FORMAT[type] || type
          /* istanbul ignore if */
          if (!(type in TYPE_METHODS)) {
            return (res = false)
          }
        })
        return res
      },
    },
    minDate: {
      type: Date,
    },
    maxDate: {
      type: Date,
    },
    defaultDate: {
      type: Date,
    },
    minuteStep: {
      type: Number,
      default: 1,
    },
    unitText: {
      type: Array,
      default() {
        return ['年', '月', '日', '时', '分']
      },
    },
    todayText: {
      type: String,
      default: '',
    },
    textRender: {
      type: [Function, String],
      default: '',
    },

    // Mixin Props
    // value: {
    //   type: Boolean,
    //   default: false
    // },
    // title: {
    //   type: String
    // },
    // describe: {
    //   type: String
    // },
    // okText: {
    //   type: String
    // },
    // cancelText: {
    //   type: String
    // },
    // isView: {
    //   type: Boolean,
    //   default: false
    // },
    // maskClosable: {
    //   type: Boolean,
    //   default: true,
    // }
  },
  setup(props, {emit}) {
    const isPickerShow = ref(false)
    const currentDateIns = ref(new Date())
    let columnData = reactive([])
    let oldColumnData = ref(null)
    let columnDataDefault = reactive([])
    let columnDataGenerator = reactive([])
    const picker = ref(null)
    const currentYear = computed(() => currentDateIns.value.getFullYear())
    const currentMonth = computed(() => currentDateIns.value.getMonth() + 1)
    const currentDate = computed(() => currentDateIns.value.getDate())
    const currentHours = computed(() => currentDateIns.value.getHours())
    const currentMinutes = computed(() => currentDateIns.value.getMinutes())
    const that = getCurrentInstance()
    const resetPickerColumn = () => {
      columnData.splice(0, columnData.length)
      oldColumnData.value = null
      columnDataDefault.splice(0, columnDataDefault.length)
      columnDataGenerator.splice(0, columnDataGenerator.length)
    }
    const getDefaultDate = () => {
      const defaultDate = props.defaultDate
      const minDate = props.minDate
      const maxDate = props.maxDate

      if (!defaultDate) {
        return defaultDate
      }

      if (minDate && defaultDate.getTime() < minDate.getTime()) {
        return minDate
      }

      if (maxDate && defaultDate.getTime() > maxDate.getTime()) {
        return maxDate
      }
      return defaultDate
    }
    const getGeneratorArguments = args => {
      const defaultArguments = {
        Year: currentYear.value,
        Month: currentMonth.value,
        Date: currentDate.value,
        Hour: currentHours.value,
        Minute: currentMinutes.value,
      }
      args.map(item => {
        // eslint-disable-next-line no-unused-expressions
        item && (defaultArguments[item.type] = item.value)
      })
      return defaultArguments
    }
    const generateData = (from, to, type, unit, step = 1, args = []) => {
      let count = from
      let text
      const data = []
      const defaultArgs = toArray(args).map(item => {
        return typeof item === 'object' ? item.value : item
      })

      while (count <= to) {
        if (props.textRender) {
          text = props.textRender.apply(that, [TYPE_FORMAT_INVERSE[type], ...defaultArgs, count])
        }
        data.push({
          text: text || `${count}${unit}`,
          value: count,
          typeFormat: TYPE_FORMAT_INVERSE[type] || type,
          type,
        })
        count += step
      }
      return data
    }
    const generateYearData = () => {
      const start = props.minDate ? props.minDate.getFullYear() : currentYear.value - 20
      const end = props.maxDate ? props.maxDate.getFullYear() : currentYear.value + 20
      /* istanbul ignore if */
      if (start > end) {
        warn('MinDate Year should be earlier than MaxDate')
        return
      }
      return generateData(start, end, 'Year', props.unitText[0], 1)
    }
    const generateMonthData = function() {
      const args = getGeneratorArguments(toArray(arguments))
      let start, end

      if (isDateTimeEqual(props.minDate, args.Year)) {
        start = props.minDate.getMonth() + 1
      } else {
        start = 1
      }

      if (isDateTimeEqual(props.maxDate, args.Year)) {
        end = props.maxDate.getMonth() + 1
      } else {
        end = 12
      }
      return generateData(start, end, 'Month', props.unitText[1] || '', 1, arguments)
    }
    const generateDateData = function() {
      const args = getGeneratorArguments(toArray(arguments))
      let start, end

      if (isDateTimeEqual(props.minDate, args.Year, args.Month)) {
        start = props.minDate.getDate()
      } else {
        start = 1
      }

      if (isDateTimeEqual(props.maxDate, args.Year, args.Month)) {
        end = props.maxDate.getDate()
      } else {
        end = new Date(args.Year, args.Month, 0).getDate()
      }
      const dateData = generateData(start, end, 'Date', props.unitText[2] || '', 1, arguments)

      if (
        isDateTimeEqual(currentDateIns.value, args.Year, args.Month) &&
        currentDate.value >= start &&
        currentDate.value <= end &&
        props.todayText
      ) {
        const currentDateIndex = currentDate.value - start
        const currentDateIn = dateData[currentDateIndex].text
        dateData[currentDateIndex].text = props.todayText.replace('&', currentDateIn)
      }
      return dateData
    }
    const generateHourData = function() {
      const args = getGeneratorArguments(toArray(arguments))
      let start, end

      if (isDateTimeEqual(props.minDate, args.Year, args.Month, args.Date)) {
        start = props.minDate.getHours()
      } else {
        start = 0
      }

      if (isDateTimeEqual(props.maxDate, args.Year, args.Month, args.Date)) {
        end = props.maxDate.getHours()
      } else {
        end = 23
      }

      /* istanbul ignore if */
      if (end < start) {
        end = 23
      }
      /* istanbul ignore if */
      if (start > end) {
        warn('MinDate Hour should be earlier than MaxDate')
        return
      }

      return generateData(start, end, 'Hour', props.unitText[3] || '', 1, arguments)
    }
    const generateMinuteData = function() {
      const args = getGeneratorArguments(toArray(arguments))
      let start, end

      if (isDateTimeEqual(props.minDate, args.Year, args.Month, args.Date, args.Hour)) {
        start = props.minDate.getMinutes()
      } else {
        start = 0
      }

      if (isDateTimeEqual(props.maxDate, args.Year, args.Month, args.Date, args.Hour)) {
        end = props.maxDate.getMinutes()
      } else {
        end = 59
      }

      return generateData(start, end, 'Minute', props.unitText[4] || '', props.minuteStep, arguments)
    }
    const initColumnDataGeneratorForDate = defaultDate => {
      columnDataGenerator = columnDataGenerator.concat([generateYearData, generateMonthData, generateDateData])
      if (defaultDate) {
        columnDataDefault.push(defaultDate.getFullYear())
        columnDataDefault.push(defaultDate.getMonth() + 1)
        columnDataDefault.push(defaultDate.getDate())
      } else {
        columnDataDefault.splice(0, columnDataDefault.length)
      }

      // columnDataDefault = defaultDate
      //     ? columnDataDefault.concat([
      //         defaultDate.getFullYear(),
      //         defaultDate.getMonth() + 1,
      //         defaultDate.getDate()
      //     ])
      //     : [];
    }
    const initColumnDataGeneratorForTime = defaultDate => {
      columnDataGenerator = columnDataGenerator.concat([generateHourData, generateMinuteData])
      if (defaultDate) {
        columnDataDefault.push(defaultDate.getHours())
        columnDataDefault.push(defaultDate.getMinutes())
      } else {
        columnDataDefault.splice(0, columnDataDefault.length)
      }
      // columnDataDefault = defaultDate
      //     ? columnDataDefault.concat([
      //         defaultDate.getHours(),
      //         defaultDate.getMinutes()
      //     ])
      //     : [];
    }
    const initColumnDataGeneratorForCustom = defaultDate => {
      props.customTypes.forEach(type => {
        type = TYPE_FORMAT[type] || type
        columnDataGenerator.push(that[`generate${type}Data`])
        if (defaultDate) {
          let value = defaultDate[TYPE_METHODS[type]]()

          if (type === 'Month') {
            value += 1
          }

          columnDataDefault.push(value)
        }
      })
    }
    const initColumnDataGenerator = () => {
      generateYearData.type = 'Year'
      generateMonthData.type = 'Month'
      generateDateData.type = 'Date'
      generateHourData.type = 'Hour'
      generateMinuteData.type = 'Minute'
      const defaultDate = getDefaultDate()
      switch (props.type) {
        case 'date':
          initColumnDataGeneratorForDate(defaultDate)
          break
        case 'time':
          initColumnDataGeneratorForTime(defaultDate)
          break
        case 'datetime':
          initColumnDataGeneratorForDate(defaultDate)
          initColumnDataGeneratorForTime(defaultDate)
          break
        default:
          initColumnDataGeneratorForCustom(defaultDate)
          break
      }
    }
    const initColumnData = (columnIndex, defaultDate = [], isSetColumn = true) => {
      // const columnDataIn = columnData
      const columnDataGeneratorIn = columnDataGenerator
      for (let i = columnIndex, len = columnDataGeneratorIn.length; i < len; i++) {
        // Collect parameters for columnDataGenerator
        const columnDataGeneratorParams = []
        const generator = columnDataGeneratorIn[i]
        for (let j = 0; j < i; j++) {
          const _generator = columnDataGeneratorIn[j]
          if (defaultDate[j] && _generator) {
            columnDataGeneratorParams.push({
              type: _generator.type,
              value: defaultDate[j],
            })
            continue
          }

          const itemIndex = picker.value.getColumnIndex(j) || 0
          /* istanbul ignore else */
          if (columnData[j]) {
            columnDataGeneratorParams.push(columnData[j][itemIndex])
          } else {
            columnDataGeneratorParams.push('')
            warn(`DatePicker columnData of index ${j} is void`)
          }
        }

        // Generator colume data with columnDataGeneratorParams
        const curColumnData = generator ? generator.apply(that, columnDataGeneratorParams) : ''
        // set picker column data & refresh picker
        // eslint-disable-next-line no-unused-expressions
        isSetColumn && picker.value.setColumnValues(i, curColumnData)

        // store column date
        // columnData[i]=curColumnData
        set(columnData, i, curColumnData)
      }

      // eslint-disable-next-line no-unused-expressions
      isSetColumn && picker.value.refresh(null, columnIndex)
    }
    const initPickerColumn = () => {
      resetPickerColumn()
      initColumnDataGenerator()
      initColumnData(0, columnDataDefault)
    }
    const initPicker = () => {
      if (!props.isView && props.value) {
        isPickerShow.value = props.value
      }
      picker.value.inheritPickerApi(that)

      initPickerColumn()
    }
    onMounted(() => {
      initPicker()
    })
    watch(
      () => props.value,
      val => {
        isPickerShow.value = val
      },
    )
    watch(isPickerShow, val => {
      if (!val) {
        emit('input', val)
      }
    })
    watch(() => props.defaultDate, initPickerColumn)
    watch(() => props.minDate, initPickerColumn)
    watch(() => props.maxDate, initPickerColumn)
    const onPickerShow = () => {
      oldColumnData.value = [...columnData]
      emit('show')
    }
    const onPickerHide = () => {
      emit('hide')
    }
    const onPickerChange = (columnIndex, itemIndex, value) => {
      emit('change', columnIndex, itemIndex, value)

      if (columnIndex < columnData.length - 1) {
        initColumnData(columnIndex + 1)
      }
    }
    const onPickerConfirm = columnsValue => {
      emit('confirm', columnsValue)
    }
    const onPickerCancel = () => {
      emit('cancel')
      if (oldColumnData.value) {
        columnData = [...oldColumnData.value]
      }
    }
    const getFormatDate = (format = 'yyyy-MM-dd hh:mm') => {
      const columnValues = picker.value.getColumnValues()

      columnValues.forEach(item => {
        /* istanbul ignore if */
        if (!item) {
          return
        }

        let value = item.value

        if (value < 10) {
          value = '0' + value
        }

        format = format.replace('HH', 'hh') // deal with HH as hh
        format = format.replace(item.type, value)
        format = format.replace(TYPE_FORMAT_INVERSE[item.type], value)
      })

      return format
    }
    return {
      isPickerShow,
      currentDateIns,
      columnData,
      oldColumnData,
      columnDataDefault,
      columnDataGenerator,
      picker,
      currentYear,
      currentMonth,
      currentDate,
      currentHours,
      currentMinutes,
      onPickerShow,
      onPickerHide,
      onPickerChange,
      onPickerConfirm,
      onPickerCancel,
      getFormatDate,
      generateYearData,
      generateMonthData,
      generateDateData,
      generateHourData,
      generateMinuteData,
    }
  },
}

</script>

<style lang="stylus">
.ui-date-picker {
  .column-item {
    font-size: date-picker-font-size !important;
    overflow: visible !important;
  }
}
</style>
