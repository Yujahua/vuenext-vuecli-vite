<template>
  <div class="ui-bottom-tab">
    <div
      class="ui-bottom-tab-item"
      v-for="(item,$index) in data"
      :key="$index"
      @click="changTab($index,item)"
    >
      <div class="item-image">
        <img v-show="$index!=index" :src="item.defaultImage" />
        <img v-show="$index==index" :src="item.ActivatedImage" />
      </div>
      <div
        class="item-text"
        :class="{'item-text-default':$index!=index,'item-text-action':$index==index}"
      >{{item.textContent}}</div>
    </div>
  </div>
</template>

<script>
import {ref, reactive} from 'vue'
export default {
  name: 'ui-bottom-tab',
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
  },
  setup(props, {emit}) {
    const index = ref(0)
    const dataList = reactive(
      props.data || [
        {
          ActivatedImage: '',
          defaultImage: '',
          textContent: '文本',
          path: '',
        },
      ],
    )
    const changTab = (_index, item) => {
      index.value = _index
      emit('change', item, _index)
    }
    return {
      index,
      dataList,
      changTab,
    }
  },
}

</script>

<style lang="stylus">
.ui-bottom-tab {
  left: 0;
  width: 100%;
  height: auto;
  display: flex;
  position: fixed;
  bottom: 0px;
  overflow: hidden;
  background-color: #fff;
  padding-top: 6px;
  border-top: 1px solid #f5f5f5;
  z-index: 1000;
}

.ui-bottom-tab-item {
  flex-grow: 1;
  height: 60px;

  .item-image {
    height: 30px;
    width: 30px;
    margin: 0px auto;

    img {
      height: 100%;
      width: 100%;
    }
  }

  .item-text {
    height: 24px;
    text-align: center;
    font-size: font-body-large;
    line-height: 26px;
    margin-top: 1px;

    &.item-text-default {
      color: #8a8a8a;
    }

    &.item-text-action {
      color: color-primary;
    }
  }
}
</style>
