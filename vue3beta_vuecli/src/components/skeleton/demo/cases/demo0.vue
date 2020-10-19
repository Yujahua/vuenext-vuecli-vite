<template>
  <div class="ui-example-child ui-example-child-skeleton ui-example-child-skeleton-0">
    <ui-skeleton title :loading="loading">
    </ui-skeleton>
  </div>
</template>

<script>
import {Skeleton} from '@csii/vx-mobile'
import {ref} from 'vue'
export default {
  name: 'skeleton-demo',
  setup() {
    const loading = ref(true)
    return {
      loading,
    }
  },
  components: {
    [Skeleton.name]: Skeleton,
  },
}

</script>

<style lang="stylus" scoped>
.ui-example-child-skeleton-0
  margin 30px 0
</style>
