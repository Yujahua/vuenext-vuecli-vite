<template>
  <div class="ui-image-reader">
    <input
      class="ui-image-reader-file"
      type="file"
      :key="inputTmpKey"
      :name="name"
      :accept="mimeType"
      :capture="isCameraOnly"
      :multiple="isMultiple"
      @change="onFileChange"/>
  </div>
</template>

<script>
import {ref, computed} from 'vue'
import createImageReader from './image-reader'
import {dataURItoBlob} from './image-dataurl'
import {functionToUrl, randomId} from '../_util'

const ERROR = {
  '100': 'browser does not support',
  '101': 'picture size is beyond the preset',
  '102': 'picture read failure',
  '103': 'the number of pictures exceeds the limit',
}

export default {
  name: 'ui-image-reader',
  props: {
    name: {
      type: String,
      default() {
        return randomId('image-reader')
      },
    },
    size: {
      type: [String, Number],
      default: 0,
    },
    mime: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
    isCameraOnly: {
      type: Boolean,
      default: false,
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  setup(props, {emit}) {
    let inputTmpKey = ref(Date.now())
    // MARK: private methods
    const emitter = (event, data) => {
      emit(event, props.name, data)
    }
    const openWebWorker = fn => {
      /* istanbul ignore next */
      return new Worker(functionToUrl(fn))
    }
    const closeWebWorker = worker => {
      /* istanbul ignore next */
      worker.terminate()
    }
    const cleaeFile = () => {
      inputTmpKey.value = Date.now()
    }
    const onReaderComplete = ({errorCode, dataUrl, file}) => {
      if (errorCode) {
        emitter('error', {
          code: errorCode,
          msg: ERROR[errorCode],
        })
        return
      }
      emitter('complete', {
        blob: dataURItoBlob(dataUrl),
        dataUrl: dataUrl,
        file,
      })
      cleaeFile()
    }
    const readFile = fileElement => {
      const size = +props.size * 1000
      const files = fileElement.files
      let worker
      let count = 0
      /* istanbul ignore if */
      if (window.Worker) {
        worker = openWebWorker(createImageReader)
        // worker send
        worker.postMessage({
          files,
          size: size,
          isWebWorker: true,
        })
        // worker response
        worker.onmessage = evt => {
          onReaderComplete(evt.data)
          count++
          // shut down worker after all files have been read
          if (count === files.length) {
            closeWebWorker(worker)
          }
        }
      } else {
        // generate imageReader
        const imageReader = createImageReader(window)
        imageReader({
          files,
          size: size,
          isWebWorker: false,
          complete: onReaderComplete,
        })
      }
    }

    // MARK: events handler
    const onFileChange = event => {
      /* istanbul ignore next */
      const fileElement = event.target

      /* istanbul ignore next */
      if (fileElement.files && fileElement.files.length) {
        emitter('select', {
          files: Array.prototype.slice.call(fileElement.files),
        })

        // error 超出每次上传最大张数
        if (props.amount && fileElement.files.length > props.amount) {
          emitter('error', {
            code: '103',
            msg: ERROR['103'],
          })
          cleaeFile()
          return
        }
        readFile(fileElement)
      }
    }

    let mimeType = computed(() => {
      /* istanbul ignore else */
      if (props.mime.length) {
        let mimeStr = ''
        props.mime.forEach(type => {
          mimeStr += `image/${type},`
        })
        return mimeStr.substring(0, mimeStr.length - 1)
      } else {
        return 'image/*'
      }
    })
    return {
      inputTmpKey,
      onFileChange,
      mimeType,
    }
  },
}

</script>

<style lang="stylus">
.ui-image-reader
  position absolute
  width 100%
  height 100%
  z-index 100
  left 0
  top 0
  -webkit-tap-highlight-color rgba(0,0,0,0)

.ui-image-reader-file
  position absolute
  width 100%
  height 100%
  opacity 0
  left 0
  top 0
  -webkit-tap-highlight-color rgba(0,0,0,0)
</style>
