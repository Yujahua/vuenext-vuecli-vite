<template>
  <div class="ui-example-child ui-example-child-reader ui-example-child-reader-0">
    <ul class="image-reader-list">
      <li
        class="image-reader-item"
        v-for="(img, index) in imageList['reader0']"
        :key="index"
        :style="{
          'backgroundImage': `url(${img})`,
          'backgroundPosition': 'center center',
          'backgroundRepeat': 'no-repeat',
          'backgroundSize': 'cover'
        }">
        <ui-tag
          class="image-reader-item-del"
          size="small"
          shape="quarter"
          fill-color="#111A34"
          type="fill"
          font-color="#fff"
          @click.enter="onDeleteImage('reader0', index)"
        >
          <ui-icon name="close"></ui-icon>
        </ui-tag>
      </li>
      <li class="image-reader-item add">
        <ui-image-reader
          name="reader0"
          @select="onReaderSelect"
          @complete="onReaderComplete"
          @error="onReaderError"
          is-multiple
        ></ui-image-reader>
        <ui-icon name="camera" size="md" color="#CCC"></ui-icon>
        <p>添加图片</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {Icon, ImageReader, Tag, Toast} from '@csii/vx-mobile'
import {reactive} from 'vue'

export default {
  name: 'image-reader-demo',
  /* DELETE */
  title: '图片选择',
  titleEnUS: 'Picture selection',
  /* DELETE */
  components: {
    [Icon.name]: Icon,
    [ImageReader.name]: ImageReader,
    [Tag.name]: Tag,
  },
  setup() {
    let imageList = reactive({
      reader0: [
        '//img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a',
        '//manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7',
      ],
      reader1: [],
    })
    const onReaderSelect = (name, {files}) => {
      files.forEach(file => {
        console.log('[CSII VX Mobile] ImageReader Selected:', 'File Name ' + file.name)
      })
      Toast.loading('图片读取中...')
    }
    const onReaderComplete = (name, {dataUrl, file}) => {
      Toast.hide()
      console.log('[CSII VX Mobile] ImageReader Complete:', 'File Name ' + file.name)
      setTimeout(() => {
        const demoImageList = imageList[name] || []
        demoImageList.push(dataUrl)
        imageList[name] = demoImageList
      }, 100)
    }
    const onReaderError = (name, {msg}) => {
      Toast.failed(msg)
    }
    const onDeleteImage = (name, index) => {
      const demoImageList = imageList[name] || []
      demoImageList.splice(index, 1)
      imageList[name] = demoImageList
    }
    return {
      imageList,
      onReaderSelect,
      onReaderComplete,
      onReaderError,
      onDeleteImage,
    }
  },
}

</script>

<style lang="stylus" scoped>
.ui-example-child-reader
  .image-reader-list
    float left 
    width 100%
    .image-reader-item
      position relative
      float left
      width 23.5%
      padding-bottom 23.5%
      margin-bottom 2%
      margin-right 2%
      background #FFF
      box-shadow 0 5px 20px rgba(197, 202, 213, .25)
      box-sizing border-box
      list-style none
      border-radius 4px
      background-size cover
      overflow hidden
      &:nth-of-type(4n)
        margin-right 0
      &.add 
        .ui-icon
          position absolute
          top 40%
          left 50%
          transform translate(-50%, -50%)
          opacity .5
        p
          position absolute
          top 50%
          left 0
          width 100%
          margin-top 15px
          font-size 22px
          color #CCC
          text-align center
      .image-reader-item-del
        position absolute
        top 0
        right 0
        z-index 3
        opacity .8
        .ui-icon-close
          font-size 24px
</style>